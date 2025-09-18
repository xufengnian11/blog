# 常见类型

## any 类型

any 类型可以绕过类型检查，因此，any 类型的数据可以赋值给任意类型,当然如果没有约束，也没有类型推断，那这个类型就是 any 类型（typeScript ? anyScript ）

## 字面量类型

```ts
let a: "hello" = "hello";
let b: 1 = 1;
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
const a: [string, number, boolean] = ["hello", 1, true];
```

**场景**：在地图中，使用经纬度坐标来标记位置信息

可以使用数组来记录坐标，那么该数组中智游两个元素，并且这两个元素都是数值类型

```ts
// 使用 number[] 的缺陷：不严谨，因为该类型的数组中可以出现任意多个数字
const position: number[] = [36.24525960315916, 112.85791397094728];
```

更好的方式：**元组（Tuple）**

元组类型是另一种类型的数组，他确切的知道包含多少个元素，以及特定索引对应类型

```ts
const position: [number, number] = [36.24525960315916, 112.85791397094728];
```

元组类型可以确切的标记出数组的长度，以及每个索引下的类型

```ts
let tuple: [] = []; // 空元组
tuple = [1]; // 🙅‍♂️
```

## 函数

其实和 js 的区别无非也就是多了参数和返回值的类型定义

返回类型可以进行推断，其实参数的类型也能够通过类型检测的 `"noImplicitAny": false` 配置取消

```ts
function add(a: number, b: number): number {
  return a + b;
}

const a = add(1, 2);
```

### 可选参数和默认参数

```ts
function sum1(a: number, b: number, c?: number) {
  return a + b + (c || 0);
}
sum1(1, 2);

// 默认参数本身就是可选参数
function sum2(a: number, b: number, c = 0) {
  return a + b + c;
}
sum2(1, 2);
```

### 剩余参数

```ts
const fun = (a: number, ...args: number[]) => {
  console.log(a, args, "args");
};
fun(1, 2, 3, 4, 5); // 1 [2, 3, 4, 5] 'args'
```

## VOID

函数没有显式的返回值类型，会被默认的推导为 void

```ts
function print(): void {
  console.log("hello 帅哥");
  console.log("hello 美女（吹流氓哨）");
}
```

## 对象字面量类型

```ts
const obj = { name: "魏晋", length: "18cm" };

const obj2: { name: string; length: number } = {
  name: "魏晋",
  length: "18cm",
};

// 在函数参数或者返回值中使用对象字面量
function getUserInfo(user: {
  name: string;
  length: number;
}): { name: string; length: number }[] {}
```

## 自定义类型：类型别名与接口

在 TS 中，**类型别名（Type Aliases）和接口（Interfaces）** 是两种定义对象类型的方式。他们在很多情况下可以互换使用，但各自有其特点和最佳应用场景

**类型别名** 是一种为类型创建新名称的方式，就是取一个新的名字，类型别名可以是任何有效的类型，包括基本类型、联合类型、元组等...

```ts
// 类型别名
// type 类型名称 = 类型
type ID = number | string;
type Age = number;
type Name = string;
type userInfo = { id: ID; age: Age; name: Name };
type InfoFn = (id: number, name?: string) => string;
```

**接口** 是面向对象的概念，因此它定义对象结构的一种方式，它描述了对象的形状，即对象应该有哪些属性以及属性的类型。接口主要用于声明对象的结构

```typescript
interface InterfaceName {
  // structure
}

interface Person {
  id: number;
  name: string;
  age: number;
}

interface Book {
  id: number;
  name: string;
  price?: number;
  // 函数类型的表示方式
  show(id: number): void;
  filter: (id: number) => void;
  info: InfoFn;
}

const obj4: Person = {
  id: 1,
  name: "lily",
  age: 18,
};
```

有了自定义的类型之后，可以很方便的在函数和数组中使用

```typescript
function fn(user: User) {}

const users: User[] = [];
```

## 联合类型 `|`

有的时候一个值可能是 string 也可能是 number，或者这个类型并不仅仅是一个类型字面量的值。我们希望可以限定是多个值，那这个时候我们该怎么表示呢？

```ts
type Width = number | string;
const width1: Width = 100;
const width2: Width = "100px";

type Color = "red" | "blue" | "green";
const color1 = "red"; // ✅
const color2 = "blue"; // ✅
const color3 = "black"; // error
```

同样的，如果是对象类型一样可以

```ts
type Student = { name: string; score: number };
type Teacher = { name: string; age: number; subject: string };
type Person = Student | Teacher;

const person1: Person = { name: "jack", score: 100 };
const person2: Person = { name: "jack", age: 18, subject: "math" };
const person3: Person = { name: "jack", age: 18, subject: "math", score: 100 };
const person4: Person = { name: "jack" }; // error
```

