import { toast } from 'react-hot-toast'
import { getApolloErrorMessage } from './get-apollo-error-message'

type MutateFn<TData> = () => Promise<{ data?: TData }>

export async function mutateWithToast<TData>(
  mutate: MutateFn<TData>,
  options?: {
    successMessage?: string
    errorMessage?: string
  }
): Promise<{ data: TData | null; errorMessage?: string }> {
  try {
    const res = await mutate()

    if (!res.data) {
      const msg = options?.errorMessage ?? 'Operation failed'
      toast.error(msg)
      return { data: null, errorMessage: msg }
    }

    if (options?.successMessage) {
      toast.success(options.successMessage)
    }

    return { data: res.data }
  } catch (e) {
    const message = getApolloErrorMessage(e)

    toast.error(message)
    return { data: null, errorMessage: message }
  }
}
