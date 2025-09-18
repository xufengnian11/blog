# 特殊类型

## 泛型

TypeScript 中的泛型是一种**工具**，它允许在定义函数、接口或者类时提供一个类型变量。这种类型变量可以被视为一种特殊的标记，它允许你在不同的地方使用不同的、具体的类型。泛型提供了一种方式来创建可重用的组件，这些组件可以支持多种类型的数据，同事保持类型的安全性。

```ts
const a = ref("a");
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString"); // output => "string";
let output1 = identity(a.value); // output => string;

console.log(output, output1); // "myString", "a"

function getTuple<T>(a: T, b: T): [T, T] {
  return [a, b];
}
const tuple = getTuple<string>("a", "b"); // tuple => ["a", "b"]
console.log(tuple); // ["a", "b"]

// 定义一个函数，传入一个数组和回调函数，返回一个过滤后的数组
const myNumberFilter = (
  arr: number[],
  callback: (item: number, index?: number) => boolean
) => {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];
    if (callback(item, i)) {
      result.push(item);
    }
  }
  return result;
};

const filterArr = myNumberFilter([1, 2, 3, 4], (item) => {
  return item % 2 === 0;
});
console.log(filterArr, "filterArr"); // [2, 4]

// 如何让 myNumberFilter 函数支持多种类型的数组呢？
function myFilter<T>(
  arr: T[],
  callback: (item: T, index?: number) => boolean
): T[] {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];
    if (callback(item, i)) {
      result.push(item);
    }
  }
  return result;
}
const a = [
  "xxx.js",
  "yyy.js",
  "zzz.js",
  "xxx.css",
  "yyy.css",
  "zzz.css",
  "xxx.html",
  "yyy.html",
  "zzz.html",
];
const filterArr = myFilter(a, (item) => {
  return item.includes(".js");
});
console.log(filterArr, "filterArr"); // ['xxx.js', 'yyy.js', 'zzz.js']
```

## 装箱与拆箱类型

```ts
// 在类型中有个一个特殊类型：{} Object;
// 当我们定义一个类型是 {} 的时候，会有诸多奇妙变化；
type obj = {};
const a: obj = {}; // ta 可以是一个空对象
const b: obj = { name: "weijin" }; // 可以是一个有成员的对象
const c: obj = "weijin"; // 甚至可以是一字符串！

// ta 还有个远房亲戚，object
const d: object = {}; // 这个类型只能用来声明ta的子类型，对象、函数、数组，但是基本数据类型是不可以的
```

被 js 的原型链折磨过的大家应该都知道，原型链的顶端是 Object 以及 Function，这也意味着所有的原始类型与对象类型最终都指向 Object，在 TypeScript 中就表现为 Object 包含了所有的类型

```ts
const temp1: Object = { name: "jack" };
const temp2: Object = () => {};
const temp3: Object = [];
const temp4: Object = new String("hello");
const temp5: Object = "world";
const temp6: Object = 123;
const temp7: Object = true;
const temp8: Object = Symbol("a");

// 关闭strictNullChecks，下面也成立
const temp9: Object = undefined;
const temp10: Object = null;
const temp11: Object = void 0;

// const tmp1: object = {};
// const tmp2: object = "world"; // error
// const tmp3: object = 123;     // error
```

和 Object 类似的还有 Boolean、Number、String、Symbol，这几个**装箱类型（Boxed Types）** 同样包含了一些超出预期的类型。以 String 为例，它同样包括 undefined、null、void，以及代表的 **拆箱类型（Unboxed Types）** string

```ts
let str1: string = "Hello World";

let str2: String = "Hello World";

let str3: String = new String("Hello World");

// let str4: string = new String("Hello World"); // Error*

str2 = str1;

// str1 = str2; // Error*

// 之前的类型字面量一样有这样的父子类型兼容问题*

let str5: "Hello World" = "Hello World";

str2 = str5;

// str5 = str2; // Error*
```

## 类型断言

简单来说，TS 会根据上下文进行推测，但是有时候我们可以人为干涉，确定某一个类型

类型断言就是告诉 TS 编译器，“I know what I'm doing. If anything goes wrong, I'll take the blame”

这样的话我们能使用更宽松的方式处理类型问题

```ts
// 语法
// 1、值 as 类型
// 2、<类型>值
const a: any = "weijin";
const b = (a as string).length; // 推荐
const c = (<string>a).length; // react 中的 jsx 语法和<类型>值的方式会产生歧义
```

**非空断言**

当你不确定某个值不是 null 或者 undefined 时候，可以直接使用非空断言

```ts
// 语法 值!
const name: undefined | string = 'weijin';
const name1 = name!; // 如果没有 ！ts 会提示 name 可能是 undefined

const inputDom = document.querySelector("input");
inputDom!.addEventListener("change", e => {
  console.log((e.target as HTMLInputElement).value);
})

type Box = {name: string}；
const getUserInfo = () => {
	if (Math.radom() > 0.5) {
    return {name: '魏晋'} as Box
  }
  return undefined;
};
const creatProduction(box?: Box) {...};

creatProduction(getUserInfo()) // error: Box | underfined 的参数不能赋给类型“Box”的参数

creatProduction(getUserInfo()!) // ✅
creatProduction(getUserInfo() as Box) // ✅
```
