import { useState } from 'react'
import Image from 'next/image'
import { Edit } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'

interface IAvatarUpload {
  value?: string
  onChange: (url: string) => void
}

export function AvatarUpload({ value, onChange }: IAvatarUpload) {
  const [loading, setLoading] = useState(false)

  async function upload(file: File) {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/media-upload/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()

      onChange(data.url)
    } finally {
      setLoading(false)
    }
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
          variant='ghost'
          size='sm'
          type='button'
          className='shadow-none cursor-pointer'
          asChild
          disabled={loading}
        >
          <span>
            <Edit className={loading ? 'animate-spin' : ''} />
          </span>
        </Button>
      </label>
      <Field>
        <FieldLabel htmlFor='picture'>Picture</FieldLabel>
        <Input
          id='picture'
          type='file'
          accept='image/*'
          onChange={event => {
            const file = event.target.files?.[0]
            if (file) {
              upload(file)
            }
          }}
        />
        <FieldDescription>Select a picture to upload.</FieldDescription>
      </Field>
    </div>
  )
}
