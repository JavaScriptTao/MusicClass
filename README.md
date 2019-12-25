## 快陪练 音乐课堂项目
在 快陪练 原生APP学生端的 2.0，新添加了一个音乐课堂的模块，可以用来播放一些视频。

### 项目背景
UI:
 https://lanhuapp.com/web/#/item/board?type=share_mark&pid=ffb36e01-c17e-4552-9f9c-d6d6c90a9ddb&param=6e7dc1b6-b943-471b-989a-7a2280f9aa50&activeSectionId=
 
### 技术架构
前后端分离，基于vue技术栈。核心库当前版本为：

### 参与学习或开发
- 下载源码
  ```
  git clone http://gitlab.weilaicheng.com/Front-end/vue-music-class.git
  ```
- 安装项目有关依赖
  ```
  cd vue-music-class &&  npm install 
  ```
- 启动项目
  ```
  npm start  
  ```
- 部署项目 (生成静态文件后，一般通过配置ngnix访问，可用pm2配置本地自动部署)
  ```
  npm run build
  ```
  
### 各目录及文件功能
- ├── README.md 本文件，介绍项目的基本情况
- ├── babel.config.js babel的配置文件
- ├── dist 打包后所有文件的目录
- ├── node_modules 所有第三方依赖库所在的目录，如vue,axios, cube-ui等
- ├── package-lock.json 版本锁定的文件
- ├── package.json npm有关的配置文件，如依赖库、运行脚本等
- ├── postcss.config.js postcss的配置文件
- ├── public 静态资源所在的文件 如图片，index.html 
- ├── src 项目编写代码的目录
- │   ├── App.vue 根组件
- │   ├── api.js 各种请求Url文件
- │   ├── assets 静态资源，如一些公共样式等
- │   ├── components 组件目录
- │   ├── main.js 启动文件
- │   ├── router.js 路由文件
- │   ├── store.js vuex 文件
- │   ├── theme.styl cube-ui的主题文件
- │   └── views 页面目录
- └── vue.config.js 项目脚手架的配置文件