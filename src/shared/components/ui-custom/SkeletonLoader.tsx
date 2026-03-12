import { twMerge } from 'tailwind-merge'

interface ISkeletonLoader {
  count?: number
  style?: React.CSSProperties
  className?: string
}
export function SkeletonLoader({ count = 1, style, className }: ISkeletonLoader) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={style}
          className={twMerge(
            'bg-white-pale/35 mb-[0.65rem] h-10 animate-pulse rounded-2xl last:mb-0 border border-white/50',
            className
          )}
        />
      ))}
    </>
  )
}
