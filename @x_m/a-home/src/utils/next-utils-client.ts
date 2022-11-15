'use client'

import 'client-only'

import { NextErrorProps } from './next-utils-type'

export function NextError(error: (props: NextErrorProps) => React.ReactNode) {
  return error as (props: any) => ReturnType<typeof error>
}
