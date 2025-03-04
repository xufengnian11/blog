# tsconfig.json 配置文件

- 运行 TS 的配置文件
- 官方配置文件说明地址：[tsconfig.json](https://www.typescriptlang.org/tsconfig)

```json
{
  "include": ["src/**/*.ts"]，// 我们想要编译的 TS 是在哪个地方，默认值：**/* 递归匹配到任何子目录下面的任意文件
	"exclude": ["node_modules", "dist"], // 排除文件
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,
    // incremental 是 TypeScript 编译器的一个重要配置选项，用于增量编译。
    // TypeScript 会将上次编译的项目图信息保存到磁盘中，下次编译时，会使用这些信息来检测最小需要重新编译的文件集合，这样可以显著提高后续编译的速度
    // 缺点：
    //    1.磁盘空间占用
    //    2.潜在的编译问题，有可能会出现缓存不准确的情况、
    //    3.内存使用量增加，需要在内存中维护上次编译的状态，可能增加编译过程的内存使用量、
    //    4.项目配置复杂性，需要正确配置 tsBuildInfoFile 的位置，需要在版本控制中适当处理 .tsbuildinfo 文件，团队成员需要了解增量编译的工作机制
    //    5.调试困难，当项目中出现编译问题时，可能难以判断是否是增量编译导致的，排查问题可能需要额外的时间和经验

    // "tsBuildInfoFile": "./.tsbuildinfo", // 指定存储增量编译信息的文件位置，设置 incremental 编译后的文件储存地址

    // "composite": true, // composite 是 TypeScript 项目引用（Project References）中的一个重要配置选项。当设置 "composite": true 时，表示这个项目是可以被其他项目引用的复合项目。
    // 特点：允许将 TypeScript 程序组织成更小的部分、支持项目之间的引用关系、有助于构建大型 TypeScript 项目
    // 强制性要求：必须启用 rootDir 配置、所有实现文件必须匹配到 include 模式、必须明确列出所有文件（不允许使用全局通配符）、declaration 选项必须启用

    // "disableSourceOfProjectReferenceRedirect": true, // 控制 TypeScript 如何处理项目引用中的源文件、当设置为 true 时，TypeScript 将使用编译后的输出（.d.ts）文件，而不是源文件、默认值为 false，表示会优先使用源文件
    // "disableSolutionSearching": true, // 控制当前项目在被引用时是否参与解决方案（solution）的搜索，当设置为 true 时，其他项目在搜索引用时会跳过该项目，默认值为 false，表示允许其他项目搜索并引用当前项目
    // "disableReferencedProjectLoad": true, // 控制 TypeScript 是否自动加载引用的项目，当设置为 true 时，TypeScript 不会自动加载引用的项目，默认值为 false，表示会自动加载所有引用的项目

    /* Language and Environment */
    "target": "ES2017", // 执行版本 默认是 ES3
    "lib": ["ES2017"， "DOM", "DOM.Iterable"], // DOM:dom 类型库、DOM.Iterable: dom 迭代器
    // 要么不写要么写全，只写一个的话 像 console 就会报错，因为没有了类型

    // "jsx": "preserve",
    // "preserve"：保持 JSX 语法不变，输出 .jsx 文件
    // "react"：将 JSX 转换为 React.createElement 调用，
    // "react-native"：保持 JSX 语法不变，但文件扩展名改为 .js，
    // "react-jsx"：转换为 _jsx 调用（React 17+ 新转换），
    // "react-jsxdev"：开发模式下的 React 17+ 新转换

    // "experimentalDecorators": true, // 启用实验性的装饰器（Decorators）语法支持，允许使用 @ 符号来装饰类、方法、属性等，通常与 emitDecoratorMetadata 配合使用
    // "emitDecoratorMetadata": true, // 启用实验性的元数据（Metadata）支持，允许使用 Reflect API 来获取装饰器所装饰的类的元数据信息，通常与 experimentalDecorators 配合使用
    // "jsxFactory": "", // 指定用于创建 JSX 元素的工厂函数，通常与 jsxPragma 配合使用
    // "jsxFragmentFactory": "", // 指定用于创建 JSX 片段的工厂函数，通常与 jsxPragmaFrag 配合使用
    // "jsxImportSource": "",
    // "reactNamespace": "",
    // "noLib": true,
    // "useDefineForClassFields": true,

    // "moduleDetection": "auto", // 控制 TypeScript 如何检测和处理模块，默认值为 "auto"，用于确定文件是否应该被视为模块
    // "auto": 自动检测是否使用 ES6 模块化,如果文件包含 import/export 语句，则视为模块,如果文件有 package.json 且 type: "module"，则视为模块,如果文件使用了 JSX，则视为模块
    // "legacy": 使用传统的模块检测规则,只有当文件包含 import/export 语句时才视为模块
    // "force": 强制将所有文件视为模块,无论文件内容如何，都将其视为模块

    /* Modules 模块化 */
    "module": "CommonJS", // 后边会详细讲一下 ts 模块化。内容很复杂
    // "rootDir": "./", // 指定 TypeScript 项目的根目录，用于控制输出目录结构，所有非声明文件必须在 rootDir 下
    // "moduleResolution": "node10", // 指定模块解析策略，决定 TypeScript 如何查找导入的模块，影响模块的导入路径解析方式
    // “node”: 使用 Node.js 的模块解析算法, 查找顺序: 1.package.json 中的 types 字段、2.package.json 中的 main 字段、3.index.d.ts、4.index.js

    // "baseUrl": "./",
    // "paths": {},
    // "rootDirs": [],
    // "typeRoots": [],
    // "types": [],
    // "allowUmdGlobalAccess": true,
    // "moduleSuffixes": [],
    // "allowImportingTsExtensions": true,
    // "resolvePackageJsonExports": true,
    // "resolvePackageJsonImports": true,
    // "customConditions": [],
    // "resolveJsonModule": true,
    // "allowArbitraryExtensions": true,
    // "noResolve": true,

    /* JavaScript Support */
    // "allowJs": true,
    // "checkJs": true,
    // "maxNodeModuleJsDepth": 1,

    /* Emit */
    // "declaration": true,
    // "declarationMap": true,
    // "emitDeclarationOnly": true
    // "sourceMap": true,
    // "inlineSourceMap": true,
    // "outFile": "./",
  	"outDir": "./dist", // 指定输出目录，如果未指定 ts 文件在哪，编译后的 js 就在哪
    // "removeComments": true,
    // "noEmit": true,
    // "importHelpers": true,
    // "importsNotUsedAsValues": "remove",
    // "downlevelIteration": true,
    // "sourceRoot": "",
    // "mapRoot": "",
    // "inlineSources": true,
    // "emitBOM": true,
    // "newLine": "crlf",
    // "stripInternal": true,
    // "noEmitHelpers": true,
    // "noEmitOnError": true,
    // "preserveConstEnums": true,
    // "declarationDir": "./",
    // "preserveValueImports": true,

    /* Interop Constraints */
    // "isolatedModules": true,
    // "verbatimModuleSyntax": true,
    // "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
		// "preserveSymlinks": true,
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
    /* Completeness */
    // "skipDefaultLibCheck": true,
    "skipLibCheck": true
  }
}
```
