# Vue+elementUi后台模板
## 如何开始
```shell
git clone https://github.com/theshying/vue-element-admin.git

cd vue-element-admin

npm i 

npm run dev:mock
```



## 提交规范

```javascript
feat: 新功能
fix: 修复问题
docs: 修改文档
style: 修改代码格式(不影响逻辑功能，比如格式化、补充分号等等)
refactor: 重构代码(fix bug或增加新功能不属于此范围)
perf: 提升页面性能
test: 增加/修改测试用例
chore: 修改工具相关（包括但不限于文档、代码生成等, 比如修改了README，webpack配置文件等等）
deps: 升级依赖
```



## 目录介绍

```javascipt
├── build                      // 构建相关
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                  // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
├── test                       // 单元测试相关
├── .babelrc                   // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .editorconfig              // 编辑器 配置项
├── .eslintignore.js           // eslint 检测忽略配置
├── .postcssrc.js              // postcss 检测忽略配置
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```
#
