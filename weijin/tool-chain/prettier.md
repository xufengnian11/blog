# Prettier 介绍

**Prettier** 是一个代码风格的修正工具。

## 基本介绍

代码风格是所有程序员都要遇到的问题，不管是团队协作还是个人练习。有的喜欢有分号，代码更安全；有的喜欢没分号，能少打一个字符；有的喜欢单引号，能少按一下 *Shift*；有的喜欢反引号，扩展更高；*camelCase*、 *PascalCase*、 *snake_case* 总是在团队里无法统一，就算统一了，有些队员心里也不服，因为代码风格太主观了，根本无法让谁信服谁，每个程序最喜欢看的代码还是自己的代码。

那么有没有一种非常标准且又好看的代码风格来停止这场代码风格的圣战呢？

*Prettier* 这时就出来了。*Prettier* 是一个流行的代码格式化工具，它可以自动调整代码的样式，使其更具可读性和一致性。它支持多种编程语言，包括 *JavaScript、TypeScript、HTML、CSS、SCSS、GraphQL、JSON、Markdown* 等。

*Prettier* 的核心特点包括：

- 一致的代码风格：*Prettier* 可以帮助团队成员统一代码风格，减少代码审查时关于代码格式的讨论。
- 无需配置：*Prettier* 的默认配置就足以满足大多数项目的需求。使用 *Prettier* 时，通常不需要花费时间调整和维护配置文件。
- 集成多种编辑器：*Prettier* 支持许多流行的代码编辑器，如 *Visual Studio Code、Sublime Text、Atom* 等都有相应的插件，可以在编写代码时自动运行 *Prettier*。
- 可配置性：虽然 *Prettier* 默认配置通常已经足够，但它仍支持自定义配置。你可以在项目根目录下创建一个 .*prettierrc* 文件，根据项目需求调整格式化选项。
- 自动格式化：*Prettier* 可以自动格式化文件，无需手动调整代码格式。
- 支持多种语言：*Prettier* 支持多种编程语言和文件格式，提供广泛的适用性。

*Prettier* 官网：*https://prettier.io/*

