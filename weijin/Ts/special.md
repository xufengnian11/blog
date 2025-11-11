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

 细化:类型的控制流分析

Typescript有非常强大的类型推导能力，不单单有之前我们提到的类型拓宽，还可以类型收缩，比如在类型拓宽中，我们就提到了const声明的变量会自动的转变为类型字面量。当然这仅仅是冰山一角，Typescript甚至可以随着你的代码逻辑，不断地尝试窄收窄，这一能力称之为**类型的控制流分析**（也可以简单的理解为就是类型推导）

> 有些人也把**类型的控制流分析**简称为**类型收缩(收窄)**，但是这种称呼容易和const声明类型的类型收窄引起混淆。
>
> 不过怎么称呼无所谓，在具体的语境中，能理解就行。

```javascript
function parse(value: number | string | boolean | null | undefined) {
  if (typeof value === "number") {
    return value * 2;       // number
  } else if (typeof value === "string") {
    return `hello ${value}`; // string
  } else if (typeof value === "boolean") {
    return !value;            // boolean
  } else {
    return value;             // null | undefined
  }
}
```

> 你可以把整个流程控制想象成一条河流，从上而下流过你的程序，随着代码的分支分出一条条支流，在最后重新合并为一条完整的河流。
>
> **在类型控制流分析下，每流过一个if分支，后续联合类型的分支就会少一个，因为这个类型已经在这个分支处理过了，不会进入下一个分支**

##  `typeof`:类型查询

上面的代码中，我们使用了在JavaScript很常用的一个操作符`typeof`，在JavaScript中，我们常常用`typeof`来检查变量类型，通常会返回`"string"`/`"number"`/`"boolean"`/`"function"`/`"object"`等值。

在Typescript中给`typeof`操作符还赋予了新的功能：**类型查询（Type Query Operator）**

简单来说，可以通过`typeof`获取自动推导的类型，给`typeof`一个值，就可以帮你推导出这个值的类型

```javascript
let temp1 = "hello1";
const temp2 = "hello2";
const temp3 = null;
const temp4 = (a: string) => a.toUpperCase();

type Temp1 = typeof temp1; //string
type Temp2 = typeof temp2; //hello2
type Temp3 = typeof temp3; //null
type Temp4 = typeof temp4; // (a: string) => string
```

对象也是可以的

```javascript
const user = {
  name: 'jack',
  age: 18,
  address: {
    province: '四川',
    city: '成都'
  }
}

type User = typeof user;

const person: User = {
  name: 'jack',
  age: 18,
  address: {
    province: '四川',
    city: '成都'
  }
}
```

## `instanceof`实例判断

`typeof`类型检查只能判断`"string"`/`"number"`/`"boolean"`/`"function"`/`"object"`等值。如果遇到了具体的对象类型判断就无能为力了，因此，可以使用`instanceof`关键字

```typescript
class Animal { 
  eat() {
    console.log('animal eat')
  }
}

class Dog extends Animal {
  eat() {
    console.log('dog eat')
  }
  bark() {
    console.log('dog bark')
  }
}

class Cat extends Animal {
  eat() {
    console.log('cat eat')
  }
  meow() {
    console.log('cat meow')
  }
}

function feedAnimal(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark(); // Dog
  }
  else if (animal instanceof Cat) {
    animal.meow(); // Cat
  }
  else {
    animal.eat(); // Animal
  }
}

feedAnimal(new Dog())
```

## `in`：属性检查

JavaScript 语言中，`in`运算符用来确定对象是否包含某个属性名

```typescript
const obj = { a: 123 };

if ('a' in obj) {
  console.log('有a属性');
}
```



在Typescript中，`in`**检查对象是否具有特定的属性，并使用该属性区分不同的类型**。**它通常返回一个布尔值，表示该属性是否存在于该对象中**。

```typescript
type Circle = {
  kind: 'circle';
  radius: number;
}

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Triangle = {
  kind: 'triangle'
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;


function printArea(shape: Shape) {
  if ('radius' in shape) {
    console.log(Math.PI * shape.radius ** 2);
  }
  else if('width' in shape){
    console.log(shape.width * shape.height);
  }
  else {
    console.log(shape.base * shape.height / 2);
  }
}
```

## 字面量类型检查(可辨识联合类型)

再结合着对象的联合类型来看一下问题：

```typescript
type UserTextEvent = { value: string, target: HTMLInputElement};
type UserMouseEvent = { value: number, target: HTMLButtonElement};
type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) { 
  if (typeof event.value === "string") {
    console.log(event.value)   // event.value类型为string
    console.log(event.target); // event.target类型为 HTMLInputElement | HTMLButtonElement
  } else {
    console.log(event.value)   // event.value类型为number
    console.log(event.target); // event.target类型为 HTMLInputElement | HTMLButtonElement
  }
}
```

