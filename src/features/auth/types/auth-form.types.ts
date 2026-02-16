export interface IAuthFormData {
	email: string
	password: string
}
export interface IAuthForm extends IAuthFormData {
	confirmPassword: string
	firstName: string
}
