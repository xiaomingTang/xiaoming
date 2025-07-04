> 代码见 [@zimi/modal](https://github.com/xiaomingTang/xiaoming/tree/master/%40zimi/modal)

几乎完全参考 [nice-modal-react](https://github.com/eBay/nice-modal-react/), 但简化了逻辑:
1. 移除 `NiceModal.create` 并把逻辑放到了 `NiceModal.show` 里面
2. 移除 `NiceModal.hide` 并把逻辑放到了 `NiceModal.resolve` / `NiceModal.reject` 里面
3. `antdModal`, `muiDialog` 等工具函数移动到了 `helpers.tsx` 中
4. 其他基本与 `nice-modal-react` 维持一致

### install

```
yarn add @zimi/modal
```

### examples

``` typescript react
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

// will be resolved value
const res = await NiceModal.show(CustomModal, { title: 'xxx' })
```
