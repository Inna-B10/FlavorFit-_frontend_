import { DefaultAvatar } from '../ui-custom/DefaultAvatar'
import { Avatar, AvatarImage } from '../ui/avatar'

type UserMenuHeaderProps = {
  firstName?: string | null
  avatarUrl?: string | null
  compact?: boolean
}

export function UserMenuHeader({ firstName, avatarUrl, compact = false }: UserMenuHeaderProps) {
  return (
    <div className='flex items-center gap-3'>
      <Avatar className='w-full h-auto max-w-12'>
        {avatarUrl ? (
          <AvatarImage
            src={avatarUrl}
            alt={firstName ?? 'User avatar'}
            width={40}
            height={40}
          />
        ) : (
          <DefaultAvatar className='size-7' />
        )}
      </Avatar>

      {!compact && firstName && <div className='font-semibold'>Hello {firstName}!</div>}
    </div>
  )
}
