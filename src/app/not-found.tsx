'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogoName } from '@/shared/components/ui-custom/logo/LogoName'
import { COLLAGE } from '@/shared/constants/404-collage.constants'
import { TQuad } from '@/shared/types/404-page.types'
import { applyAutoDeltasCqiSmart } from '@/shared/utils/404/404-page.utils'

export default function NotFoundPage() {
  const [quad, setQuad] = useState<TQuad>('idle')
  const enriched = applyAutoDeltasCqiSmart(COLLAGE)
  return (
    <div className='flex h-full w-full grow flex-col items-center justify-center'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='absolute top-0 left-0 translate-full transition-all duration-300 ease-in-out hover:scale-102 sm:top-5 sm:left-8 sm:translate-0'
      >
        <LogoName className='text-green-dark h-auto w-30 sm:w-42 md:w-62' />
      </Link>
      <div className='w-full space-y-8 text-[#474747] select-none text-shadow-md'>
        <div className='flex h-full w-full items-center justify-center gap-5 text-[clamp(5rem,20vw,10rem)]'>
          <span className='font-sonsie'>4</span>
          <div
            className='collageWrap w-25 min-w-20 sm:w-37.5 md:w-50'
            onMouseLeave={() => setQuad('idle')}
          >
            {/* hover zones */}
            <div
              className='hotspots'
              aria-hidden='true'
            >
              <div onMouseEnter={() => setQuad('tl')} />
              <div onMouseEnter={() => setQuad('tr')} />
              <div onMouseEnter={() => setQuad('bl')} />
              <div onMouseEnter={() => setQuad('br')} />
            </div>
            <div
              className='collageStage w-full'
              aria-hidden='true'
            >
              {enriched.map((it, idx) => {
                const d = it.delta[quad]
                return (
                  <div
                    key={idx}
                    className='piece'
                    style={{
                      width: it.size,
                      height: it.h || it.size,
                      left: it.x,
                      top: it.y,
                      transform: `
          translate(calc(-50% + ${d.dx}), calc(-50% + ${d.dy}))
          rotate(calc(${it.r}deg + ${d.dr}))
          scale(${d.s})
        `
                    }}
                  >
                    <Image
                      src={it.src}
                      alt=''
                      fill
                      draggable={false}
                      sizes='400px'
                      style={{ objectFit: 'cover' }}
                      priority={idx < 3}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <span className='font-sonsie -ml-3'>4</span>
        </div>
        <h2 className='font-poppins text-center text-[clamp(0.8rem,8vw,1.5rem)] italic'>
          You&apos;ve trespassed into the no-produce zone.
        </h2>
      </div>
    </div>
  )
}
