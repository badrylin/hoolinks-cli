const prompts =  require('prompts');
const semver = require('semver');
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2))

// 获取包名和当前版本号
const pkgDir = process.cwd();
const pkgPath = path.resolve(pkgDir, 'package.json');
const pkg = require(pkgPath);
const pkgName = pkg.name;
const currentVersion = pkg.version;

/**
 * 发布类型
 * @type {import('semver').ReleaseType[]}
 */
const versionIncrements = [
    'patch', 'minor', 'major',
    'prepatch', 'preminor', 'premajor',
]

/**
 * 计算发布版本号
 * @param {import('semver').ReleaseType} i
 */
const inc = (i) => semver.inc(currentVersion, i, 'beta')

/**
 * 步骤提示
 * @param {string} msg
 */
const step = (msg) => console.log(chalk.cyan(msg))

/**
 * 把最新版本号写入package.json中
 * @param {string} version
 */
function updateVersion(version) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    pkg.version = version
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

/* 发布流程 */
async function main() {
    let targetVersion = currentVersion;
    const { release } = await prompts({
        type: 'select',
        name: 'release',
        message: '请选择发布版本',
        choices: versionIncrements
            .map((type) => ({
                title: `${type} (${inc(type)})`,
                value: inc(type),
            }))
            .concat([{ title: 'custom', value: 'custom' }]),
    })
    if (release === 'custom') {
      const { version } = await prompts({
        type: 'text',
        name: 'version',
        message: '请输入自定义版本号',
        initial: currentVersion,
      })
      targetVersion = version
    } else {
      targetVersion = release
    }
    // 检查版本号
    if (!semver.valid(targetVersion)) {
        throw new Error(`版本号 (${targetVersion}) 是非法的，请重新输入`)
    }
    const tag = `v${targetVersion}`

    const { yes } = await prompts({
        type: 'confirm',
        name: 'yes',
        message: `是否确认发布版本 ${tag}`,
        initial: 'y',
    })
    if (!yes) {
        return;
    }

    step('1、Change version...')
    updateVersion(targetVersion)

    step('2、Run build...')
    await execa('yarn', ['run', 'compile:build'], { stdio: 'pipe' })

    step('3、Generating changelog...')
    await execa('yarn', ['run', 'changelog'], { stdio: 'pipe' })

    if (args.dry) {
        return;
    }

    step('4、Commit...')
    const { stdout } = await execa('git', ['diff'], { stdio: 'pipe' })
    if (stdout) {
      await execa('git', ['add', '-A'])
      await execa('git', ['commit', '-m', `chore: publish ${tag}`])
      await execa('git', ['tag', tag])
    } else {
      console.log('No changes to commit.')
    }

    step('5、Publishing to NPM...')
    await execa('yarn', [
        'publish',
        '--no-git-tag-version',
        '--new-version', targetVersion,
        '--registry', 'http://npm.hoolinks.cn/',
    ])

    step('6、Pubshing to git remote...')
    await execa('git', ['push', '--tags'])
    await execa('git', ['push'])

    console.log(targetVersion)
}

main().catch((err) => {
  console.error(err)
})
