import { useState } from 'react'
import { Loader } from 'lucide-react'
import { Field, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { UserAvatar } from '@/shared/components/user-menu/UserAvatar'

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
      <Field>
        <FieldLabel htmlFor='picture'>Avatar:</FieldLabel>
        <Input
          id='picture'
          type='file'
          accept='image/jpeg,,image/jpg,image/png,image/webp,image/gif,image/svg+xml'
          onChange={event => {
            const file = event.target.files?.[0]
            if (file) {
              upload(file)
            }
          }}
          className='h-10'
        />
      </Field>
      <div className='flex flex-col gap-2'>
        <span className='text-sm relative'>
          Preview{' '}
          <Loader
            size={16}
            className={loading ? 'absolute top-0 -right-6 animate-spin' : 'hidden'}
          />
        </span>
        <div className='flex items-center justify-center rounded-full bg-gradient-white-pale text-green-dark shadow-sm'>
          <UserAvatar avatarUrl={value} />
        </div>
      </div>
    </div>
  )
}
