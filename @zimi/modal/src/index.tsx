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

export interface ModalState {
  id: string
  args?: Record<string, unknown>
  visible?: boolean
}

export interface ModalStore {
  [key: string]: ModalState
}

interface ModalCallbacks {
  [modalId: string]: {
    resolve: (args: unknown) => void
    reject: (args: Error) => void
    promise: Promise<unknown>
  }
}

/**
 * The handler to manage a modal returned by {@link useModal | useModal} hook.
 */
export interface ModalHandler<Props = Record<string, unknown>>
  extends ModalState {
  /**
   * Whether a modal is visible, it's controlled by {@link ModalHandler.show | show} method.
   */
  visible: boolean
  /**
   * Show the modal, it will change {@link ModalHandler.visible | visible} state to true.
   * @param args - an object passed to modal component as props.
   */
  show: (args?: Props) => Promise<unknown>
  /**
   * Resolve the promise returned by {@link ModalHandler.show | show} method and hide the modal.
   */
  resolve: (args?: unknown) => void
  /**
   * Reject the promise returned by {@link ModalHandler.show | show} method and hide the modal.
   */
  reject: (error?: Error) => void
  /**
   * Remove the modal component from React component tree. It improves performance compared to just making a modal invisible.
   */
  remove: () => void
  /**
   * provides the modal id context.
   */
  Provider: typeof ModalProvider
}

const symModalId = Symbol('ModalId')
const initialState: ModalStore = {}
const ModalContext = React.createContext(initialState)
const ModalIdContext = React.createContext<string | null>(null)

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
let stateUpdateCallbacks: Array<(state: ModalStore) => void> = []
let currentState: ModalStore = initialState

const updateState = (updater: (state: ModalStore) => ModalStore) => {
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
  props?: ModalArgs<T>
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

const modalCallbacks: ModalCallbacks = {}
const getModalId = (modal: string | React.FC<any>): string => {
  if (typeof modal === 'string') return modal as string
  const extendedModal = modal as React.FC<any> & Record<string | symbol, string>
  if (!extendedModal[symModalId]) {
    extendedModal[symModalId] = getUid()
  }
  return extendedModal[symModalId]
}

const remove = (modal: string | React.FC<any>): void => {
  const modalId = getModalId(modal)
  removeModal(modalId)
  modalCallbacks[modalId]?.reject(new Error('Modal removed'))
  delete modalCallbacks[modalId]
  unregister(modalId)
}

// Clean up invisible modals to improve performance
const cleanupInvisibleModals = () => {
  const invisibleModalIds = Object.keys(currentState).filter(
    (id) => !currentState[id]?.visible
  )

  invisibleModalIds.forEach((modalId) => {
    remove(modalId)
  })
}

type ModalArgs<T> = T extends
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>
  ? React.ComponentProps<T>
  : Record<string, unknown>

type EmptyLike =
  | void
  | undefined
  | null
  | Record<string | number | symbol, never>

function show<T>(modal: string, args?: Record<string, unknown>): Promise<T>
function show<T, P>(modal: string, args: P): Promise<T>
function show<T, P extends EmptyLike>(modal: React.FC<P>): Promise<T>
function show<T, P>(modal: React.FC<P>, args: P): Promise<T>

function show(
  modal: React.FC<any> | string,
  args?: ModalArgs<React.FC<any>> | Record<string, unknown>
) {
  // Clean up invisible modals before showing new one
  cleanupInvisibleModals()

  const modalId = getModalId(modal)

  // If modal is a component and not registered, register it
  if (typeof modal !== 'string' && !MODAL_REGISTRY[modalId]) {
    register(modalId, modal, args)
  }

  showModal(modalId, args)

  if (!modalCallbacks[modalId]) {
    let theResolve!: (args?: unknown) => void
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

function useModal(): ModalHandler
function useModal(modal: string, args?: Record<string, unknown>): ModalHandler
function useModal<P>(modal: React.FC<P>, args?: P): ModalHandler<P>
function useModal(modal?: any, args?: any): any {
  const modals = useContext(ModalContext)
  const contextModalId = useContext(ModalIdContext)

  const mid = !modal ? contextModalId : getModalId(modal)
  const isUseComponent = modal && typeof modal !== 'string'

  if (!mid) {
    throw new Error('No modal id found in useModal.')
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

  const Provider = useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <ModalIdContext.Provider value={mid}>{children}</ModalIdContext.Provider>
    ),
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
      Provider,
    }),
    [
      mid,
      modalInfo?.args,
      modalInfo?.visible,
      showCallback,
      removeCallback,
      resolveCallback,
      rejectCallback,
      Provider,
    ]
  )
}

// The placeholder component is used to auto render modals when call modal.show()
// When modal.show() is called, it means there've been modal info
function ModalPlaceholder() {
  const modals = useContext(ModalContext)

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
        <ModalIdContext.Provider key={t.id} value={t.id}>
          <t.comp {...t.props} />
        </ModalIdContext.Provider>
      ))}
    </>
  )
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState(currentState)

  // Subscribe to state changes
  useEffect(() => {
    const callback = (newState: ModalStore) => {
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
      <ModalPlaceholder />
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
