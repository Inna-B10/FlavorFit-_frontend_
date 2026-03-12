import { useRef, useState } from 'react'
import { useApolloClient } from '@apollo/client/react'
import { ImagePlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/shared/components/ui/button'
import { Field } from '@/shared/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group'
import { UserAvatar } from '@/shared/components/user-menu/UserAvatar'
import { getApolloErrorMessage } from '@/shared/lib/apollo/get-apollo-error-message'
import { avatarService } from '../services/client.services/avatar.service'

export function AvatarUpload({ avatarUrl }: { avatarUrl?: string }) {
  const ref = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const apolloClient = useApolloClient()
  const handleUpload = async (file: File) => {
    const toastId = toast.loading('Uploading...')

    try {
      setIsUploading(true)

      const result = await avatarService.uploadAvatar(file)

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
      toast.success('Avatar uploaded', { id: toastId })
    } catch (error) {
      toast.error(getApolloErrorMessage(error || 'Avatar upload failed'), { id: toastId })
    } finally {
      setIsUploading(false)
      if (ref.current) {
        ref.current.value = ''
      }
    }
  }

  const handleDelete = async () => {
    const toastId = toast.loading('Deleting...')

    try {
      setIsDeleting(true)
      await avatarService.deleteAvatar()

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
      toast.success('Avatar reset to default', { id: toastId })
    } catch (error) {
      toast.error(getApolloErrorMessage(error || 'Avatar delete failed'), { id: toastId })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='w-full flex flex-col gap-10 p-4 lg:p-6 border border-input rounded-xl pb-6'>
      <h2 className='text-lg font-semibold pl-2 -mb-4'>Avatar</h2>
      <div className='w-full flex flex-col-reverse gap-2 lg:gap-4 lg:flex-row lg:items-center'>
        <Field className='lg:w-1/2'>
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
              className='cursor-pointer place-content-center'
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
        <div className='flex flex-col ml-2 lg:ml-0 lg:w-1/2'>
          <span className='text-xs whitespace-nowrap text-nowrap'>Size: max 2MB</span>
          <span className='text-xs whitespace-nowrap text-nowrap'>Format: .jpg, .png, .webp</span>
        </div>
      </div>
      <div className='w-full flex flex-col lg:flex-row gap-4'>
        <span className='flex flex-col items-center justify-center lg:w-1/2'>
          <div
            className='text-green-dark flex aspect-square h-auto w-full max-w-12 items-center justify-center rounded-full shadow-sm'
            onClick={() => ref.current?.click()}
          >
            <UserAvatar
              avatarUrl={avatarUrl}
              className='cursor-pointer'
            />
          </div>
        </span>
        <span className='flex flex-col gap-3 text-xs lg:w-1/2 justify-center items-center lg:items-start'>
          <span>To reset avatar to default, click delete</span>
          <Button
            type='button'
            onClick={handleDelete}
            disabled={!avatarUrl || isUploading || isDeleting}
            variant='destructive'
            size='xs'
            className='bg-destructive/60 rounded-2xl'
          >
            Delete
          </Button>
        </span>
      </div>
    </div>
  )
}
