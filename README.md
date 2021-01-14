   #                        小程序快速启动框架

## 这份框架是由taro + redux搭建而成。下文是用法、已实现功能和期望实现功能的介绍。

## 用法
* 这个小程序框架可以认为是一个骨架框架，用途是当开发一个新项目时，可以快速启动。
  **tip: 小程序是基于taro3.0^搭建的，如果低于这个版本，那么可能会遇到意想不到的错误**

* 使用react函数式组件和react类组件的区别。 具体例子参照components下的 Navbar(类组件) LdSwiper(函数式组件)

* 开发环境启动命令：npm run dev 生产环境打包命令: npm run build:weapp(微信小程序)

* src文件说明
  * actions: 具体用法 => 请看redux对于actions的 [用法](https://www.redux.org.cn/docs/basics/Actions.html)
  * assets: 全局公用资源(图片、字体等等)
  * components: 全局公用组件、分包和主包公用的组件
  * pages: 小程序视图
  * reducers: 具体用法 => 请看redux对于reducers的 [用法](https://www.redux.org.cn/docs/basics/Reducers.html)
  * store: redux的仓库
  * style: 全局公用样式
  * utils: 工具库 => gfun: 全局函数、init: 小程序初始化的函数、qiniu_uploader: 七牛云相关、request: wx.request()函数的二次封装

## 已实现功能
* 此框架包含了一些基础组件，如：自定义页面标题栏、swiper组件、富文本组件等。

* 小程序登录

* 自定义tabBar栏参数

* 表单验证函数的封装

## 期望实现功能
* 实现表单基本组件的样式清除(按钮、input输入框等)

* 视图模板(新建页面的时候，能够直接使用node命令创建)

* 此框架的开发规范文档完善
