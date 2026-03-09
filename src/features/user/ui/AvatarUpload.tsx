import { useRef } from 'react'
import { useMutation } from '@apollo/client/react'
import { ImagePlus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Field } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import { UserAvatar } from '@/shared/components/user-menu/UserAvatar'
import { mutateWithToast } from '@/shared/lib/apollo/mutate-with-toast'
import { ResetAvatarDocument } from '@/__generated__/graphql'

interface IAvatarUpload {
  value?: string
  onChange: (url: string) => void
}

export function AvatarUpload({ value, onChange }: IAvatarUpload) {
  const ref = useRef<HTMLInputElement>(null)

  const [resetAvatar] = useMutation(ResetAvatarDocument, {
    update(cache) {
      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          me(existingMe) {
            if (!existingMe) return existingMe

            return {
              ...existingMe,
              avatarUrl: null
            }
          }
        }
      })
    }
  })

  async function upload(file: File) {
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
  }

  const handleReset = async () => {
    await mutateWithToast(() => resetAvatar(), {
      successMessage: 'Avatar reset'
    })
    onChange('')
  }

  return (
    <>
      <div className='f-full grid grid-cols-[auto_1fr] gap-3 items-end'>
        <Field>
          <InputGroup>
            <InputGroupInput
              id='avatar'
              type='file'
              accept='image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml'
              ref={ref}
              onChange={event => {
                const file = event.target.files?.[0]
                if (file) {
                  upload(file)
                }
              }}
              className='place-content-center cursor-pointer mt-3 md:mt-2 2xl:mt-0'
            />
            <InputGroupAddon
              align='inline-start'
              className='cursor-pointer'
              onClick={() => ref.current?.click()}
            >
              <ImagePlus size={16} />
              File:
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <div
          className='w-full h-full max-w-12 flex items-center justify-center rounded-full text-green-dark shadow-sm aspect-square'
          onClick={() => ref.current?.click()}
        >
          <UserAvatar
            avatarUrl={value}
            className='hover:scale-none'
          />
        </div>
        <div className='flex flex-col ml-2'>
          <span className='text-xs text-muted-foreground'>Size: max 2MB</span>
          <span className='text-xs text-muted-foreground'>Format: .jpg, .png, .webp, .svg</span>
        </div>
        <Button
          type='button'
          onClick={handleReset}
          variant='destructive'
          size='xs'
          className='bg-destructive/60 rounded-2xl mx-auto'
        >
          Reset
        </Button>
      </div>
    </>
  )
}