`event.value`的类型可以顺利的细化，但是`event.target`却不可以，因为handle函数的参数是`UserEvent`。联合之后的`UserEvent`，其实类似于：

```typescript
type UserEvent = {
  value: string | number,
  target: HTMLInputElement | HTMLButtonElement
}
```

也就是当`value:string`的时候，`target`可以选择`HTMLInputElement | HTMLButtonElement`

也就是当`value:number`的时候，`target`也可以选择`HTMLInputElement | HTMLButtonElement`

因此，Typescript需要一种更可靠的方式，明确对象的并集类型的具体情况。

最常见的方式是，使用**字面量类型进行标记**，这样具体有值的情况下，就相当于在进行值的判断，这样Typescript就能很精确的推导出，具体的对象并集类型到底是哪个类型了

```typescript
type UserTextEvent = { type:"TextEvent", value: string, target: HTMLInputElement};
type UserMouseEvent = { type:"MouseEvent", value: number, target: HTMLButtonElement};
type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) { 
  if (event.type === "TextEvent") {
    console.log(event.value)   // event.value类型为string
    console.log(event.target); // event.target类型为 HTMLInputElement
  } else {
    console.log(event.value)   // event.value类型为number
    console.log(event.target); // event.target类型为 HTMLButtonElement
  }
}
handle({ type: "TextEvent", value: "hello", target: document.getElementsByTagName("input")[0] });
```

> 一般像这种多个类型的联合类型，并且多个类型含有一个公共可辨识的公共属性的联合类型，还有一个专门的称呼**"可辨识联合类型"**

**可辨识联合类型**对初学者有实际的指导作用，我们在创建类型的时候，就需要想着**最好创建带有可辨识的联合类型，而不是可选字段**

比如，有这样的情况，如果是`circle`的时候，有`radius`属性，如果是`rect`情况，有`width`和`height`属性。对于初学者，很有可能创建成下面的类型：

```typescript
type Shape = {
  kind: "circle" | "rect"
  radius?: number
  width?: number
  height?: number
}

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // error shape.radius可能未定义
    case "rect":
      return shape.width * shape.height; // error shape.width，shape.height可能未定义
  }
}
```

上面这种方式kind字段没有与其他字段建立关系，因此，不能保证可选属性是否有值。所以报出了未定义的错误(当然在后面的学习中我们可以使用非空断言`!`处理)。

可辨识的联合类型是一种更好的处理方式：

```typescript
type Circle = { kind: "circle", radius: number }
type Rect = { kind: "rect", width: number, height: number }
type Shape = Circle | Rect;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
  }
}
```

## 自定义守卫(谓语动词 is)

自定义守卫是指通过 `{形参} is {类型}` 的语法结构，来给**返回布尔值的条件函数**赋予类型守卫的能力

```typescript
function isString (input: any) {
  return typeof input === 'string';
}
function isNumber (input: any) {
  return typeof input === 'number';
}

function foo (input: string | number) {
  if (isString(input)) {
    console.log(input) // 依然是 string | number
  } 
  else if (isNumber(input)) {
    console.log(input) // 依然是 string | number
  }
}
```

**类型收窄只能在同一的函数中**，如果在不同的函数中就不起作用。

只要我们加上谓语动词：

```typescript
function isString (input: any): input is string {
  return typeof input === 'string';
}
function isNumber (input: any): input is number {
  return typeof input === 'number';
}

function foo (input: string | number) {
  if (isString(input)) {
    console.log(input) // string
  } 
  else if (isNumber(input)) {
    console.log(input) // number
  }
}
```

自定义类型守卫在我做一些比较复杂类型判断的时候比较有用

```typescript
type Box = {
  _v_isBox: boolean,
  value: any,
}

function isBox(box: any): box is Box { 
  return box && box._v_isBox === true;
}

function unWrapBox(box: Box) {
  return isBox(box) ? box.value : box;
}
```

