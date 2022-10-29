'use client'

import { NextError } from '@/utils/next-utils'

export default NextError((props) => (
  <div>
    <p>Something went wrong: {props.error.message}</p>
  </div>
))
