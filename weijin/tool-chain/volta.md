# Volta

[Volta - 无痛的 JavaScript 工具管理器 | Volta](https://zh.voltajs.com/)

## 安装

请移步[官方地址](https://zh.voltajs.com/guide/getting-started.html)，简单明了又方便。我是全部卸载 nvm 之后安装的哈，不知道混着用有啥问题。

## 优点

- 工具不随 Node 版本而“丢失”
- 命令路径稳定，不污染全局
- 自动版本路由，项目级 Node 无需手动切
- Rust 编译，执行飞快，完全脱离 shell 脚本

>摘抄至[渡一谢杰老师](https://mp.weixin.qq.com/s/RUzyWQQyH2u69Gi8g8hilQ)，关于优势详情可移步至公众号查询

## 理解 pin 的作用

在劳动节的时候，我拉着我朋友去海边看腿。突然接到了公司的电话说有个紧急的需求，我们xxx项目的xxx配置过期了，需要更换成另一个。本来就改个常量的事情。我的同事先后经历了依赖下载失败、项目莫名跑不起来、改了之后打包失败、打包完成上传失败。经此种种磨难终成正果。没有人喜欢在海边看腿的时候被人打电话问一些 node 版本诸如此类煞风景的问题。**痛太痛了！！**

而 Volta 提供的 `pin` 命令，正是为了解决这一类问题而设计的！！！它的作用是：将 **Node** 、**npm**、**Yarn** 等工具的**版本**，**明确绑定到当前项目中**。

哇偶听起来好 diao 的样子，淦里娘我怎么现在才知道。早普及到我不就没这档子事儿了。

那么这一时刻又有老铁问了(依旧羣)，Volta 怎么绑定呢？

<img src="https://ts2.tc.mm.bing.net/th/id/OIP-C.JvS6p0LhRBjUo3zD5xC1fAHaHL?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="辽宁省最后的太阳" style="zoom:50%;" />

> `volta pin` 命令将更新项目的 `package.json` 文件以使用所选版本的工具。

```js
固定您项目的运行时或包管理器

用法：
    volta pin [FLAGS] <tool[@version]>...

标志：
        --verbose    启用详细诊断
        --quiet      防止不必要的输出
    -h, --help       打印帮助信息

参数：
    <tool[@version]>...    要固定的工具，如 `node@lts` 或 `yarn@^1.14`。
```

```js
# 固定最新的 LTS 版本 Node
volta pin node

# 固定特定版本的 Node
volta pin node@16.14.2

# 固定 Node 版本范围
volta pin node@16
```

然后 `package.json` 中会添加一个 `volta` 的部分，

```js
"volta": {
    "node": "18.20.8",
    "pnpm": "10.15.1",
    "npm": "10.8.2"
 }
```

md，简直是一目了然、清晰明了、明镜高悬、正大光明。

总结一下：pin 的用处

- 保证团队成员使用一致的`Node`环境
- 避免`Cl`构建、部署因版本不一致导致失败
- 自动切换，无需手动`use`、`.nvmrc`或者 shell 配置
- 明确记录工具版本，提升项目可维护性

一行 `volta pin node@`，轻松为你的项目“锁死”一套可靠的开发环境——这是现代前端项目的标配，不容忽视

## 结语

我来当前公司之初，起步最大的问题就是 `node` 版本的问题。当时公司项目`老多新杂乱`很多没有交接的。nvm 当时确实给我提供了很大的帮助，但是我更喜欢现在的 `volta` 。