上面的这个代码，其实就是简单模拟了一下Vue3中[isRef](https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts#L97)和[unRef](https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts#L234)的ts代码

```typescript
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}

export function unref<T>(ref: MaybeRef<T> | ComputedRef<T>): T {
  return isRef(ref) ? ref.value : ref
}
```

其实前面讲的`字面量的类型检查`，`typeof`，`instanceof`，`in`以及`自定义守卫`在Typescript中有统一的称呼，都叫做**类型守卫**，其目的其实都是在控制流分析的时候，帮助typescript收紧类型，便于推断 

## never

`never`类型根据其英文翻译，就表示`从来没有`，`绝不`。其实之前已经见到过这个类型

```typescript
type A = string & number; // never
```

我们之前不是讲过有`null`，`undefined`和`void`类型吗？这三个都是有具体意义的，也表示具体的类型，`undefined`表示尚未定义，`null`表示缺少值，甚至是`void`就表示一个空类型，就像没有返回值的函数使用 void 来作为返回值类型标注一样。

而 never 才是一个“什么都没有”的类型，它甚至不包括空的类型，严格来说，**never 类型不携带任何的类型信息**。

比如下面的联合声明：

```javascript
type Foo = string | number | boolean | undefined | null | void | never;
```

我们把常见的基础类型都放入到了联合声明中，但是将鼠标悬浮在类型别名之上，你会发现这里显示的类型是：`string | number | boolean | void | null | undefined`，`never`直接被无视掉了。

> 注意：这个特性在以后的类型编程条件判断中经常会被用到，使用never来填充数据

在typescript的类型系统中，`never` 类型被称为 **Bottom Type**，是**整个类型系统层级中最底层的类型**

如果说`any`，`unknown`是其他每个类型的父类型，那么`never`就是其他每个类型的子类型。

这意味着，**never类型可以赋值给其他任何类型，但是反过来，却行不通**

通常我们不会显式地声明一个 `never` 类型，这是没有任何意义的，它主要被类型检查所使用。

不过在实际工作中，特别是在团队开发中，我们可以利用never的特性与类型的控制流分析，让typescript做出更合理的处理

```typescript
type Method = "GET" | "POST";

function request(url: string, method: Method) {
  if (method === "GET") {
    console.log(method); // GET
    // todos...
  }
  else if (method === "POST") {
    console.log(method); // POST
    // todos...
  }
  else {
    console.log(method) // never
  }
}
```

上面的代码没有什么问题，但是如果某一天，`Method`类型加入了新的联合类型，比如`type Method = "GET" | "POST" | "PUT" | "DELETE";`，特别是在团队开发中，这个时候，request函数是没有任何感知的。

```typescript
type Method = "GET" | "POST" | "PUT" | "DELETE";

function request(url: string, method: Method) {
  if (method === "GET") {
    console.log(method); // GET
    // todos...
  }
  else if (method === "POST") {
    console.log(method); // POST
    // todos...
  }
  else {
    const _neverCheck: never = method;
    throw new Error(`不知道的类型: ${_neverCheck}`);
  }
}
```

将代码修改为现在的这个样子，虽然现在有报错了，**`method`根据类型流分析，还剩下`"PUT" | "DELETE"`类型，所以不能赋值给`never`类型**。但是将错误扼杀在摇篮中，才是在团队项目中想要的结果，而不是等运行了，才去一个个排查，特别是这种隐藏的bug，在团队的成千上万行代码与模块中，去找到这个问题，是非常痛苦的问题。

> 这种方式也叫做**穷举式检查**，积极的对不期望的情况进行错误处理，在编译时就捕获未处理的情况。而不是默默地忽略它们

比如，前面的代码，我们也可以进行修改：

```typescript
type Circle = { kind: "circle", radius: number }
type Rect = { kind: "rect", width: number, height: number }
type Shape = Circle | Rect;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
    default:
      const _neverCheck: never = shape; 
      throw new Error("Invalid shape type");
  }
}
```

如果新加一个类型`const _neverCheck: never = shape;` 这行代码就会报错，因为控制流分析并没有完全结束

```diff
type Circle = { kind: "circle", radius: number }
type Rect = { kind: "rect", width: number, height: number }
+type Triangle = { kind: "triangle", base: number, height: number }
type Shape = Circle | Rect | Triangle;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
+    case "triangle":
+      return shape.base * shape.height / 2;
    default:
      const _neverCheck: never = shape; 
      throw new Error("Invalid shape type");
  }
}
```

还有在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数：

```typescript
function fn():never { 
  throw new Error("error");
}
```

在类型流的分析中，一旦一个返回值类型为 `never` 的函数被调用，那么下方的代码都会被视为无效的代码：

```typescript
function fn():never { 
  throw new Error("error");
}

function foo(n: number) { 
  if (n > 10) { 
    fn();
    let name = "jack"; // 检测到无法访问的代码。ts(7027)
    console.log("hello")
  }
}
```

`never`类型在我们后面讲解的条件类型中也可以做出很有意思的处理

## 反括号运算符

在 JS 中，`[]` 反括号可以用来取值，在 TS 中也沿用了这个符号。

```ts
type user = {
	name: string;
  age: number;
  sex: '男' | '女' | '沃尔玛购物袋'
}

type weiJinName = user['name']; // : string;
type weiJinValue = user['name' | 'age']; // : string | number;
type weiJinValue2 = user['name' | 'sex']; // : string
```

那数组类型呢？

```ts
const arr: string[] = ['a', 'b', 'c'];

type ArrValueType = typeof arr[number]; // string

type user = {
	name: string;
  age: number;
};
```

