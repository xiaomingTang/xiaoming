# @zimi/utils

一些常用功能函数

### install
```
yarn add @zimi/utils
```

### examples

[genePromiseOnce](#genePromiseOnce)    
[resizeTo](#resizeTo)    
[sleepMs](#sleepMs)    

---

#### genePromiseOnce

``` typescript

// expensiveButStorableAsyncFunction will be called only once forever, unless rejected
const promiseOnce = genePromiseOnce(expensiveButStorableAsyncFunction)

window.addEventListener('resize', () => {
  promiseOnce()
    .then((res) => {
      console.log(`promise successed: ${res}`)
    })
    .catch(() => {
      console.log('catch')
    })
})


```
[↑ all examples ↑](#examples)

#### resizeTo

``` typescript

const src = {
  width: 100,
  height: 200,
}

const target = {
  width: 300,
  height: 400,
}

// srcFitCover is {
//   width: 300,
//   height: 600,
// }
const srcFitCover = resizeTo({
  src,
  target,
  fit: 'cover',
})

// srcFitContain is {
//   width: 200,
//   height: 400,
// }
const srcFitContain = resizeTo({
  src,
  target,
  fit: 'contain',
})

```
[↑ all examples ↑](#examples)

#### sleepMs

``` typescript

async function() {
  await sleepMs(500)
}

```
[↑ all examples ↑](#examples)
