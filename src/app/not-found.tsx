import Image from 'next/image'
import Link from 'next/link'
import { LogoName } from '@/shared/components/ui/logo/LogoName'

const items = [
  {
    src: 'https://framerusercontent.com/images/qtGS5uP4Va9idfRIxQwBOUbLGA.png',
    size: '42cqi',
    x: '54%',
    y: '87%',
    r: -12
  },
  {
    src: 'https://framerusercontent.com/images/1R6YZ938uZGKXQpz0bciTgyXgI.png',
    size: '41.75cqi',
    x: '84%',
    y: '38%',
    r: 21
  },
  {
    src: 'https://framerusercontent.com/images/RNzj86gzDi3ZOVZ70aUoovAmbk.png',
    size: '42cqi',
    x: '87%',
    y: '62%',
    r: 4
  },
  {
    src: 'https://framerusercontent.com/images/GrIYiW4SehS4XwB1xcWdJpSOxAE.png',
    size: '42cqi',
    x: '48%',
    y: '14%',
    r: 77
  },
  {
    src: 'https://framerusercontent.com/images/W0Tzh61fEnmSZXynnvUx3Xfsac.png',
    size: '42cqi',
    x: '14%',
    y: '50%',
    r: 51
  },
  {
    src: 'https://framerusercontent.com/images/v7iYHapfpYmnJ3J6rWAd0dBGFRU.png',
    size: '41.75cqi',
    x: '45%',
    y: '43%',
    r: -74
  },
  {
    src: 'https://framerusercontent.com/images/BlNNrFDUbYbzmYhG0u8Q3Psl8dk.png',
    size: '41.75cqi',
    x: '26%',
    y: '76%',
    r: 7
  },
  {
    src: 'https://framerusercontent.com/images/867TA6vQELH2QcNhxGtoG8lKM.png',
    size: '41.75cqi',
    x: '36%',
    y: '58%',
    r: 25
  },
  {
    src: 'https://framerusercontent.com/images/WNNZPw8qh6HUmyin2Yz6xhpdM.png',
    size: '41.75cqi',
    x: '53%',
    y: '61%',
    r: 77
  },
  {
    src: 'https://framerusercontent.com/images/ed9bvTdU4iXjxRT9xBJYjzSI2U.png',
    size: '41.75cqi',
    x: '69%',
    y: '65%',
    r: 5
  },
  {
    src: 'https://framerusercontent.com/images/PqdyN8jVg8rK67hGZJa3eAqJLcg.png',
    size: '17.75cqi',
    x: '34%',
    y: '33%',
    r: 29
  },
  {
    src: 'https://framerusercontent.com/images/EtXf3itkKVhGLA4EFspw01NI.png',
    size: '13.75cqi',
    h: '10.75cqi',
    x: '25%',
    y: '15%',
    r: 0
  },
  {
    src: 'https://framerusercontent.com/images/3XuS4vxkSYZca1rwug9Du57u81o.png',
    size: '14cqi',
    h: '11cqi',
    x: '74%',
    y: '83%',
    r: -43
  },
  {
    src: 'https://framerusercontent.com/images/M1dpg6cReQb3DJmntXyDMsrSRtc.png',
    size: '13cqi',
    x: '14%',
    y: '30%',
    r: 0
  },
  {
    src: 'https://framerusercontent.com/images/9iARCUZFZwb7FXwvX0DKg31qTg.png',
    size: '23cqi',
    h: '19cqi',
    x: '67%',
    y: '24%',
    r: -69
  }
]
export default function NotFoundPage() {
  return (
    <div className='flex h-full w-full grow flex-col items-center justify-center'>
      <Link
        href='/'
        title='Homepage'
        aria-label='Go to homepage'
        className='absolute top-5 left-8 hidden transition-all duration-300 ease-in-out hover:scale-102 sm:mt-4 sm:block sm:self-start'
      >
        <LogoName className='text-green-dark h-auto w-30 sm:w-42 md:w-62' />
      </Link>
      <div className='space-y-2 text-[#474747] text-shadow-md'>
        <div className='flex h-full w-full items-center justify-center gap-3'>
          <span className='font-sonsie text-[10rem]'>4</span>
          <div className='collageWrap'>
            <div
              className='collageStage w-full'
              aria-hidden='true'
            >
              {items.map((it, idx) => (
                <div
                  key={idx}
                  className='piece'
                  style={{
                    width: it.size,
                    height: it.h || it.size,
                    left: it.x,
                    top: it.y,
                    transform: `translate(-50%, -50%) rotate(${it.r}deg)`
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
              ))}
            </div>
          </div>
          <span className='font-sonsie -ml-2 text-[10rem]'>4</span>
        </div>
        <h2 className='font-poppins text-2xl italic'>
          You&apos;ve trespassed into the no-produce zone.
        </h2>
      </div>
    </div>
  )
}
