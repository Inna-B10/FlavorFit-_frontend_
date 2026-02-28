export function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className='fixed inset-0 z-50 grid place-items-center bg-white/30 backdrop-blur-md'>
      <div className='bg-white-pale flex min-h-60 w-[90%] max-w-sm flex-col items-center justify-center gap-4 rounded-2xl p-6 shadow-lg ring-1 ring-white/15'>
        <div className='border-muted-foreground/50 border-t-foreground mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2' />
        {children}
      </div>
    </div>
  )
}
