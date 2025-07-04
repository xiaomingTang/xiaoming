/* eslint-disable @typescript-eslint/no-explicit-any */

import { useListen } from '@zimi/hooks'
import React, {
  useEffect,
  useCallback,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react'

export interface NiceModalState {
  id: string
  args?: Record<string, unknown>
  visible?: boolean
}

export interface NiceModalStore {
  [key: string]: NiceModalState
}

interface NiceModalCallbacks {
  [modalId: string]: {
    resolve: (args: unknown) => void
    reject: (args: Error) => void
    promise: Promise<unknown>
  }
}

/**
 * The handler to manage a modal returned by {@link useModal | useModal} hook.
 */
export interface NiceModalHandler<Props = Record<string, unknown>>
  extends NiceModalState {
  /**
   * Whether a modal is visible, it's controlled by {@link NiceModalHandler.show | show} method.
   */
  visible: boolean
  /**
   * Show the modal, it will change {@link NiceModalHandler.visible | visible} state to true.
   * @param args - an object passed to modal component as props.
   */
  show: (args?: Props) => Promise<unknown>
  /**
   * Resolve the promise returned by {@link NiceModalHandler.show | show} method and hide the modal.
   */
  resolve: (args?: unknown) => void
  /**
   * Reject the promise returned by {@link NiceModalHandler.show | show} method and hide the modal.
   */
  reject: (error?: Error) => void
  /**
   * Remove the modal component from React component tree. It improves performance compared to just making a modal invisible.
   */
  remove: () => void
}

const symModalId = Symbol('NiceModalId')
const initialState: NiceModalStore = {}
const ModalContext = React.createContext(initialState)
const NiceModalIdContext = React.createContext<string | null>(null)

const MODAL_REGISTRY: {
  [id: string]: {
    comp: React.FC<any>
    props?: Record<string, unknown>
  }
} = {}

let uidSeed = 0
// eslint-disable-next-line no-plusplus
const getUid = () => `_nice_modal_${uidSeed++}`

// Modal state management - replacing useReducer with simpler state management
let stateUpdateCallbacks: Array<(state: NiceModalStore) => void> = []
let currentState: NiceModalStore = initialState

const updateState = (updater: (state: NiceModalStore) => NiceModalStore) => {
  currentState = updater(currentState)
  stateUpdateCallbacks.forEach((callback) => callback(currentState))
}

const showModal = (modalId: string, args?: Record<string, unknown>) => {
  updateState((state) => ({
    ...state,
    [modalId]: {
      ...state[modalId],
      id: modalId,
      args,
      visible: true,
    },
  }))
}

const hideModal = (modalId: string) => {
  updateState((state) => {
    if (!state[modalId]) return state
    return {
      ...state,
      [modalId]: {
        ...state[modalId],
        visible: false,
      },
    }
  })
}

const removeModal = (modalId: string) => {
  updateState((state) => {
    const newState = { ...state }
    delete newState[modalId]
    return newState
  })
}

/**
 * All registered modals will be rendered in modal placeholder
 */
const register = <T extends React.FC<any>>(
  id: string,
  comp: T,
  props?: NiceModalArgs<T>
): void => {
  if (!MODAL_REGISTRY[id]) {
    MODAL_REGISTRY[id] = { comp, props }
  } else {
    MODAL_REGISTRY[id].props = props
  }
}

/**
 * Unregister a modal.
 * @param id - The id of the modal.
 */
const unregister = (id: string): void => {
  delete MODAL_REGISTRY[id]
}

const modalCallbacks: NiceModalCallbacks = {}
const getModalId = (modal: string | React.FC<any>): string => {
  if (typeof modal === 'string') return modal as string
  const extendedModal = modal as React.FC<any> & Record<string | symbol, string>
  if (!extendedModal[symModalId]) {
    extendedModal[symModalId] = getUid()
  }
  return extendedModal[symModalId]
}

type NiceModalArgs<T> = T extends
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>
  ? React.ComponentProps<T>
  : Record<string, unknown>

function show<T>(modal: string, args?: Record<string, unknown>): Promise<T>
function show<T, P>(modal: string, args: P): Promise<T>
function show<T, P>(modal: React.FC<P>, args: P): Promise<T>

function show(
  modal: React.FC<any> | string,
  args?: NiceModalArgs<React.FC<any>> | Record<string, unknown>
) {
  const modalId = getModalId(modal)

  // If modal is a component, register it with enhanced logic
  if (typeof modal !== 'string' && !MODAL_REGISTRY[modalId]) {
    const OriginalComp = modal as React.FC<any>

    const EnhancedComp = function EnhancedComp(props: any) {
      const { id, ...restProps } = props
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const { args: modalArgs } = useModal(id)
      const modals = useContext(ModalContext)
      const shouldMount = !!modals[id]

      if (!shouldMount) return null
      return (
        <NiceModalIdContext.Provider value={id}>
          <OriginalComp {...restProps} {...modalArgs} />
        </NiceModalIdContext.Provider>
      )
    }

    register(modalId, EnhancedComp)
  }

  showModal(modalId, args)

  if (!modalCallbacks[modalId]) {
    // `!` tell ts that theResolve will be written before it is used
    let theResolve!: (args?: unknown) => void
    // `!` tell ts that theResolve will be written before it is used
    let theReject!: (args?: Error) => void
    const promise = new Promise((resolve, reject) => {
      theResolve = resolve
      theReject = reject
    })
    modalCallbacks[modalId] = {
      resolve: theResolve,
      reject: theReject,
      promise,
    }
  }
  return modalCallbacks[modalId].promise
}

const remove = (modal: string | React.FC<any>): void => {
  const modalId = getModalId(modal)
  removeModal(modalId)
  modalCallbacks[modalId]?.reject(new Error('Modal removed'))
  delete modalCallbacks[modalId]
  unregister(modalId)
}

function useModal(): NiceModalHandler
function useModal(
  modal: string,
  args?: Record<string, unknown>
): NiceModalHandler
function useModal<P>(modal: React.FC<P>, args?: P): NiceModalHandler

function useModal(modal?: any, args?: any): any {
  const modals = useContext(ModalContext)
  const contextModalId = useContext(NiceModalIdContext)

  const mid = !modal ? contextModalId : getModalId(modal)
  const isUseComponent = modal && typeof modal !== 'string'

  // Only if contextModalId doesn't exist
  if (!mid) {
    throw new Error('No modal id found in NiceModal.useModal.')
  }

  useListen(mid, () => {
    if (isUseComponent && !MODAL_REGISTRY[mid]) {
      register(mid, modal, args)
    }
  })

  const modalInfo = modals[mid]

  const showCallback = useCallback(
    (_args?: Record<string, unknown>) => show(mid, _args),
    [mid]
  )
  const removeCallback = useCallback(() => remove(mid), [mid])

  const resolveCallback = useCallback(
    (_args?: unknown) => {
      modalCallbacks[mid]?.resolve(_args)
      delete modalCallbacks[mid]
      hideModal(mid)
    },
    [mid]
  )

  const rejectCallback = useCallback(
    (error?: Error) => {
      modalCallbacks[mid]?.reject(error || new Error('Modal rejected'))
      delete modalCallbacks[mid]
      hideModal(mid)
    },
    [mid]
  )

  return useMemo(
    () => ({
      id: mid,
      args: modalInfo?.args,
      visible: !!modalInfo?.visible,
      show: showCallback,
      remove: removeCallback,
      resolve: resolveCallback,
      reject: rejectCallback,
    }),
    [
      mid,
      modalInfo?.args,
      modalInfo?.visible,
      showCallback,
      removeCallback,
      resolveCallback,
      rejectCallback,
    ]
  )
}

// The placeholder component is used to auto render modals when call modal.show()
// When modal.show() is called, it means there've been modal info
function NiceModalPlaceholder() {
  const modals = useContext(ModalContext)

  console.log(modals)

  const toRender = Object.keys(modals)
    .filter((id) => !!modals[id])
    .filter((id) => {
      const res = MODAL_REGISTRY[id]
      if (!res) {
        console.warn(
          `No modal found for id: ${id}. Please check the id or if it is registered or declared via JSX.`
        )
      }
      return res
    })
    .map((id) => ({
      id,
      ...MODAL_REGISTRY[id],
    }))

  return (
    <>
      {toRender.map((t) => (
        <t.comp key={t.id} id={t.id} {...t.props} />
      ))}
    </>
  )
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState(currentState)

  // Subscribe to state changes
  useEffect(() => {
    const callback = (newState: NiceModalStore) => {
      setModals(newState)
    }
    stateUpdateCallbacks.push(callback)
    return () => {
      stateUpdateCallbacks = stateUpdateCallbacks.filter(
        (cb) => cb !== callback
      )
    }
  }, [])

  return (
    <ModalContext.Provider value={modals}>
      {children}
      <NiceModalPlaceholder />
    </ModalContext.Provider>
  )
}

/**
 * Declarative way to register a modal.
 * @param id - The id of the modal.
 * @param component - The modal Component.
 * @returns
 */
function ModalDefine({
  id,
  component,
}: {
  id: string
  component: React.FC<any>
}) {
  useEffect(() => {
    register(id, component)
    return () => {
      unregister(id)
    }
  }, [id, component])
  return null
}

const NiceModal = {
  show,
  remove,
  register,
  unregister,
}

export { NiceModal, ModalContext, ModalDefine, ModalProvider, useModal }
