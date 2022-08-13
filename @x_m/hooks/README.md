# @x_m/hooks

### install
```
yarn add  @x_m/hooks
```

### useRafLoop

``` typescript react

import { useRafLoop } from '@x_m/hooks'

function Component() {
  const now = useRafLoop(() => Date.now())

  return <>{now}</>
}

function Component() {
  const [visibility, setVisibility] = useState(true)

  useRafLoop(() => {
    console.log('rendering')
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
