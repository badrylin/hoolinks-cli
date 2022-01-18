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
- [x] 支持eslint，废弃tslint(使用@typescript-eslint)
- [x] DLL
- [x] 多线程
- [x] 支持react-refresh

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

- cache filesystem模式没有清空过期缓存问题,该问题会导致缓存文件不断堆积，达到几个G [https://github.com/webpack/webpack/issues/13291](https://github.com/webpack/webpack/issues/13291)
- webpack-dev-server 关闭进程问题 [https://github.com/webpack/webpack-dev-server/issues/1479](https://github.com/webpack/webpack-dev-server/issues/1479)
