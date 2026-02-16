export function Field({ error, children }: { error?: string; children: React.ReactNode }) {
	return (
		<div className='w-full space-y-1'>
			{children}
			<div className='h-4 content-center'>
				{error && <div className='text-destructive pl-3 text-xs'>{error}</div>}
			</div>
		</div>
	)
}
