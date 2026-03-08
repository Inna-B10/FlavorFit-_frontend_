import { DefaultAvatar } from '../ui-custom/DefaultAvatar'
import { Avatar, AvatarImage } from '../ui/avatar'

type Props = {
  firstName?: string | null
  avatarUrl?: string | null
}

export function UserAvatar({ firstName, avatarUrl }: Props) {
  return (
    <Avatar className='w-full h-full max-w-12 flex items-center justify-center bg-gradient-white-pale text-green-dark hover:text-foreground rounded-full shadow-sm transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-105 aspect-square'>
      {avatarUrl ? (
        <AvatarImage
          src={avatarUrl}
          alt={firstName ?? 'User avatar'}
          width={40}
          height={40}
          className='object-contain rounded-full'
        />
      ) : (
        <DefaultAvatar className='size-7' />
      )}
    </Avatar>
  )
}
