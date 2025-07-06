> 代码见 [@zimi/modal](https://github.com/xiaomingTang/xiaoming/tree/master/%40zimi/modal)

几乎完全参考 [nice-modal-react](https://github.com/eBay/nice-modal-react/), 但简化了逻辑:
1. 移除 `NiceModal.create` 并把逻辑放到了 `NiceModal.show` 里面
2. 移除 `NiceModal.hide` 并把逻辑放到了 `NiceModal.resolve` / `NiceModal.reject` 里面
3. `antdModal`, `muiDialog` 等工具函数移动到了 `helpers.tsx` 中
4. 由于移除了 `NiceModal.create`, 因此完全不支持 `NiceModal` 的声明式模态框
    ```tsx
    function CustomModal() {
      // ...
    }

    // declaration modal like this is NOT supported.
    <CustomModal id='xxx' />
    ```
5. 其他基本与 `nice-modal-react` 维持一致

### install

```
yarn add @zimi/modal
```

### examples

``` tsx
import { useModal, NiceModal } from '@zimi/modal'

interface CustomModalProps {
  title: string
}

function CustomModal({ title }: CustomModalProps) {
  const modal = useModal()

  const close = () => {
    modal.resolve('whatever you want')
  }

  return <div
    style={{
      opacity: modal.visible ? 1 : 0,
      transition: 'opacity .5s',
    }}
  >
    <header>
      modal title: {title}
    </header>

    <button onClick={close}>
      close
    </button>
  </div>
}

// will be 'whatever you want'
const res = await NiceModal.show(CustomModal, { title: 'xxx' })
```

### warning

在一些场合下，我们可能需要把 Modal Context 透传下去。如：

``` tsx
function GrandChild() {
  const modal = useModal()
  // ...
}

// bad practice
function Child() {
  const modal = useModal()

  // 由于 Portal 的存在，GrandChild 里面取不到 Modal Context
  return <Portal>
    <GrandChild />
  </Portal>
}

// good practice
function Child() {
  const modal = useModal()

  // 使用 modal.Provider 把 Context 透传下去，
  // 这样 GrandChild 就能正确取到 Modal Context 了
  return <Portal>
+   <modal.Provider>
      <GrandChild />
+   </modal.Provider>
  </Portal>
}

await NiceModal.show(Child)
```
