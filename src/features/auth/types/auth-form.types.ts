export interface IAuthFormData {
  email: string
  password: string
}
export interface IRegisterForm extends IAuthFormData {
  confirmPassword: string
  firstName: string
}
