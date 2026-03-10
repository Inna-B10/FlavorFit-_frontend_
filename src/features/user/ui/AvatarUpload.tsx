import { useRef, useState } from 'react'
import { useApolloClient } from '@apollo/client/react'
import { ImagePlus, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/shared/components/ui/button'
import { Field } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import { UserAvatar } from '@/shared/components/user-menu/UserAvatar'
import { getApolloErrorMessage } from '@/shared/lib/apollo/get-apollo-error-message'

interface AvatarUploadResponse {
  message: string
  avatarUrl: string
  avatarBlobPath: string
}

export function AvatarUpload({ avatarUrl }: { avatarUrl?: string }) {
  const ref = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const apolloClient = useApolloClient()

  async function deleteRequest() {
    const response = await fetch('/api/media/avatar/delete', {
      method: 'DELETE',
      credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Avatar delete failed')
    }

    return data
  }

  async function upload(file: File): Promise<AvatarUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/media/avatar/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })

    const data: AvatarUploadResponse | { message?: string } = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed')
    }

    return data as AvatarUploadResponse
  }

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true)

      const result = await upload(file)

      toast.success('Avatar uploaded')

      apolloClient.cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          me(existingMe) {
            if (!existingMe) return existingMe

            return {
              ...existingMe,
              avatarUrl: result.avatarUrl,
              avatarBlobPath: result.avatarBlobPath
            }
          }
        }
      })
    } catch (error) {
      toast.error(getApolloErrorMessage(error || 'Avatar upload failed'))
    } finally {
      setIsUploading(false)

      if (ref.current) {
        ref.current.value = ''
      }
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteRequest()

      toast.success('Avatar reset to default')

      apolloClient.cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          me(existingMe) {
            if (!existingMe) return existingMe

            return {
              ...existingMe,
              avatarUrl: null,
              avatarBlobPath: null
            }
          }
        }
      })

      if (ref.current) {
        ref.current.value = ''
      }
    } catch (error) {
      toast.error(getApolloErrorMessage(error || 'Avatar delete failed'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='f-full grid grid-cols-[auto_1fr] items-end gap-3'>
      <Field>
        <InputGroup>
          <InputGroupInput
            id='avatar'
            type='file'
            accept='image/jpeg,image/png,image/webp'
            ref={ref}
            disabled={isUploading || isDeleting}
            onChange={event => {
              const file = event.target.files?.[0]

              if (file) {
                void handleUpload(file)
              }
            }}
            className='mt-3 cursor-pointer place-content-center md:mt-2 2xl:mt-0'
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
        className='text-green-dark flex aspect-square h-full w-full max-w-12 items-center justify-center rounded-full shadow-sm'
        onClick={() => ref.current?.click()}
      >
        <UserAvatar
          avatarUrl={avatarUrl}
          className='cursor-pointer'
        />
      </div>

      <div className='ml-2 flex flex-col'>
        <span className='text-xs text-muted-foreground'>Size: max 2MB</span>
        <span className='text-xs text-muted-foreground'>Format: .jpg, .png, .webp</span>
      </div>

      <span className='flex gap-2 items-center'>
        <Button
          type='button'
          onClick={handleDelete}
          disabled={!avatarUrl || isUploading || isDeleting}
          variant='destructive'
          size='xs'
          className='bg-destructive/60 mx-auto rounded-2xl'
        >
          Delete
        </Button>
        <Loader
          size={16}
          className={isUploading || isDeleting ? 'animate-spin' : ''}
          color='black'
        />
      </span>
    </div>
  )
}
