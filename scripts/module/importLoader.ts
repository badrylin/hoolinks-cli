/*
 * @Author: linzeqin
 * @Date: 2022-01-17 15:05:43
 * @description: 主要解决antd按需加载和样式问题
 */
import { init, parse } from 'es-module-lexer';

function camel2Dash(_str) {
    const str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, function camel2DashReplace($1) {
      return '-' + $1.toLowerCase();
    });
}

async function importLoader(source, map) {
	const callback = this.async();
    await init;
    let code = source;
    const [imports] = parse(source);
    imports.forEach((importSpecifier) => {
        if (importSpecifier.n === 'antd') {
            const entry = source.substring(importSpecifier.ss, importSpecifier.se);
            const newImport = /(?<={).*(?=})/.exec(
                entry.replace(/(\r\n)|(\n)|(\s)/g, '')
            )[0]?.split(',').map((name) => {
                return name && `import ${name} from "antd/lib/${camel2Dash(name)}";import "antd/lib/${camel2Dash(name)}/style";`;
            });
            code = (source as string).replace(entry, newImport.join(''))
        }
    })
    callback(null, code, map, source)
}

export default importLoader
