import { useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { ResetPasswordDocument, ValidateResetTokenDocument } from '@/__generated__/graphql'

export type TokenStatus = 'missing' | 'checking' | 'valid' | 'invalid'

export function useResetPassword(token: string) {
  //* ----------------------------- Validate Token ----------------------------- */
  const {
    data,
    loading: queryLoading,
    error: queryError
  } = useQuery(ValidateResetTokenDocument, {
    variables: { token },
    skip: !token,
    fetchPolicy: 'no-cache'
  })

  const tokenStatus: TokenStatus = useMemo(() => {
    if (!token) return 'missing'
    if (queryLoading) return 'checking'
    if (queryError) return 'invalid'
    if (data?.validateResetToken === true) return 'valid'
    return 'invalid'
  }, [token, queryLoading, queryError, data?.validateResetToken])

  //* ----------------------------- Reset Password ----------------------------- */
  const [resetPasswordMutation, { loading: mutateLoading }] = useMutation(ResetPasswordDocument)

  const resetPassword = async (newPassword: string) => {
    return resetPasswordMutation({
      variables: {
        data: { newPassword, token }
      }
    })
  }

  return {
    tokenStatus,
    queryLoading,
    resetPassword,
    mutateLoading
  }
}
