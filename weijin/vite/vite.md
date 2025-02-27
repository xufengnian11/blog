# vite 学习笔记

## 配置文件 vite.config.ts

```js
import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import { wrapperEnv } from './build/getEnv'
// defineConfig 使用这个工具函数可以避免我们在配置的时候，出现的一些低级错误
// 接收一个对象，可以用函数直接返回一个对象，提供了一个参数 Config: ConfigEnv
// 里面有三个属性，其中常用的有：command、mode
// mode： 当前的情景例如测试环境运行等等
// command：当前运行的命令，例如： serve、build 等等
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  console.log(command, 'command')
  // console.log(__dirname) // 当前模块它所在的目录
  // console.log(procass.cwd(), 'procass') // 是 node 环境提供的，返回的是当前 nodejs 运行的工作目录
  const root = procass.cwd();
  const env = loadEnv(mode, root, 'VITE_');
  const viteEnv = wrapperEnv(env);
  return {
    root,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      host: viteEnv.VITE_HOST,
      port: viteEnv.VITE_PORT,
      // 指定开发服务器端口。
      // 注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。
      open: viteEnv.VITE_OPEN
      // 在开发服务器启动时自动在浏览器中打开应用程序。
      // 当此值为字符串时，会被用作 URL 的路径名。
      // 若你想指定喜欢的浏览器打开服务器，你可以设置环境变量 process.env.BROWSER（例如：firefox）。
      // 查看 https://github.com/sindresorhus/open#app 获取更多细节。
    },
    base: 'http://sq-tul.txx66.com/weijin/'
  }
})
```

## 环境变量

在 vite 配置里面我们会进行一些配置，一般来说在程序里面写一些硬编码不太好，所以说我们通常会使用变量或者常量去替换我们会在项目的根目录下创建一个 `.env` 的文件，vite 会用一个第三方的依赖去读去文件下的环境变量

### 命名

``` js
# 名字要 VITE 大写开头，可以改没必要。dddd
# 标题
VITE_APP_TITLE = '魏晋的白月光'
# 端口
VITE_PORT = 9527
# 是否自动打开浏览器
VITE_OPEN = true
# host
VITE_HOST = '0.0.0.0'
```

### 读取

``` js
// 在 vite.config.ts 中，读取环境变量
// vite 提供了一个函数来读
import { loadEnv } from 'vite'; 
// 读取的是 nodejs 运行的环境，有超级TM的多，默认读不到我们自己写的
console.log(process.env);
// mode 表示当前情景
// root 表示项目根目录
// ''   表示前缀，'' 默认读取所有的环境变量
loadEnv(mode, root, '') // 在 process.env 基础上还读到了我们写的一些自定义的环境变量
loadEnv(mode, root, 'VITE_') // dddd, 读出来的都是 string 类型
```

* 通过 loadEnv 拿到的环境变量都是字符串的，虽说可以转换但是有失风度，所以我们通常会在根目录下创建一个文件夹 build 文件夹，我在这儿创建了一个 `getEnv.ts` 文件，通过一个专门的函数去处理这个事情，定义了返回类型从而在使用时得到更好的类型推导

  ``` ts
  type Recordable<T = any> = Record<string, T>
  export function wrapperEnv(envConfig: Recordable): ViteEnv {
    const ret: any = {}
    for (const envName of Object.keys(envConfig)) {
      let realName = envConfig[envName].replace(/\\n/g, '\n')
      realName = realName === 'true' ? true : realName === 'false' ? false : realName
      if (envName === 'VITE_PORT') {
        realName = Number(realName)
      }
      ret[envName] = realName
    }
    return ret
  }
  ```

### 在代码中拿到环境变量

  ``` ts
  console.log(import.meta.env)
  
  // 关于环境变量的声明方面，我在 src/typings/vite-env.d.ts 下声明了全局的类型，这样就有 Ts 提示了
  declare interface ViteEnv {
    VITE_APP_TITLE: string
    VITE_PORT: number
    VITE_OPEN: boolean
    VITE_HOST: string
    VITE_DROP_CONSOLE: boolean
  }
  
  //定义映射类型，将属性设置为只读
  type ReadonlyProps<T> = {
    readonly [P in keyof T]: T[P]
  }
  
  interface ImportMetaEnv extends ReadonlyProps<ViteEnv> {}
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  ```

### 默认覆盖模式

  * 使用开发环境用 ` .env.development`

  * 使用测试环境用  `.env.test`

  * 使用生产环境用  `.env.production`

  ``` json
  // 原理是根据 package.json 中运行命令中的 --mode xxx 寻找对应的配置文件
   "scripts": {
      "dev": "vite",
      "build": "vite build --mode production",
      "test": "vite dev --mode test",
      "preview": "vite preview"
    },
  ```

