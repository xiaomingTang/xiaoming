> 代码见 [@zimi/remote](https://github.com/xiaomingTang/xiaoming/tree/master/%40zimi/remote)

- 本地可以是浏览器、服务器，甚至一些受限的 `js` 子集
- 远端可以是任何终端，如 `iframe` / `Java` 服务器 等
- 对远端响应的数据格式也不严格限制（可以集中解析）
- 已在公司游戏前后端通信中应用，极大地降低了通信成本（简化调用）
- ts 类型严格

## install
```
pnpm i @zimi/remote
```

## examples

### 调用示意

```ts

// 远端
remote.register('something', async (params: Whatever) => {
  return WhatYouWant
})

// 本地
// res === WhatYouWant
const res = await remote._.something(xxx)

```

### iframe 与父级相互调用

```ts
// 1. 声明各自能提供的函数类型
// type.d.ts

// 父级能提供的函数
export type FuncsFromParent = {
  plus: (data: [number, number]) => Promise<number>
}

// 子级能提供的函数
export type FuncsFromChild = {
  multiply: (data: [number, number]) => Promise<number>
}
```

```ts
// 2. 父级 remote 初始化
// parent.ts

import { Remote, createIframeAdaptor } from '@zimi/remote'

function getOpWindow() {
  return document.querySelector<HTMLIFrameElement>('#child-iframe')?.contentWindow
}

// 我们提供了生成 iframe adaptor 的工具函数
// 你也可以参考实现自己的 adaptor, 没多少代码
const adaptor = createIframeAdaptor({
  onEmit: (data) => {
    // 此处仅为示意，业务场景下应当限制对方的域名
    getOpWindow()?.postMessage(data, '*')
  },
})

const remote = new Remote<FuncsFromParent, FuncsFromChild>(adaptor, {
  deviceId: 'parent',
})

// 父级注册自己能提供的函数
remote.register('plus', async ([a, b]) => a + b)
```

```ts
// 3. 子级 remote 初始化
// child-iframe.ts

import { Remote, createIframeAdaptor } from '@zimi/remote'

function getOpWindow() {
  return window.top
}

// 我们提供了生成 iframe adaptor 的工具函数
// 你也可以参考实现自己的 adaptor, 没多少代码
const adaptor = createIframeAdaptor({
  onEmit: (data) => {
    // 此处仅为示意，业务场景下应当限制对方的域名
    getOpWindow()?.postMessage(data, '*')
  },
})

const remote = new Remote<FuncsFromChild, FuncsFromParent>(adaptor, {
  // 当涉及到多子级时，可以通过该 deviceId 来区分彼此，
  // 达到与不同子级通信的效果
  deviceId: 'child',
})

// 子级注册自己能提供的函数
remote.register('multiply', async ([a, b]) => a * b)
```

```ts
// 好了，现在你可以父子间随意通信了

// 对方所有函数都被代理到 remote._.xxx 上了

// parent.ts
// 父级中可以直接调用子级的函数
// 有严格的类型与提示
await remote._.multiply([3, 2])

await remote._.multiply([3, 2], {
  // 每个函数可以单独指定超时时间，超时后会抛出 RemoteTimeoutError
  timeoutMs: 1000,
  // 每个函数可以指定调用特定目标所有的函数（需要在 adaptor onEmit 中根据 targetDeviceId 往不同设备发送消息）
  targetDeviceId: 'child-2'
})

// 调用对方未注册的函数，会抛出 RemoteNotFoundError
await remote._.notRegisteredFunc()

// 当对方函数发生运行时错误时，会抛出 RemoteError
// 以上所有 error 都继承自 Error
```

### 浏览器与服务器通信

```ts
// 对方怎么写我们就不管了，假设对方返回的数据格式为：
interface JavaResponse {
  // 假设 code >= 300 为错误；code < 300 为成功
  code: number
  // 响应的数据
  data: unknown
  // 可能存在的错误信息
  errorMsg?: string
}
```

此时 adaptor 的 onEmit 函数稍微有些复杂，它需要解析服务端响应的数据，并封装为我们需要的格式：

```ts
const adaptor = createHttpAdaptor({
  onEmit: async (data) => {
    // 这里只是简单示意，使用者可以根据自己的情况构造 request
    const res = await fetch(`https://xxx.com/api/${data.name}`, {
      method: 'POST',
      body: JSON.stringify(data.data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // 下面相当于我们代 server 端封装了一下数据
    // callbackName 是一定会有的，此处只是为了类型安全
    const callbackName = data.callbackName ?? 'IMPOSSIBLE_NO_CALLBACK_NAME'
    const adaptorData: AdaptorPackageData = {
      // 由于我们代 server 抛出事件
      // 所以这里的 deviceId 和 targetDeviceId 是相反的
      deviceId: data.targetDeviceId,
      targetDeviceId: data.deviceId,
      name: callbackName,
      // 我们在下面根据不同情况来填充 data
      data: null,
    }
    if (!res.ok) {
      adaptorData.data = response.error(new RemoteError('network error'))
    } else {
      const json = (await res.json()) as {
        code: number
        data: unknown
        errorMsg?: string
      }
      if (json.code < 300) {
        adaptorData.data = response.success(json.data)
      } else {
        const error = new RemoteError(`server error: ${json.errorMsg}`)
        // RemoteError 也接受 code, 你可以把服务端响应的错误码挂到其上，便于业务上区分处理
        error.code = json.code
        adaptorData.data = response.error(error)
      }
    }
    // 一定要抛出 every 事件，remote 包基于此处理远端的响应
    remoteEventManager.emit(remoteEventManager.EVERY_EVENT_NAME, adaptorData)
    remoteEventManager.emit(callbackName, adaptorData)
  },
})

