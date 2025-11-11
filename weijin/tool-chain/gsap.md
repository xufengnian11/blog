## Gsap

### 概述

GSAP（GreenSock Animation Platform）是一个功能强大且高性能的 JavaScript 动画库，专门用于创建流畅、复杂和跨浏览器兼容的网页动画。GSAP 广泛应用于网页动画、交互动效、SVG 动画、Canvas 动画等场景，是目前最受欢迎的前端动画库之一。

官网地址：[https://gsap.com/](https://gsap.com/)

###  动画方法

```js
gsap.to() // 让元素去做
gsap.from() // 让元素从什么样变回来
gsap.fromTo() // 让元素从什么样到什么样
gsap.set() // 给元素设置一些属性，变化过程无动画
```

### 动画配置项

```js
// "to" tween - animate to provided values  配置选项
gsap.to(".selector", { // selector text, Array, or object
  x: 100, // any properties (not limited to CSS)
  backgroundColor: "red", // camelCase
  duration: 1, // 动画持续时间
  delay: 0.5, // 动画延迟时间
  ease: "power2.inOut", // 缓动函数
  stagger: 0.1, // 单元素错开开始时间
  paused: true, // default is false，初始状态是否暂停
  overwrite: "auto", // default is false，没用到过
  repeat: 2, // number of repeats (-1 for infinite)，重复次数，-1表示无限重复
  repeatDelay: 1, // seconds between repeats，重复延迟？没用到过
  repeatRefresh: true, // invalidates on each repeat，重复刷新？没用到过
  rotate: 360, // 旋转360度
  yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
  yoyoEase: true, // or ease like "power2"
  immediateRender: false, // 即时渲染？没用到过
  onComplete: () => {
		console.log("finished")
  },
  // other callbacks:
  // onStart, onUpdate, onRepeat, onReverseComplete
});
```

### 控制方法

```js
// retain animation reference to control later
let anim = gsap.to(...); // or gsap.timeline(...);
// most methods can be used as getters or setters
anim.play() // plays forward，播放，永远都是正向的播放。
  .pause() // 暂停
  .resume() // respects direction，继续播放。会沿着当前的方向继续播放。
  .reverse() // 反向播放
  .restart() // 重新开始
  .timeScale(2) // 2 = double speed, 0.5 = half speed，2 就是两倍速，0.5 就是半速。
  .seek(1.5) // jump to a time (in seconds) or label，设置动画进度为1.5秒
  .progress(0.5) // jump to halfway，将动画进度设置为50%
  .totalProgress(0.8) // includes repeats，动画总进度。介于 0 和 1 之间
  // when used as setter, returns animation (chaining)

  // other useful methods (tween and timeline)
  .kill() // immediately destroy，“杀死”某个动画进程，然后释放回收。“杀死”后无法执行其它操作。
  .isActive() // true if currently animating，判断动画是否处于活动状态。返回布尔值。
  .then() // Promise，动画完成时进行回调。
  .invalidate() // clear recorded start/end values，清除开始或者结束的值，在现有状态上重新执行。
  .eventCallback() // get/set an event callback

  // timeline-specific methods，时间线方面的操作，需要时间属性的天才来整。我是牛马系的我不懂。
  // add label, tween, timeline, or callback
  .add(thing, position)
  // calls function at given point
  .call(func, params, position)
  // get an Array of the timeline's children
  .getChildren()
  // empties the timeline
  .clear()
  // animate playhead to a position linearly
  .tweenTo(timeOrLabel, {vars})
  // ^^ with both start and end positions
  .tweenFromTo(from, to, {vars})
```

### 实用工具方法

```js
// accessible through gsap.utils.foo()
checkPrefix() // get relevant browser prefix for property
	clamp() // clamp value to range，将值限制在指定范围内
	distribute() // distribute value among and array
	getUnit() // get unit of string
	interpolate() // interpolate between values
	mapRange() // map one range to another
	normalize() // map a range to the 0-1 range
	pipe() // sequence function calls，传递任意数量的函数 pipe（）， 它们将按该顺序被调用，每个函数的返回值将传递给下一个函数。
	random() // generates a random value
	selector() // get a scoped selector function
	shuffle() // shuffles an array in-place
	snap() // snap a value to either increment or array
	gsap.utils.snap(10, 23.5); // 20
	gsap.utils.snap(2, 9.3); // 10

	splitColor() // splits color into RGB array
	toArray() // convert array-like thing to array，
	// const box = gsap.utils.toArray([Object | String | NodeList | Array] )

	unitize() // adds specified unit to function results
	wrap() // place number in range, wrapping to start
	wrapYoyo(); // place number in range, wrapping in reverse
```

