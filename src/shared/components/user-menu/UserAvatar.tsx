import { cn } from '@/shared/utils/utils'
import { DefaultAvatar } from '../ui-custom/DefaultAvatar'
import { Avatar, AvatarImage } from '../ui/avatar'

type Props = {
  firstName?: string | null
  avatarUrl?: string | null
  className?: string
}

export function UserAvatar({ firstName, avatarUrl, className }: Props) {
  return (
    <Avatar
      className={cn(
        'w-full h-full max-w-12 flex items-center justify-center bg-gradient-white-pale text-green-dark rounded-full shadow-sm transition-all duration-300 ease-in-out',
        className
      )}
    >
      {avatarUrl ? (
        <AvatarImage
          src={avatarUrl}
          alt={firstName ?? 'User avatar'}
          width={40}
          height={40}
          className='object-cover rounded-full'
        />
      ) : (
        <DefaultAvatar className='size-7' />
      )}
    </Avatar>
  )
}