// 由于服务端不会调用我们，所以我们无需提供函数，自然也无需调用 remote.register 注册函数
const remote = new Remote<{}, FuncsFromHttp>(adaptor, {
  deviceId: 'client',
})

// 使用方法同前
await remote._.xxx(anyData)
```

### 与其他端通信（如 websocket）略

你可以看看 `iframe adaptor` / `http adaptor` 源码，包含空行也就 30 行，依葫芦画瓢很轻易就能写一个。

## 与 rpc 相比的优势

- 不局限于与服务端的通信，无论对方是任何端，只要能与 js 通信，就能使用该包；
- 相互通信，不存在“主从”的概念，通信双方是平等的；
- 类型严格；
- 包较底层，对项目整体的侵入较小，几乎不限制对方的响应的数据格式（因为可以自由解析对方的响应，即自由 emit）；

## 协议

> 由于通信双方是平等的，所以 B 调用 A 的流程也是一样的

![protocol.png](https://cdn.16px.cc/public/2024-12-08/fm5up4GM9UCz.png?r=1682x836)

---
---

## remote value

> 像使用 local value 一样使用 remote value

**首先强调一遍，这个包是一个通信的包，不负责权限控制，需要使用者在业务层面进行恰当的处理，控制好什么该暴露，什么不该暴露。**

如果我们（暂且称为 甲 端）需要访问其他端（可能是服务器，也可能是其他 iframe or whatever，暂且称为 乙 端）的一些数据/对象/方法，我们通常是这么做的：

// 乙 端
```ts
const obj = {
  value: number,
  setValue: (newValue: number) => {
    obj.value = newValue
  }
}

register({
  method: 'get',
  name: 'getValue',
  handler: () => {
    return obj.value
  }
})

register({
  method: 'post',
  name: 'setValue',
  handler: (newValue: string) => {
    obj.setValue(newValue)
  }
})
```

// 甲 端
```ts
const value = await fetch.get('getValue')
await fetch.post('setValue', newValue)
```

有没有感觉在重复劳动？我 乙 端已经有了一个现成的`obj`，可是我还是需要在`register`处“封装”一下。

---

那么，**下面这个**怎么样：

// 乙 端
```ts
exposeToRemote(obj, config)
```

// 甲 端
```ts
import { type obj } from '/path/to/obj'

const remoteObj = remoteValue<typeof obj>(config)

// 很遗憾没能实现 await remoteObj.value 直接取值，
// 无论是值还是函数，必须在后面加一个括号调用，才能取到结果。
const value = await remoteObj.value()
const subValue = await remoteObj.deep.path.to.value()

await remoteObj.setValue(newValue)
await remoteObj.deep.path.to.func(...params)
```

**再次强调一遍，这个包是一个通信的包，不负责权限控制，需要使用者在业务层面进行恰当的处理，控制好什么该暴露，什么不该暴露。**