![16886105317367](https://resource.duyiedu.com/xiejie/2023-07-12-074950.jpg)

*Prettier* 的诞生让代码风格得到了统一：我格式化后的代码是最好看的，谁同意，谁反对？

<img src="https://resource.duyiedu.com/xiejie/2023-07-12-075009.jpg" alt="16886080143022" style="zoom:50%;" />

“我反对！凭什么你说最好看就是最好看？”

<img src="https://resource.duyiedu.com/xiejie/2023-07-12-075035.jpg" alt="16886080572804" style="zoom:50%;" />

就凭你不会写论文！

<img src="https://resource.duyiedu.com/xiejie/2023-07-12-075117.jpg" alt="16886081059287" style="zoom:50%;" />

其实在很早之前已经有人开始研究哪种方式来格式化长文本是最好的（*Prettier Printer*），比如 *Philip Wadler* 在 《*[A prettier printer](https://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf)*》这里给出了一些自动格式化换行的理论依据。

>*A good pretty printer must strike a balance between ease of use, flexibility of format, and optimality of output.*

*Prettier* 的作者 *James* 在这篇论文基础上再完善了一些代码风格规则，最终成为了 *Prettier* 格式化代码的最终方案。比如像下面的链式调用，*Prettier* 输出的就比原来论文描述的要好看一些：

```js
// 原版 "A prettier printer" 的实现
hello().then(() => {
  something()
}).catch(console.error)


// Prettier 的实现
hello()
  .then(() => {
    something()
  })
  .catch(console.error)
```

## 工作原理

那么，*Prettier* 是如何能够做到代码的格式化的呢？

首先，*Prettier* 会把代码转换成 *AST* (*Abstract Syntax Tree*)，这里用到的是一个叫 *[Recast](https://github.com/benjamn/recast)* 的库，而 *Recast* 实际上也用了 *[Esprima](https://github.com/jquery/esprima)* 来解析 ES6。

>*Esprima can be used to perform lexical analysis (tokenization) or syntactic analysis (parsing) of a JavaScript program.*
>
>*A simple example on Node.js REPL*:
>```js
>> var esprima = require('esprima');
>> var program = 'const answer = 42';
>> esprima.tokenize(program);
>> [ { type: 'Keyword', value: 'const' },
>    { type: 'Identifier', value: 'answer' },
>    { type: 'Punctuator', value: '=' },
>    { type: 'Numeric', value: '42' } ]
>> esprima.parseScript(program);
>> { type: 'Program',
>    body:
>      [ { type: 'VariableDeclaration',
>          declarations: [Object],
>          kind: 'const' } ],
>      sourceType: 'script' }
>```

所以无论之前的代码怎么乱，怎么屎，*Prettier* 都抹掉之前的所有样式，抽成最本质的语法树。

然后再用 *Prettier* 的代码风格规则来输出格式化后的代码。

![16886953764727](https://resource.duyiedu.com/xiejie/2023-07-12-080332.jpg)

*Prettier* 能够支持的格式化语言是多种多样的，并非仅仅只为 *JS* 服务：

<img src="https://resource.duyiedu.com/xiejie/2023-07-12-080354.jpg" alt="16886954522867" style="zoom:50%;" />

理论上来讲，只要把一门语言的代码抽象为语法树，然后再有对应的格式化规则，那么无论什么语言都是可以的。

*Prettier* 官方以及社区就提供了一些插件，通过使用插件，你可以让 *Prettier* 格式化更多种类的代码，添加对新语言和文件类型的支持。*Prettier* 插件通常是单独的 *npm* 包，你需要安装它们作为项目的依赖。插件的名称通常遵循 *prettier*-*plugin*-* 的命名规范。安装插件后，*Prettier* 会自动发现并使用它们。

以下是一些常见的 *Prettier* 插件示例：

- *prettier-plugin-svelte*：这个插件为 *Svelte* 组件提供了格式化支持。安装这个插件后，你可以使用 *Prettier* 格式化 *Svelte* 文件。
- *prettier-plugin-toml*：这个插件为 *TOML* 配置文件提供了格式化支持。安装这个插件后，你可以使用 *Prettier* 格式化 *TOML* 文件。
- *prettier-plugin-java*：这个插件为 *Java* 语言提供了格式化支持。安装这个插件后，你可以使用 *Prettier* 格式化 *Java* 文件。
- *prettier-plugin-php*：这个插件为 *PHP* 语言提供了格式化支持。安装这个插件后，你可以使用 *Prettier* 格式化 *PHP* 文件。


另外，*Prettier* 的官方文档里一直在强调自己是一个 *Opinionated* 的工具，这里想展开跟大家聊聊 *Opinionated*。

其实不仅 *Prettier*，我们日常使用的一些库和框架都会标明自己是 *opinionated* 还是 *unopinionated*：

![16886957736667](https://resource.duyiedu.com/xiejie/2023-07-12-080447.jpg)

![16886957499330](https://resource.duyiedu.com/xiejie/2023-07-12-080436.jpg)

按照框架/库的 *opinionated* 还是 *unopinionated* 思路来使用它们非常重要。

*Opinionated* 的思路是 <u>你的一切我全包了，使用者就别自己发明设计模式和轮子，用我的就行，有锅我背</u>。 

*Unopinionated* 的思路则是 <u>我就给你一堆零件，每个有优有劣，自己组装来玩了，相当于每人都是装机猿</u>。

*Prettier* 属于 *Opinionated* 哲学，这意味着它提供的代码风格已经是最优的，不希望使用者做太多自定义的内容，而应该相信 *Prettier* 已经服务到位了。

* 如果想要自定义规则，可以在项目根目录下面创建一个 .prettierrc，之后使用对象的形式写入自定义规则即可：

```js
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

- singleQuote：单引号
- semi：语句末尾是否添加分号
- printWidth：一行的最长长度
- trailingComma：对象或者数组字面量中的最后一个元素是否添加逗号

## 规则配置

在官网的 https://prettier.io/docs/en/options.html 页面就可以看到所有的格式化规则。

![image-20230718100438928](https://resource.duyiedu.com/xiejie/2023-07-18-020439.png)

- 行宽：*Prettier* 默认将行宽限制在 *80* 个字符。如果一行代码超过这个长度，*Prettier* 会自动进行换行。你可以通过 *printWidth* 配置项自定义行宽。

- 缩进：*Prettier* 默认使用 *2* 个空格进行缩进。你可以通过 *tabWidth* 和 *useTabs* 配置项自定义缩进宽度和是否使用制表符（*tab*）。

- 分号：*Prettier* 默认在每个语句结尾添加分号。你可以通过 *semi* 配置项选择是否强制添加分号。

- 引号：*Prettier* 默认使用双引号。你可以通过 *singleQuote* 配置项自定义引号类型。

- 尾随逗号：*Prettier* 默认在多行结构（如对象字面量和数组字面量）的最后一个元素后添加尾随逗号。你可以通过 *trailingComma* 配置项自定义尾随逗号的使用。

- 括号空格：*Prettier* 默认在括号内添加空格。例如，{ *foo: bar* }。你可以通过 *bracketSpacing* 配置项自定义括号内的空格。

- 箭头函数参数括号：*Prettier* 默认在箭头函数只有一个参数时省略参数括号。你可以通过 *arrowParens* 配置项自定义箭头函数参数括号的使用。

- *HTML* 属性换行：*Prettier* 会在 *HTML* 标签的属性超过 *printWidth* 时进行换行。你可以通过 *htmlWhitespaceSensitivity* 配置项自定义换行策略。

- *JSX* 标签闭合：*Prettier* 默认将没有子元素的 *JSX* 标签闭合。例如，\<*br* />。你可以通过 *jsxBracketSameLine* 配置项自定义 *JSX* 标签闭合的风格。

注意这些规则是 prettier 默认规则，也是行业内的最佳实践标准，因此我们平时在书写代码的时候，就应该主动的按照这些规则去规范书写我们的代码。

## 配置文件

配置文件的作用是做规则自定义。在 prettier 里面实际上提供了多种配置方式，并且多种配置方式之间会有一个优先级。

1. 命令行选项：在 package.json 中配置 script 脚本命令的时候，是可以添加配置参数的

```js
"format": "prettier --no-semi --print-width 50 --write ."
```

这种命令行的配置方式优先级是最高的，但是这种方式仅限于自定义一两条规则，如果需要自定义规则比较多，那么还是推荐使用单独的配置文件。

2. 文件中配置：这种方式就是单独创建一个配置文件，这里支持的配置文件的格式实际上是比较多。例如 ***.prettierrc、.prettierrc.json、.prettierrc.yaml、.prettierrc.yml、.prettierrc.js*** 或 ***prettier.config.js***。***Prettier*** 会自动识别并应用这些文件中的配置。在这些文件里面，一般就是一个对象

```json
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

正常情况下，一个项目中写一个配置文件就可以了，但是如果不小心有多个配置文件，那么确实也涉及到一个优先级问题。优先级顺序如下（由高到低）：

- .*prettierrc.js* 或 *prettier.config.js*
- .*prettierrc.yaml* 或 .*prettierrc.yml*
- .*prettierrc.json*
- .*prettierrc*

3. 在 pacakge.json 中进行配置：可以在 package.json 文件中添加一个配置选项 prettier，然后进行配置

```js
{
	"name": "my-project",
	"version": "1.0.0",
	"prettier": {
		"singleQuote": true,
		"tabWidth": 4
	}
 }
```

4. 编辑器配置：许多代码编辑器可以安装和 prettier 相关的插件，之后可以在编辑器的 settings > extensions 里面进行配置

5. prettier 默认配置：默认配置一般优先级是最低，但却是最常用的，因为这套配置已经是行业最佳实践了。

有点类似于 .gitignore，prettier 也支持 .prettierignore，用来排出一些文件或者目录，也就是说，出现在 .prettierignore 里面的文件或者目录不会被 prettier 进行处理。

例如：

```js
# 忽略所有的 .min.js 文件
*.min.js

# 忽略整个 build 目录
/build/

# 忽略 node_modules 目录
node_modules/

# 忽略特定文件
my-special-file.js
```

关于 .prettierignore 里面具体的路径写法，可以参阅 .gitignore 的写法：https://git-scm.com/docs/gitignore
