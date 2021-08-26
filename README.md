# Hoolinks-cli

昊链专用脚手架工具，基于webpack5+, babelt7.13+, ypescript4+，node12+

## 功能点

- [x] 支持多模块，多入口，
- [x] 支持参数化构建
- [x] 支持自定义多环境打包
- [x] 打包模块体积分析
- [x] 打包速度分析
- [x] 支持css modules, less
- [x] 支持CDN
- [x] 支持typescript
- [ ] 支持tslint
- [x] DLL
- [x] 多线程

## Getting Started

``` console
npm install hoolinks-cli --save-dev
or
yarn add hoolinks-cli -D
```

## Usage

```console
Usage: hoolinks dev/build/dll [options]

dev Options:
  --env [value]         环境变量
  --apps [value]        要构建的模块
  --uniqueName [value]  在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称
  --cdn [value]         js css img等模块cdn域名配置
  -s, --report          启动打包分析
  -p, --speed           启动打包速度分析
  -h, --help            display help for command

build Options:
  --env [value]         环境变量
  --apps [value]        要构建的模块
  --uniqueName [value]  在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称
  --cdn [value]         js css img等模块cdn域名配置
  -s, --report          启动打包分析
  -p, --speed           启动打包速度分析
  -h, --help            display help for command

dll Options:
  --uniqueName [value]  在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称
  -s, --report          启动打包分析
  -p, --speed           启动打包速度分析
  -h, --help            display help for command

```

## To-do list

- webpack-dev-server升级到4.0+（目前webpack-dev-server在beta版本，不稳定）
- webpack-dev-server4以后支持target除了web模式之外的其他模式热更新，更改target为browserslist模式以支持ie10以上的开发环境调试
- tslint和eslint的选择

## Change Log

### v1.0.0-beta.6 (2021-08-20) (待发布)

- feat: 升级webpack-dev-server到4.0.0
- feat: 添加公共静态文件夹static
- chore: 优化控制台展示效果
- feat: 完善dll包检测机制
- style: 优化控制台展示信息

### v1.0.0-beta.5 (2021-07-08)

- fix: 修复devServer热更新问题
- feat: 添加"core-js/stable"和"regenerator-runtime/runtime"以支持ie浏览器(10+)
- fix: 修正dllPlugin加载策略, 减少非必要的plugin加载

### v1.0.0-beta.4 (2021-07-08)

- feat: 添加Dll模式支持

### v1.0.0-beta.3 (2021-07-07)

- fix: 修复minimizer配置异常
- feat: 优化构建参数和js压缩

### v1.0.0-beta.2 (2021-07-07)

- chore: 调整开发环境命令

### v1.0.0-beta.1

- feat: 添加多线程支持和cdn支持
