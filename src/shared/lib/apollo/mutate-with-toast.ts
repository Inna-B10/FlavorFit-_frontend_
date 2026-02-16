import { toast } from 'react-hot-toast'
import { extractGqlMessage } from '@/shared/utils/extract-gql-message'

type MutateFn<TData> = () => Promise<{ data?: TData }>

export async function mutateWithToast<TData>(
	mutate: MutateFn<TData>,
	options?: {
		successMessage?: string
		errorMessage?: string
	}
): Promise<TData | null> {
	try {
		const res = await mutate()

		if (!res.data) {
			throw new Error(options?.errorMessage ?? 'Operation failed')
		}

		if (options?.successMessage) {
			toast.success(options.successMessage)
		}

		return res.data
	} catch (e) {
		const message = extractGqlMessage(e)
		// typeof e === 'object' && e && 'message' in e
		// 	? String((e as unknown as Error).message)
		// 	: (options?.errorMessage ?? 'Request failed')

		const prettyMsg = message.includes('Failed to fetch')
			? 'Server is unavailable.\nPlease try again later.'
			: message

		toast.error(prettyMsg)
		throw e
	}
}
