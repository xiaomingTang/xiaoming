'use client'

import * as React from 'react'
import { useMuiEnhancedEffect } from './useMuiEnhancedEffect'

/**
 * Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * See RFC in https://github.com/reactjs/rfcs/pull/220
 */
export function useMuiEventCallback<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Fn extends (...args: any[]) => any = (...args: unknown[]) => unknown,
>(fn: Fn): Fn
export function useMuiEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return
export function useMuiEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = React.useRef(fn)
  useMuiEnhancedEffect(() => {
    ref.current = fn
  })
  return React.useRef((...args: Args) =>
    // @ts-expect-error hide `this`
    (0, ref.current!)(...args)
  ).current
}
