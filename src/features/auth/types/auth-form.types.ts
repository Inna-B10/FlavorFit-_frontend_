export type Mode = 'login' | 'register'
export interface IAuthFormInput {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
}

export type TAuthFormData = {
  mode: Mode
  loading: boolean
  onSubmit: (values: IAuthFormInput) => Promise<void>
  serverMessage?: string
}
