import { ApolloLink } from '@apollo/client'
import { toast } from 'react-hot-toast'
import { getApolloErrorMessage } from './apollo/get-apollo-error-message'

type MutationResult<TData> = ApolloLink.Result<TData>
type MutateFn<TData> = () => Promise<MutationResult<TData>>

export async function mutateWithToast<TData>(
  mutate: MutateFn<TData>,
  options?: {
    loadingId?: string
    successId?: string
    errorId?: string

    loadingMessage?: string
    successMessage?: string
    errorMessage?: string

    duration?: number

    afterSuccess?: (data: NonNullable<TData>) => Promise<void> | void
    afterError?: (message: string) => Promise<void> | void
  }
): Promise<{ data: TData | null; errorMessage?: string }> {
  const loadingId = options?.loadingId

  if (options?.loadingMessage) {
    toast.loading(options.loadingMessage, { id: loadingId })
  }

  try {
    const res = await mutate()
    const data = (res.data ?? null) as TData | null

    if (!data) {
      const msg = options?.errorMessage ?? 'Operation failed'
      toast.error(msg, { id: options?.errorId })
      if (loadingId) toast.dismiss(loadingId)
      await options?.afterError?.(msg)
      return { data: null, errorMessage: msg }
    }

    if (loadingId) toast.dismiss(loadingId)

    if (options?.successMessage) {
      toast.success(options.successMessage, { id: options?.successId, duration: options?.duration })
    }

    await options?.afterSuccess?.(data as NonNullable<TData>)

    return { data }
  } catch (e) {
    if (loadingId) toast.dismiss(loadingId)

    const message = getApolloErrorMessage(e)

    toast.error(options?.errorMessage ?? message, {
      id: options?.errorId,
      duration: options?.duration
    })

    await options?.afterError?.(message)
    return { data: null, errorMessage: message }
  }
}
