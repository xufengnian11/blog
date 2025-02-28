# TypeScript 初识

## 概念

* TypeScript（TS）是一种``编译时``的``静态类型``语言，是一种``强类型``语言
  1. ``静态类型``: 在 TS 中，变量和函数的类型是在编写代码时指定的，而不是在运行时确定的。这样有助于捕捉类型错误，并提供更好的代码自动补全、导航和重构支持。
  2. ``编译时``: 浏览器和nodejs并不能直接识别TS代码，需要编译成js代码。TypeScript在**编译到JavaScript之前**进行类型检查。这意味着任何类型错误都会在编译时被发现，而不是在代码运行时。（亡羊补牢为时未晚）
  3. ``强类型语言``: 在编译时执行严格的类型检查的语言。（严师出高徒）
  4. TS 在编译成 JS 的时候还会生成 一个 .d.ts 文件

```ts
const a:number = 2; ==> const a = 2;
const a:number = '1'; // error
```

## 下载 & 安装

```bash
npm i -g typescript  # 全局安装
tsc --version  # 查看版本号
tsc --init # 初始化配置文件
```

##  tsconfig.json配置文件

* 运行 TS 的配置文件
* 官方配置文件说明地址：[tsconfig.json](https://www.typescriptlang.org/tsconfig)

```json
{
  "compilerOptions": {
  	"outDir": "./dist", // 指定输出目录，如果未指定 ts 文件在哪，编译后的 js 就在哪
    "target": "ES2017", // 执行版本 默认是 ES3
    "lib": ["ES2017"， "DOM", "DOM.Iterable"], // DOM:dom 类型库、DOM.Iterable: dom 迭代器
    // 要么不写要么写全，只写一个的话 像 console 就会报错，因为没有了类型
    /* Modules 模块化 */
    "module": "CommonJS", // 后边会详细讲一下 ts 模块化。内容很复杂
    
    "forceConsistentCasingInFileNames": true, // 文件大小写
    
    /* Type Checking 代码严格模式 */
    "strict": true, // 开启严格检查模式，下面默认跟随开启。。。。。
    // "alwaysStrict": true, // 在代码中注入'use strict'，ESM模块化默认就是严格模式，commonjs模块化才会生成
    // "noImplicitAny": true, // 不允许隐式的any类型     
    // "noImplicitThis": true, // 不允许隐式的 this
    // "strictBindCallApply": true, // 严格的 bind、call、apply 类型检查
    // "strictFunctionTypes": true, // 不允许函数参数双向协变
    // "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    // "strictPropertyInitialization": true, // 类的实例属性必须初始化
    // "useUnknownInCatchVariables": true, // 默认 catch 子句变量为unknown，而不是any。
    // "noUnusedLocals": true, // 报告未使用的局部变量的错误
    // "noUnusedParameters": true, // 报告函数中未使用参数的错误
    // "noFallthroughCasesInSwitch": true, // 报告 switch 语句中失败案例的错误。确保 switch 语句内的任何非空 case 都包含break、return或throw，避免发生错误的case穿透           
    // "exactOptionalPropertyTypes": true, // 用来控制可选属性的精确类型检查。当设置为 true 时，TypeScript 会严格区分 undefined 和"未定义"的可选属性。
    // "noImplicitReturns": true, // 用于确保函数中的所有代码路径都有明确的返回值。当设置为 true 时，如果函数中有任何代码路径没有明确的 return 语句，TypeScript 将报错。
    // "noUncheckedIndexedAccess": true, // 这个选项用于增加对数组和对象索引访问的类型安全性。当设置为 true 时，通过索引访问数组或对象时，TypeScript 会自动将结果类型变为可能包含 undefined。
    // "noImplicitOverride": true, // 当设置为 true 时，如果在子类中重写父类的方法，必须明确使用 override 关键字。这可以帮助我们避免一些常见的错误，比如拼写错误或父类方法名变更后未更新子类。
    // "noPropertyAccessFromIndexSignature": true, // 这个选项用于控制如何访问使用索引签名声明的属性。当设置为 true 时，必须使用方括号语法 [] 来访问索引签名声明的属性，而不能使用点语法 .。
    // "allowUnusedLabels": true, // 这个选项用于控制是否允许存在未使用的标签（label）。当设置为 false 时，如果代码中存在未被使用的标签，TypeScript 会报错。
    // "allowUnreachableCode": true, // 这个选项用于控制是否允许存在永远不会执行到的代码。当设置为 false 时，如果存在无法到达的代码，TypeScript 会报错。
  }，
	"include": ["src/**/*.ts"]，// 我们想要编译的 TS 是在哪个地方，默认值：**/* 递归匹配到任何子目录下面的任意文件  
	"exclude": ["node_modules", "dist"], // 排除文件
}
```

