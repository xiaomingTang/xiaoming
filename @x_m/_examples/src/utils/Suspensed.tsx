import React, { useEffect, useState } from 'react'

function Fallback() {
  const [fallback, setFallback] = useState('')

  useEffect(() => {
    const timeoutFlag = window.setTimeout(() => {
      setFallback('loading...')
    }, 500)

    return () => {
      window.clearTimeout(timeoutFlag)
    }
  }, [])

  return <>{fallback}</>
}

export default function Suspensed({
  loader,
}: {
  loader: Parameters<typeof React.lazy>[0]
}) {
  const Component = React.lazy(loader)

  return (
    <React.Suspense fallback={<Fallback />}>
      <Component />
    </React.Suspense>
  )
}
