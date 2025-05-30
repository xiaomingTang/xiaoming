# @zimi/utils

一些常用功能函数

### install
```
yarn add @zimi/utils
```

### examples

[dingding](#dingding)    
[createSsrStore_createJsonStorage](#createSsrStore_createJsonStorage)    
[ExactClickChecker](#ExactClickChecker)    
[genePromiseOnce](#genePromiseOnce)    
[historyStateManager](#historyStateManager)    
[resizeTo](#resizeTo)    
[sleepMs](#sleepMs)    
[withStatic](#withStatic)    

---

#### dingding

```ts
import { sendDingGroupMessage, DingError } from '@zimi/utils'

try {
  await sendDingGroupMessage({ xxx })
  console.log('success')
} catch (error) {
  if (DingError.isDingError(error)) {
    console.error(error)
  } else {
    console.error('unknown error: ', error)
  }
}
```
[↑ all examples ↑](#examples)

#### createSsrStore_createJsonStorage

It created for Next.js ssr,   
match server-side rendering with client-side rendering,   
and apply local stored value a little later.

``` tsx

import { create } from 'zustand'

const defaultCounter = {
  count: 0,
  privateKey: 'This value wont be stored'
}

const useCounter = createSsrStore(() => defaultCounter, {
  name: 'key-of-storage',
  storage: createJsonStorage({
    partialKeys: ['count'],
  })
})

function App() {
  const { count } = useCounter()

  const inc = () => {
    useCounter.setState((prev) => prev + 1)
  }

  return <div>
    <p> count: {count} </p>
    <Button onClick={inc}> inc </Button>
  </div>
}

```
[↑ all examples ↑](#examples)

#### ExactClickChecker

```typescript

const clickChecker = new ExactClickChecker()
clickChecker.bindEvents()

// or you can check in mouseup / touchend / click / dblclick
canvas.addEventListener('pointerup', () => {
  if (clickChecker.checkIsClick()) {
    // is exact click
  }
  if (clickChecker.checkIsClick({ durationMs: 300 })) {
    // is exact click
  }
  if (clickChecker.checkIsDoubleClick()) {
    // is exact double click
  }
})

```
[↑ all examples ↑](#examples)

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

#### historyStateManager

``` typescript react

// you should call this function as early as possible
// WARNING: this function includes `window.history.replaceState(xxx)`
historyStateManager.init()

function App() {
  const [num, setNum] = useState(0)
  return (
    <Button
      onClick={() => {
        setNum((prev) => prev + 1)
        historyStateManager.push(async () => {
          if (window.confirm('Are you sure?')) {
            setNum((prev) => prev - 1)
          } else {
            Toastify({ text: 'User rejected' }).showToast()
            throw new Error('reject')
          }
        })
      }}
    >
      {num}
    </Button>
  )
}

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

#### withStatic

``` tsx

import { create } from 'zustand'

const useRawCounter = create(() => ({
  count: 0,
}))

const useCounter = withStatic(useRawCounter, {
  inc() {
    useRawCounter.setState((prev) => prev + 1),
  },
  dec() {
    useRawCounter.setState((prev) => prev - 1),
  },
})

function App() {
  const { count } = useCounter()

  return <div>
    <Button onClick={useCounter.inc}> inc </Button>
    <p> count: {count} </p>
    <Button onClick={useCounter.dec}> dec </Button>
  </div>
}

```
[↑ all examples ↑](#examples)
