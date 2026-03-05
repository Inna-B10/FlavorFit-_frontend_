'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { SERVER_URL } from '@/shared/config/api-config/api.server'

interface IAvatarUpload {
  value?: string
  onChange: (url: string) => void
}

export function AvatarUpload({ value, onChange }: IAvatarUpload) {
  const [loading, setLoading] = useState(false)

  async function upload(file: File) {
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${SERVER_URL}/media-upload/avatar`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    const data = await response.json()

    onChange(data.url)

    setLoading(false)
  }

  return (
    <div className='flex items-center gap-3'>
      <Image
        src={value || '/images/avatar-placeholder.png'}
        alt='avatar'
        width={48}
        height={48}
        className='rounded-full object-cover'
      />
      <label>
        <input
          type='file'
          hidden
          accept='image/*'
          onChange={event => {
            const file = event.target.files?.[0]
            if (file) {
              upload(file)
            }
          }}
        />

        <Button
          variant='secondary'
          size='sm'
          asChild
          disabled={loading}
        >
          <span>{/* <Edit className={loading? 'animate-spin':''} /> */}</span>
        </Button>
      </label>
    </div>
  )
}
