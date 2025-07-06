import type { ModalHandler } from '.'

/**
 * Helper function for Ant Design Modal (v4)
 */
export const antdModal = (
  modal: ModalHandler
): {
  visible: boolean
  onCancel: () => void
  onOk: () => void
  afterClose: () => void
} => ({
  visible: modal.visible,
  onOk: () => modal.resolve(),
  onCancel: () => modal.reject(new Error('Modal cancelled')),
  afterClose: () => {
    modal.remove()
  },
})

/**
 * Helper function for Ant Design Modal (v5)
 */
export const antdModalV5 = (
  modal: ModalHandler
): {
  open: boolean
  onCancel: () => void
  onOk: () => void
  afterClose: () => void
} => {
  const { onOk, onCancel, afterClose } = antdModal(modal)
  return {
    open: modal.visible,
    onOk,
    onCancel,
    afterClose,
  }
}

/**
 * Helper function for Ant Design Drawer (v4)
 */
export const antdDrawer = (
  modal: ModalHandler
): {
  visible: boolean
  onClose: () => void
  afterVisibleChange: (visible: boolean) => void
} => ({
  visible: modal.visible,
  onClose: () => modal.reject(new Error('Drawer closed')),
  afterVisibleChange: (v: boolean) => {
    if (!v) {
      modal.remove()
    }
  },
})

/**
 * Helper function for Ant Design Drawer (v5)
 */
export const antdDrawerV5 = (
  modal: ModalHandler
): {
  open: boolean
  onClose: () => void
  afterOpenChange: (visible: boolean) => void
} => {
  const { onClose, afterVisibleChange: afterOpenChange } = antdDrawer(modal)
  return {
    open: modal.visible,
    onClose,
    afterOpenChange,
  }
}

/**
 * Helper function for Material-UI Dialog
 */
export const muiDialog = (
  modal: ModalHandler
): { open: boolean; onClose: () => void; onExited: () => void } => ({
  open: modal.visible,
  onClose: () => modal.reject(new Error('Dialog closed')),
  onExited: () => {
    modal.remove()
  },
})

/**
 * Helper function for Material-UI Dialog (v5)
 */
export const muiDialogV5 = (
  modal: ModalHandler
): {
  open: boolean
  onClose: () => void
  TransitionProps: { onExited: () => void }
} => ({
  open: modal.visible,
  onClose: () => modal.reject(new Error('Dialog closed')),
  TransitionProps: {
    onExited: () => {
      modal.remove()
    },
  },
})

/**
 * Helper function for Bootstrap Dialog
 */
export const bootstrapDialog = (
  modal: ModalHandler
): { show: boolean; onHide: () => void; onExited: () => void } => ({
  show: modal.visible,
  onHide: () => modal.reject(new Error('Dialog hidden')),
  onExited: () => {
    modal.remove()
  },
})
