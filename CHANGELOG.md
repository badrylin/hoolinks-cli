## [2.0.2](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/compare/v2.0.1...v2.0.2) (2022-01-24)


### Bug Fixes

* 关闭esbuild css压缩功能,修复样式异常 ([650143c](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/commits/650143c737047b56fb606aef97021a59372b149d))



## [2.0.1](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/compare/v2.0.0...v2.0.1) (2022-01-18)


### Bug Fixes

* 由于种种原因,暂时关闭react-refresh的支持 ([58fdb9d](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/commits/58fdb9d28219e95b7d76a1d61ee8ea60ec93a70a))



# [2.0.0](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/compare/v1.2.0...v2.0.0) (2022-01-18)

### ⚠ BREAKING CHANGES

* 移除babel，js和ts均由tsc编译, terser压缩改为esbuild压缩


### Features

* 新增react-refresh的支持 ([df105df](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/commits/df105dffc4b16ea39c90e6a32cdca48d8ed8f4e3))



# [1.2.0](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/compare/v1.1.9...v1.2.0) (2021-12-15)


### Bug Fixes

* 修复生产环境构建异常没有自动退出进程 ([1199e13](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/commits/1199e134d022ca9665938f2f75a321bd5514ef39))


### Features

* 支持在package.json中传入theme属性覆盖less变量 ([8de2e5d](https://gogs.hoolinks.com/Front-End-Project/hoolinks-cli/commits/8de2e5d45d7838bd874ff3436b721623c3532bf1))



## 1.1.9 (2021-11-05)

- feat: 添加配置文件异常日志
- feat: 升级dev-server版本到4.4.0，并开启警告类型的日志
- fix: 修复日志输出级别
- fix: 修复样式中图片资源加载路径问题
- feat: 添加配置类型输出，搭配IDE和jsdoc实现配置文件类型提醒

## 1.1.8 (2021-10-01)

- fix: 修复dev环境下开启-p参数时，dll构建异常
- fix: 修复NODE_MODULES_PATH取值错误

## 1.1.7 (2021-09-29)

- fix: 修改js载入顺序，去除defer模式

## 1.1.6 (2021-09-27)

- fix: 启用CopyWebpackPlugin noErrorOnMissing属性，防止没有static文件夹时构建异常

## 1.1.5 (2021-09-26)

- fix: 修改js载入顺序，优化初始化加载样式
- fix: 修复babelInclude不生效
- fix: 修复dll在workspaces模式下node-modules路径异常

## 1.1.4 (2021-09-23)

- feat: 开启eslint缓存和less编译缓存，优化ts-loader缓存
- fix: 暂时关闭cache filesystem, 因为filesystem模式不会自动清除过期的cache文件

## 1.1.3 (2021-09-22)

- feat: 添加eslint配置
- feat: 降低cache文件寿命并开启生产环境下的cache

## 1.1.2 (2021-09-17)

- chore: MiniCssExtractPlugin开启ignoreOrder模式，CssMinimizerPlugin开启多线程模式
- fix: 恢复process.env.NODE_ENV默认值，添加process.env.__DEV__用于标识当前是否为开发环境

## 1.1.1 (2021-09-14)

- fix: 修复devServer open路径异常
- fix: 开启Terser keep_fnames和keep_classnames模式，修复文件路径获取异常

## 1.1.0 (2021-09-13)

- feat: 升级webpack-dev-server到4.0.0
- feat: 添加公共静态文件夹static
- chore: 优化控制台展示效果
- feat: 完善dll包检测机制
- style: 优化控制台展示信息
- fix: 修复dev-server关闭进程异常,临时采用直接杀死进程的方案
- fix: 修复开启speed参数时，构建dll加载异常
- feat: style解析添加多线程
- feat: 开启webpack filesystem和babel缓存模式
- fix: 修复devServer static监听路径异常导致构建时间缓慢
- fix: 修复静态文件夹访问路径异常
- feat: 新增__DEV__参数，用于判断当前环境是否为开发环境

## 1.0.0-beta.5 (2021-07-08)

- fix: 修复devServer热更新问题
- feat: 添加"core-js/stable"和"regenerator-runtime/runtime"以支持ie浏览器(10+)
- fix: 修正dllPlugin加载策略, 减少非必要的plugin加载

## 1.0.0-beta.4 (2021-07-08)

- feat: 添加Dll模式支持

## 1.0.0-beta.3 (2021-07-07)

- fix: 修复minimizer配置异常
- feat: 优化构建参数和js压缩

## 1.0.0-beta.2 (2021-07-07)

- chore: 调整开发环境命令

## 1.0.0-beta.1

- feat: 添加多线程支持和cdn支持