由于是联合，从上面的代码中就可以看出，Person 类型可以是 Student 类型的值，也可以是 Teacher 类型的值，甚至两者兼具结构合并之后的值也行。当然，你也不能两个都不是，所以 person4 报错

但是使用对象的联合类型很容易让我们产生疑惑。上面的 person1 和 person2 对象都好说，取的是联合，所以我们可以要么是 Student，要么可以是 Teacher。要么其实我们可以两个都是，所以 person3 这样赋值是没有问题的。

但是要取值的时候就会发生问题

```ts
const person3: Person = { name: "jack", age: 18, subject: "math", score: 100 };

console.log(person3.name);
console.log(person3.age); // error 类型Person上不存在属性age
console.log(person3.score); // error 类型Person上不存在属性score
```

虽然 Student 类型和 Teacher 类型的联合都能赋值给 person3，但是实际在使用的时候 Student 有的属性，Teacher 并不一定有，反过来也一样，因此只能调用两者共同的属性`name`。

> 如果联合类型不相交，那么值只能属于联合类型下的某个成员，不能同时属于每个成员

## 交叉类型 `&`

交叉类型和符号的意思相似，就表示 and 的意思，把`&`相交的组合起来，值需要全部满足相交组合的类型

```ts
type Width = number | string;
const width1: Width = 100;
const width2: Width = "100px";

type Color = "red" | "blue" | "green";
const color1: Color = "red";
const color2: Color = "blue";
const color3: Color = "green";
```

同样的，如果是对象类型，一样可以

```ts
type Student = { name: string; score: number };
type Teacher = { name: string; age: number; subject: string };
type User = Student & Teacher;
const user1: User = { name: "jack", age: 18, subject: "math" }; // error 缺少属性"score"
```

拿上面的类型来说，`A&B` ----> 一说交集应该是，`type C = {name:string}` 才对啊，最后得到的好像是我记忆中数学的联合类型啊？不用对你的记忆怀疑，你的记忆是对的，你可以把锅丢给翻译

为了便于理解，你可以这样想：**C 既符合 A 也符合 B，所以是 A 和 B 的“交叉”**，有了这样的理解，下面出现的一些情况，我们才能更好的理解

相比联合类型，交叉类型的范围就没有那么广泛了，因为你不可能把具体的值使用`&`组合，这样意义也就混乱了

```ts
type Width = number & string; // never类型
```

> `number` 和 `string` 没有什么交集，因此根本无法给变量赋值，交叉类型始终交叉的是类型，类型字面量或者基础类型，在做类型交叉的时候没有任何意义，因此得到的结果是 never。

其实，对象字面量类型一样会有这样的效果

```ts
type P = {
  name: string;
  sex: string;
};
type T = {
  name: string;
  age: number;
};
type PT = P & T;

const a: PT = {
  name: "jack",
  sex: "男",
  age: 11,
};
```

如果有同名属性，并且类型一样，就会直接合并，但是如果类型不一样呢？

```diff
type P = {
  name: string
  sex: string
}
type T = {
+  name: number
  age:number
}
type PT = P & T

const a: PT = {
+  name: 'jack', // error 不能将类型“string”分配给类型“never”
  sex:'男',
  age:11
}
```

不过我们可以使用交集类型的特性，达到一些我们需要的效果。

比如，我们可能有一个联合类型，在实际开发中，可能这个联合类型我们并不知道有哪些，或者可能这个联合类型直接赋值给另外一个类型的时候会报错，我们可以使用`&`运算符对其进行约束

```ts
type params = string | number | boolean;
type pt = params & string;
```

我们还能使用交叉类型来实现类似于继承的效果

```ts
type Goods = {
  id: number;
  name: string;
  price: number;
};

type Cart = Goods & {
  count: number;
};

type Order = Goods & {
  count: number;
  totalPrice: number;
};

const goods: Goods = {
  id: 1,
  name: "goods",
  price: 100,
};

const cart: Cart = {
  id: 1,
  name: "goods",
  price: 100,
  count: 1,
};

const order: Order = {
  id: 1,
  name: "goods",
  price: 100,
  count: 1,
  totalPrice: 100,
};
```

## 可选链操作符

注意，可选链操作符是 ES2020 新的语法特性，并不是 TS 的新特性

可选链操作符 `?.` 使得我们在尝试访问一个对象的属性或调用一个方法时，如果该对象是 `undefined` 或 `null`，不会引发错误，而是会返回 `undefined`。这样可以避免使用冗长的条件语句来检查对象的每个层级。

```ts
const userInfo = { name: "weijin", desc: "大帅哥" };
userInfo["height"] = "180cm";
console.log(userInfo?.height); // undefined 但是不会报错 其实应该是 180cm
```
