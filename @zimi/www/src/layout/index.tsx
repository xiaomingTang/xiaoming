export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className='bg-w-900 text-b-900 min-h-screen leading-normal text-base'>
      {children}
    </div>
  )
}