## 依赖预构建

### ESM存在的问题

* **CommonJS 和 UMD 兼容性**：开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。

  当转换 CommonJS 依赖时，Vite 会执行智能导入分析，这样即使导出是动态分配的，按名导入也会符合预期效果：

* **性能**：Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能。

  一些包将它们的 ES 模块构建作为许多单独的文件相互导入。例如，[`lodash-es` 有超过 600 个内置模块](https://unpkg.com/browse/lodash-es/)！当我们执行 `import { debounce } from 'lodash-es'` 时，浏览器同时发出 600 多个 HTTP 请求！尽管服务器在处理这些请求时没有问题，但大量的请求会在浏览器端造成网络拥塞，导致页面的加载速度相当慢。

  通过预构建 `lodash-es` 成为一个模块，我们就只需要一个 HTTP 请求了！

### npm 依赖解析

* 预构建：Vite 将会使用 [esbuild](https://esbuild.github.io/) [预构建依赖](https://vitejs.cn/vite3-cn/guide/dep-pre-bundling.html)。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

* 重写url：`/node_modules/vite/deps/`

### 自动依赖搜索

* 优先查找预构建缓存
* 没有找到缓存，自动寻找引入的依赖项
* 服务器已经启动之后，如果遇到一个新的依赖关系导入，而这个依赖关系还没有在缓存中，Vite 将重新运行依赖构建进程并重新加载页面。

## css 工程化

### 原生 CSS 的问题

* 开发体验欠佳
* 样式污染问题
* 浏览器兼容问题
* 代码体积问题

### 工程化方案

#### CSS 预处理器

* 像编程语言一样开发 css，解决原生 CSS 的开发体验问题
* Sass / Scss
* Less
* Stylus

#### CSS Modules

* 把准备好的 css 文件用作模块的方式进行导入

  该选项可以用来为每一段样式内容添加额外的代码。但是要注意，如果你添加的是实际的样式而不仅仅是变量，那这些样式在最终的产物中会重复。

  ``` js
  css: {
  	preprocessorOptions: {
      // 注意最后要加上分号;
    	scss: {
      	additionalData: `@use "./src/styles/scss/global.scss" as *;`
      }
    }
  }
  ```

* 将 css 类名改为哈希值避免重复

  ``` js
  {
    css: {
      modules: {
        // name 表示当前文件名，local 表示当前类名，hash 表示 hash值
      	generateScopedName: '[name]_[local]_[hash:base64:5]'
      }
    }
  ```

#### CSS 后处理器 PostCss

* 解析和处理 CSS 代码功能丰富，插件众多。兼容转换，压缩等功能均能实现
  * Autoprefixer

#### CSS in JS 方案

#### CSS 原子化框架

## 常识类问题

### TS 声明问题

* 众所周知，node 环境下默认没有 ts 支持的,我们可以通过安装对应的第三方支持，例如： `pnpm add @types/node -d`

* 同理可得，很多第三方库也会出现这样的情况，我们也需要安装对应的第三方支持，例如：`lodash-es` 和 `@types/lodash-es`

* TS 环境下可能会出现未找到相应的类型声明的警告，解决办法：将 VIte 提供的文件的类型声明，放置全局的 .d.ts 文件中

  ``` ts
  /// <reference types="vite/client" />
  // zszz，很多时候声明的单文件 .scss、.gif、.img 等并不是一个模块
  // 所以在文件中，vite帮我们提供了这些静态文件的声明，在类型上将这些声明成了模块。TS 就会认为这是一个模块
  
  // 在 tsconfig.json 中也可以
  { "types": ["vite/client"] }
  ```

### nodejs 环境 ESM 的问题

* 要么把文件后缀名改为 mjs,  顺便提一下：cjs --- commonjs
* 要么在 package.json----"type": "module"

### 文件执行环境的问题以及路径查找

* 在 node 环境下，应用的文件路径，node 会帮你补全，例：

  ``` js
  import { debounce } from "lodash-es"   //bare import ESM默认不支持
  ```

* 在浏览环境下，应用的文件路径是必须要完整的。不然浏览器是找不到的

  ``` js
  import { xxx } from '../node_modules/lodash-es/debouce.js'
  ```

* nodejs 路径问题

  ``` js
  console.log(__dirname) // 当前模块所在路径
  console.log(procass.cwd(), 'procass') // nodejs进程的工作目录路径 
  ```

  
