# tsconfig.json 配置文件

* 运行 TS 的配置文件
* 官方配置文件说明地址：[tsconfig.json](https://www.typescriptlang.org/tsconfig)

```json
{
  "include": ["src/**/*.ts"]，// 我们想要编译的 TS 是在哪个地方，默认值：**/* 递归匹配到任何子目录下面的任意文件
	"exclude": ["node_modules", "dist"], // 排除文件
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    
    /* Projects */
    // "incremental": true,                            
    // "composite": true,                              
    // "tsBuildInfoFile": "./.tsbuildinfo",            
    // "disableSourceOfProjectReferenceRedirect": true,
    // "disableSolutionSearching": true,               
    // "disableReferencedProjectLoad": true,           
    
    /* Language and Environment */
    "target": "ES2017", // 执行版本 默认是 ES3
    "lib": ["ES2017"， "DOM", "DOM.Iterable"], // DOM:dom 类型库、DOM.Iterable: dom 迭代器
    // 要么不写要么写全，只写一个的话 像 console 就会报错，因为没有了类型
    // "jsx": "preserve",               
    // "experimentalDecorators": true,  
    // "emitDecoratorMetadata": true,   
    // "jsxFactory": "",                
    // "jsxFragmentFactory": "",        
    // "jsxImportSource": "",           
    // "reactNamespace": "",            
    // "noLib": true,                   
    // "useDefineForClassFields": true, 
    // "moduleDetection": "auto",       
    
    /* Modules 模块化 */
    "module": "CommonJS", // 后边会详细讲一下 ts 模块化。内容很复杂
    // "rootDir": "./",                   
    // "moduleResolution": "node10",      
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
