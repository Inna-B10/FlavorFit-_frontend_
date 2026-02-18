import { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <main className='flex h-full w-full grow flex-col gap-8'>{children}</main>
    </>
  )
}
