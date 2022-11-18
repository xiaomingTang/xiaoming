# @zimi/utils

一些常用功能函数

### install
```
yarn add @zimi/utils
```

### examples

[genePromiseOnce](#genePromiseOnce)    
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
[↑ examples ↑](#examples)

#### sleepMs

``` typescript

async function() {
  await sleepMs(500)
}

```
[↑ examples ↑](#examples)
