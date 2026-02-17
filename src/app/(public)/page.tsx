'use client'

import Image from 'next/image'

export default function Home() {
  return (
    <section className='flex grow flex-col gap-8'>
      <h1>Home Page</h1>
      <div className='grow'></div>
      <Image
        src='/bg-images/healthy-eating-concept.png'
        alt='auth-background'
        width={501}
        height={453}
        className='hidden h-auto w-50 self-end md:block lg:w-80'
      />
    </section>
  )
}
