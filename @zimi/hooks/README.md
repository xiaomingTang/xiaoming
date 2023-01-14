# @zimi/hooks

### install
```
yarn add  @zimi/hooks
```

### examples

[useElementRect](#useElementRect)    
[useExactClick](#useExactClick)    
[useListen](#useListen)    
[useRafLoop](#useRafLoop)    
[useWarnBeforeUnload](#useWarnBeforeUnload)    

---

#### useElementRect
``` ts

function Test() {
  const ref = useRef<HTMLElement>(null)
  const rect = useElementRect(ref)

  return <div ref={ref}>
    hello world
  </div>
}

// or

// out of component
const element = document.querySelector('xxx')

function Test() {
  const rect = useElementRect(element)
}

```
[↑ all examples ↑](#examples)

#### useExactClick
``` tsx
function Test() {
  const { onPointerDown, checkExactClick } = useExactClick()

  return <div
    onPointerDown={onPointerDown}
    onClick={(e) => {
      if (checkExactClick(e)) {
        // do something
      }
    }}
  >
    hello world
  </div>
}

// or

function Test() {
  const { onPointerDown, checkExactClick } = useExactClick({
    /**
     * x/y 方向移动超过该值则认为不是 click;
     * 
     * 负数 表示不考量该参数;
     * 
     * @default 10
     */
    eps: 10,
    /**
     * 点击时间间隔超过该值则认为不是 click;
     * 
     * 负数 表示不考量该参数;
     * 
     * @default 500
     */
    durationMs: 500,
    /**
     * 是否允许移动后回到原处并触发 click;
     * 
     * @default false
     */
    enableMoveAndBack: false,
  })

  return <div
    onPointerDown={onPointerDown}
    onClick={(e) => {
      if (checkExactClick(e)) {
        // do something
      }
    }}
  >
    hello world
  </div>
}

```
[↑ all examples ↑](#examples)

#### useListen
``` ts

function Test() {
  const [count, setCount] = useState(0)

  // will be triggered when count changed
  useListen(count, (prev, next) => {
    console.log(prev, next)
  })
}

```
[↑ all examples ↑](#examples)

#### useRafLoop

``` tsx

import { useRafLoop } from '@zimi/hooks'

function Test() {
  const now = useRafLoop(() => Date.now())

  return <>{now}</>
}

// or

function Test() {
  const [visibility, setVisibility] = useState(true)

  useRafLoop(() => {
    console.log('rendering...')
  }, {
    enable: visibility,
  })

  return <>
    <p>visibility: {visibility}</p>
    <button onClick={() => {
      setVisibility((prev) => !prev)
    }}>
      toggle visibility
    </button>
  </>
}

```
[↑ all examples ↑](#examples)

#### useWarnBeforeUnload

``` ts

function Test() {
  // show a confirmation dialog before page unload (beforeunload event, NOT component unload)
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
  useWarnBeforeUnload()
}

```
[↑ all examples ↑](#examples)
