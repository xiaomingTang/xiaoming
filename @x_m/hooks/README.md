# @x_m/hooks

### install
```
yarn add  @x_m/hooks
```

### examples

[useElementRect](#useElementRect)
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

#### useWarnBeforeUnload

``` typescript

function Component() {
  // show a confirmation dialog before page unload (beforeunload event, NOT component unload)
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
  useWarnBeforeUnload()
}

```
