import { AuthModel } from '../dtos/AuthModel'
import { IService, SConstructor } from '../types/apiService.types'

export const AuthRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
	return class extends Base {
		auth = {
			login: (email: string, password: string) => {
				return this.http.post<AuthModel>('/auth/login', { email, password })
			},
			verifyToken: () => {
				return this.http.post('/auth/verify_token')
			},
			resetPassword: (email: string) => {
				return this.http.post<{ result: boolean }>('/auth/forgot_password', {
					email,
				})
			},
			register: (email: string, firstname: string, lastname: string, iso: string, area: string, password: string, rol:string, country:string, changepassword: string, cellphone:string) => {
				return this.http.post('/auth/register', {
					email,
					firstname: firstname,
					lastname: lastname,
					iso: iso,
					area: area,
					password,
					rol,
					country,
					cellphone,
					changepassword,
				})
			},
		}
	}
}
