# @x_m/event-emitter

事件触发器

### install
```
yarn add @x_m/event-emitter
```

### examples

``` typescript

const eventBus = new EventEmitter<{
  'eat': ['apple' | 'peach', number];
  'touch': [string];
}>()

eventBus.addListener('eat', (food, count) => {
  console.log(`[eat]: I had eat ${count} ${food}`)
})

eventBus.addListener('touch', (something) => {
  console.log(`[touch]: I'm touching ${something}`)
}, {
  // only listen twice; Infinity if not specified
  times: 2,
})

eventBus.addListener('BUILT_IN_EMIT', ({ type, args }) => {
  switch (type) {
    case 'eat': {
      const [food, count] = args
      console.log(`[BUILT_IN_EMIT]: I had eat ${count} ${food}`)
      break
    }
    case 'touch': {
      const [something] = args
      console.log(`[BUILT_IN_EMIT]: I'm touching ${something}`)
      break
    }
    default:
      break
  }
})

console.log('\nwill eat 2 apple')
eventBus.emit('eat', 'apple', 2)

console.log('\nwill touch apple')
eventBus.emit('touch', 'apple')

console.log('\nwill touch peach')
eventBus.emit('touch', 'peach')

console.log(`
will touch apple,
but [touch] listener can NOT listen this,
as it only listen twice`)
eventBus.emit('touch', 'apple')

```
