# Eslint

## Eslint 快速上手

首先创建一个 eslint-demo 的项目，使用 pnpm init 进行格式化，安装 eslint

```js
pnpm add eslint -D
```

接下来在项目根目录下面创建一个 src/index.js，代码如下：

```js
const hello = "world";
console.log(hello);

function sayHello(name) {
  console.log("Hello, " + name + "!");
}

sayHello("world");
```

上面随便写了一些代码，接下来在项目根目录下面创建一个 eslint 的配置文件 .eslintrc，里面会书写一些配置信息(版本 9.x.x 之前)：

```js
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

* Env：主要是定义预设的全局变量

  - browser：这份配置适用于浏览器环境，预定义了诸如 window、document 之类的浏览器才会有的全局变量

  - es2021: 表示我们使用的是 ES 2021 的标准，肯定会预定义一些新版本的全局变量，Promise、Symbol 这些全局变量是支持的

* Extends：这里我们所设置的值为 eslint:recommended，这其实是 Eslint 团队推荐的一组核心规则，你可以将其视为最佳实践
* ParserOptions：和解析器相关的配置
  * ecmaVersion：使用的 ECMASctipt 的版本，12 也就是 2021
  * sourceType：模块类型，这里设置为 module，表示我们使用的 ESM 模块规则，支持 import 和 export 语法

- Rules：定义代码风格，功能类似于 prettier
  - Indent：缩进，我们这里设置的是两个空格，如果不符合要求，会报 error 类型的错误
  - quotes：引号的设置，这里我们设置的是单引号，如不符合要求，会报 error 类型的错误
  - semi：每一条语句添加分号，如不符合要求，会报 error 类型的错误

## 检查规则

规则是 Eslint 里面的规则相关的知识。规则是 Eslint 中比较重要的核心概念之一，因为究竟报不报错，是由规则来确定的。

### 规则的重要性

在 Eslint 中，本身可以配置规则的重要性，总共分为三个级别：

- off 或 0：关闭这条规则
- warn 或者 1：这条规则的级别为警告级别
- error 或者 2：这条规则的级别为错误级别

例如：

```js
"rules": {
	"semi": ['warn', "always"]
}
```

在上面的规则中，semi 对应的值为一个数组，数组的第一项是上面所说的规则重要性，第二项则是该条规则配置可选项，关于这个配置可选项，不同的规则填入的值是不一样的。关于具体能够填写的值，那么就要去这条规则的说明页面去查阅。

Example：semi 可配置值如下：

* always：这是默认值，代表语句结束需要插入分号；

* never：在没有 ASL 风险情况下，不需要插入分号；

  ASL 英语全称叫做 automatic semicolon insertion，翻译成中文就是自动分号插入。所谓 ASL 风险，是指由于有这个机制，可能会导致意外行为或者错误

