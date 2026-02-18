import type { Metadata } from 'next'
import {
  Aclonica,
  Geist,
  Geist_Mono,
  Inter,
  Inter_Tight,
  Oleo_Script,
  Poppins,
  Sansita,
  Sonsie_One
} from 'next/font/google'
import { SITE_NAME } from '@/shared/constants/seo.constants'
import './globals.css'
import { Provider } from './providers/Provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
const aclonica = Aclonica({
  variable: '--font-aclonica',
  subsets: ['latin'],
  weight: '400'
})
const sonsie = Sonsie_One({
  variable: '--font-sonsie',
  subsets: ['latin'],
  weight: '400'
})
const oleo = Oleo_Script({
  variable: '--font-oleo',
  subsets: ['latin'],
  weight: '400'
})
const sansita = Sansita({
  variable: '--font-sansita',
  subsets: ['latin'],
  weight: ['400', '700', '800', '900']
})

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description:
    'FlavorFit is a comprehensive wellness platform focused on personalized nutrition, fitness tracking, and smart meal planning.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aclonica.variable} ${sonsie.variable} ${oleo.variable} ${sansita.variable} ${inter.variable} ${interTight.variable} ${poppins.variable} flex h-full min-h-screen w-full flex-col gap-8 px-3 py-6 antialiased sm:p-6`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
