import { useEffect, useState } from 'react'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'

interface Props {
  ref: React.RefObject<TurnstileInstance | null>
  setCaptchaToken: (token: string | null) => void
}

export function TurnstileCaptcha({ ref, setCaptchaToken }: Props) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = async () => {
      if (typeof window !== 'undefined' && window.matchMedia('(max-width: 390px)').matches)
        setIsMobile(true)
    }
    checkMobile()
  }, [])
  return (
    <div className='mx-auto w-full pt-2'>
      {isMobile ? (
        <Turnstile
          ref={ref}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={captchaToken => setCaptchaToken(captchaToken)}
          onExpire={() => setCaptchaToken(null)}
          className='mx-auto'
          options={{
            size: 'compact',
            theme: 'light',
            language: 'en'
          }}
        />
      ) : (
        <Turnstile
          ref={ref}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={captchaToken => setCaptchaToken(captchaToken)}
          onExpire={() => setCaptchaToken(null)}
          className='mx-auto'
          options={{
            size: 'flexible',
            theme: 'light',
            language: 'en'
          }}
        />
      )}
    </div>
  )
}
