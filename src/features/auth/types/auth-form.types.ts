export type Mode = 'login' | 'register'
export interface IAuthFormInput {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
}
