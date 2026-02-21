import { Suspense } from 'react'
import CheckEmail from './CheckEmailClient'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckEmail />
    </Suspense>
  )
}
