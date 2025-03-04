# 常见类型

## any 类型

any 类型可以绕过类型检查，因此，any 类型的数据可以赋值给任意类型,当然如果没有约束，也没有类型推断，那这个类型就是 any 类型（typeScript ? anyScript ）

## 字面量类型

```ts
let a: 'hello' = 'hello'
let b: 1 = 1
```

## 联合类型

联合类型就是多个类型组合的一个类型，比如：

```ts
const a: '帅哥' | number | '魏晋' = 1;  ✅
const b: '帅哥' | number | '魏晋' = ''; ❌
```

## 数组类型

数组类型可以通过 “类型[]” 来定义，比如：number[]、string[]...

```ts
const a:number[] = [1, 2, 3]; ✅
const b:number[] = ['1', '2', '3']; ❌
const c:Array<number> = [1, 2, '3']; ❌

// 数组也可以有联合类型
type 彭于晏 = '彭于晏' | '男' | 183 ｜ '汉族';

const 魏晋: 彭于晏[] = ['男', 183]; ✅
const 陆仁嘉: 彭于晏[] = ['陆仁嘉', 'lurenjia', '170cm']; ❌ // 不能将类型“"陆仁嘉"”分配给类型“彭于晏”。

// but 请注意
type 吴彦祖 = '男' | '吴彦祖' | 186 | '美国';

const 魏晋: 彭于晏[] | 吴彦祖[] = ['男', '吴彦祖', 183]; 🙅‍♂️ // 要么是 彭于晏[] 要么是 吴彦祖[]，你不能既要还要
const 陆仁嘉: 彭于晏[] | 吴彦祖[] = ['男', '186']; ✅ // 你好，吴彦祖
```

- 空数组默认推断为 any[]，不过和类型检查机制有关
- "noImplicitAny": true // 不允许隐式的 any 类型

## 元组类型（tuple）

一个固定长度的数组，并且数组中每一项的类型确定

```ts
const a: [string, number, boolean] = ['hello', 1, true]
```

**场景**：在地图中，使用经纬度坐标来标记位置信息

可以使用数组来记录坐标，那么该数组中智游两个元素，并且这两个元素都是数值类型

```ts
// 使用 number[] 的缺陷：不严谨，因为该类型的数组中可以出现任意多个数字
const position: number[] = [36.24525960315916, 112.85791397094728]
```

更好的方式：**元组（Tuple）**

元组类型是另一种类型的数组，他确切的知道包含多少个元素，以及特定索引对应类型

```ts
const position: [number, number] = [36.24525960315916, 112.85791397094728]
```

元组类型可以确切的标记出数组的长度，以及每个索引下的类型

```ts
let tuple: [] = [] // 空元组
tuple = [1] // 🙅‍♂️
```

## 函数

其实和 js 的区别无非也就是多了参数和返回值的类型定义

返回类型可以进行推断，其实参数的类型也能够通过类型检测的 `"noImplicitAny": false` 配置取消

```ts
function add(a: number, b: number): number {
  return a + b
}

const a = add(1, 2)
```

### 可选参数和默认参数

```ts
function sum1(a: number, b: number, c?: number) {
  return a + b + (c || 0)
}
sum1(1, 2)

// 默认参数本身就是可选参数
function sum2(a: number, b: number, c = 0) {
  return a + b + c
}
sum2(1, 2)
```

### 剩余参数

```ts
const fun = (a: number, ...args: number[]) => {
  console.log(a, args, 'args')
}
fun(1, 2, 3, 4, 5) // 1 [2, 3, 4, 5] 'args'
```

## VOID

函数没有显式的返回值类型，会被默认的推导为 void

```ts
function print(): void {
  console.log('hello 帅哥')
  console.log('hello 美女（吹流氓哨）')
}
```

## 泛型

TypeScript 中的泛型是一种**工具**，它允许在定义函数、接口或者类时提供一个类型变量。这种类型变量可以被视为一种特殊的标记，它允许你在不同的地方使用不同的、具体的类型。泛型提供了一种方式来创建可重用的组件，这些组件可以支持多种类型的数据，同事保持类型的安全性。

```ts
const a = ref('a')
function identity<T>(arg: T): T {
  return arg
}

let output = identity<string>('myString') // output => "string";
let output1 = identity(a.value) // output => string;

console.log(output, output1) // "myString", "a"

function getTuple<T>(a: T, b: T): [T, T] {
  return [a, b]
}
const tuple = getTuple<string>('a', 'b') // tuple => ["a", "b"]
console.log(tuple) // ["a", "b"]

// 定义一个函数，传入一个数组和回调函数，返回一个过滤后的数组
const myNumberFilter = (
  arr: number[],
  callback: (item: number, index?: number) => boolean
) => {
  const result = []
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i]
    if (callback(item, i)) {
      result.push(item)
    }
  }
  return result
}

const filterArr = myNumberFilter([1, 2, 3, 4], (item) => {
  return item % 2 === 0
})
console.log(filterArr, 'filterArr') // [2, 4]

// 如何让 myNumberFilter 函数支持多种类型的数组呢？
function myFilter<T>(
  arr: T[],
  callback: (item: T, index?: number) => boolean
): T[] {
  const result = []
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i]
    if (callback(item, i)) {
      result.push(item)
    }
  }
  return result
}
const a = [
  'xxx.js',
  'yyy.js',
  'zzz.js',
  'xxx.css',
  'yyy.css',
  'zzz.css',
  'xxx.html',
  'yyy.html',
  'zzz.html'
]
const filterArr = myFilter(a, (item) => {
  return item.includes('.js')
})
console.log(filterArr, 'filterArr') // ['xxx.js', 'yyy.js', 'zzz.js']
```
