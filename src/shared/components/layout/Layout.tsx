import type { PropsWithChildren, ReactNode } from 'react'

type LayoutProps = PropsWithChildren<{
  header: ReactNode
}>

export function Layout({ children, header }: LayoutProps) {
  return (
    <>
      {header}
      <main className='flex h-full w-full grow flex-col gap-8'>{children}</main>
    </>
  )
}
