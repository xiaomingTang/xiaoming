# @x_m/hooks

### install
```
yarn add  @x_m/hooks
```

### examples

[useElementRect](#useElementRect)    
[useListen](#useListen)    
[useRafLoop](#useRafLoop)    
[useWarnBeforeUnload](#useWarnBeforeUnload)    

---

#### useElementRect
``` typescript

function MyComponent() {
  const ref = useRef<HTMLElement>(null)
  const rect = useElementRect(ref)
}

// or

// out of component
const element = document.querySelector('xxx')

function MyComponent() {
  const rect = useElementRect(element)
}

```
[↑ examples ↑](#examples)

#### useListen
``` typescript

function Component() {
  const [count, setCount] = useState(0)

  // will be triggered when count changed
  useListen(count, (prev, next) => {
    console.log(prev, next)
  })
}

```
[↑ examples ↑](#examples)

#### useRafLoop

``` typescript react

import { useRafLoop } from '@x_m/hooks'

function Component() {
  const now = useRafLoop(() => Date.now())

  return <>{now}</>
}

function Component() {
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
[↑ examples ↑](#examples)

#### useWarnBeforeUnload

``` typescript

function Component() {
  // show a confirmation dialog before page unload (beforeunload event, NOT component unload)
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
  useWarnBeforeUnload()
}

```
[↑ examples ↑](#examples)
