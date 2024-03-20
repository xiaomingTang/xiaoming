# @zimi/interact-web

对 [@zimi/interact](../interact/README.md) 在各个交互方式上做了一个封装

### install
```
yarn add @zimi/interact-web
```

### examples

``` typescript

import InteractWeb from '@zimi/interact-web'

const interact = new InteractWeb()
const elem = document.querySelector('xxx')

interact.attach(elem)
interact.addListener('change', () => {
  elem.style.transform = interact.formatToCss()
})

```
