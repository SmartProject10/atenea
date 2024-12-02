
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_zeus/helpers'
import { PasswordMeterComponent } from '../../../../_zeus/assets/ts/components'
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx'
import { backyService } from '@zeus/@services/api'

const initialValues = {
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	changepassword: '',
	acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
	firstname: Yup.string()
		.min(3, 'Mínimo 3 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.required('El nombre es obligatorio'),
	email: Yup.string()
		.email('Formato de correo incorrecto')
		.min(3, 'Mínimo 3 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.required('El correo es obligatorio'),
	lastname: Yup.string()
		.min(3, 'Mínimo 3 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.required('El apellido es obligatorio'),
	password: Yup.string()
		.min(3, 'Mínimo 3 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.required('La contraseña es obligatoria'),
	changepassword: Yup.string()
		.min(3, 'Mínimo 3 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.required('La confirmación de la contraseña es obligatoria')
		.oneOf([Yup.ref('password')], 'La contraseña y la confirmación no coinciden'),
	acceptTerms: Yup.bool().required('Debes aceptar los términos y condiciones'),
})

export function Registration() {
	const [loading, setLoading] = useState(false)
	const { saveAuth, setCurrentUser } = useAuth()
	const formik = useFormik({
		initialValues,
		validationSchema: registrationSchema,
		onSubmit: async (values, { setStatus, setSubmitting }) => {
			setLoading(true)

			try {
				const { data: auth } = await backyService.auth.register(
					values.email,
					values.firstname,
					values.lastname,
					values.password,
				)
				saveAuth(auth)
				const { data: user } = await backyService.auth.verifyToken()
				setCurrentUser(user)
				console.log(auth.data.message)
				console.log(values)
			} catch (error) {
				const errorMessage = (error as any).response?.data?.message || 'An error occurred';
				console.error(errorMessage)
				saveAuth(undefined)
				setStatus('The registration details is incorrect. Error Details: ' + (error as any).response.data.message)
				setSubmitting(false)
				setLoading(false)
			}
		},
	})

	useEffect(() => {
		PasswordMeterComponent.bootstrap()
	}, [])

	return (
		<form
			className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
			noValidate
			id="kt_login_signup_form"
			onSubmit={formik.handleSubmit}
		>
			{/* begin::Heading */}
			<div
				className="text-center mb-11">
				{/* begin::Title */}
				<h1
					className="text-gray-900 fw-bolder mb-3">Registro</h1>
				{/* end::Title */}

				<div
					className="text-gray-500 fw-semibold fs-6">Inicia tu registro como socio</div>
			</div>
			{/* end::Heading */}

			{/* begin::Login options */}
			<div
				className="row g-3 mb-9">
				{/* begin::Col */}
				<div
					className="col-md-6">
					{/* begin::Google link */}
					<a
						href="#"
						// eslint-disable-next-line max-len
						className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
					>
						<img
							alt="Logo"
							src={toAbsoluteUrl('media/svg/brand-logos/google-icon.svg')}
							className="h-15px me-3"
						/>
						Iniciar sesión con Google
					</a>
					{/* end::Google link */}
				</div>
				{/* end::Col */}

				{/* begin::Col */}
				<div
					className="col-md-6">
					{/* begin::Google link */}
					<a
						href="#"
						// eslint-disable-next-line max-len
						className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
					>
						<img
							alt="Logo"
							src={toAbsoluteUrl('media/svg/brand-logos/apple-black.svg')}
							className="theme-light-show h-15px me-3"
						/>
						<img
							alt="Logo"
							src={toAbsoluteUrl('media/svg/brand-logos/apple-black-dark.svg')}
							className="theme-dark-show h-15px me-3"
						/>
						Iniciar sesión con Apple
					</a>
					{/* end::Google link */}
				</div>
				{/* end::Col */}
			</div>
			{/* end::Login options */}

			<div
				className="separator separator-content my-14">
				<span
					className="w-125px text-gray-500 fw-semibold fs-7">o con tu correo</span>
			</div>

			{formik.status && (
				<div
					className="mb-lg-15 alert alert-danger">
					<div
						className="alert-text font-weight-bold">{formik.status}</div>
				</div>
			)}

			{/* begin::Form group Firstname */}
			<div
				className="fv-row mb-8">
				<label
					className="form-label fw-bolder text-gray-900 fs-6">Nombres</label>
				<input
					placeholder="Ingresa tu nombre o nombres"
					type="text"
					autoComplete="off"
					{...formik.getFieldProps('firstname')}
					className={clsx(
						'form-control bg-transparent',
						{
							'is-invalid': formik.touched.firstname && formik.errors.firstname,
						},
						{
							'is-valid': formik.touched.firstname && !formik.errors.firstname,
						},
					)}
				/>
				{formik.touched.firstname && formik.errors.firstname && (
					<div
						className="fv-plugins-message-container">
						<div
							className="fv-help-block">
							<span
								role="alert">{formik.errors.firstname}</span>
						</div>
					</div>
				)}
			</div>
			{/* end::Form group */}
			<div
				className="fv-row mb-8">
				{/* begin::Form group Lastname */}
				<label
					className="form-label fw-bolder text-gray-900 fs-6">Apellidos</label>
				<input
					placeholder="Ingresa tus apellidos"
					type="text"
					autoComplete="off"
					{...formik.getFieldProps('lastname')}
					className={clsx(
						'form-control bg-transparent',
						{
							'is-invalid': formik.touched.lastname && formik.errors.lastname,
						},
						{
							'is-valid': formik.touched.lastname && !formik.errors.lastname,
						},
					)}
				/>
				{formik.touched.lastname && formik.errors.lastname && (
					<div
						className="fv-plugins-message-container">
						<div
							className="fv-help-block">
							<span
								role="alert">{formik.errors.lastname}</span>
						</div>
					</div>
				)}
				{/* end::Form group */}
			</div>

			{/* begin::Form group Email */}
			<div
				className="fv-row mb-8">
				<label
					className="form-label fw-bolder text-gray-900 fs-6">Correo personal</label>
				<input
					placeholder="ingresa tu correo personal (no empresarial)"
					type="email"
					autoComplete="off"
					{...formik.getFieldProps('email')}
					className={clsx(
						'form-control bg-transparent',
						{ 'is-invalid': formik.touched.email && formik.errors.email },
						{
							'is-valid': formik.touched.email && !formik.errors.email,
						},
					)}
				/>
				{formik.touched.email && formik.errors.email && (
					<div
						className="fv-plugins-message-container">
						<div
							className="fv-help-block">
							<span
								role="alert">{formik.errors.email}</span>
						</div>
					</div>
				)}
			</div>
			{/* end::Form group */}

			{/* begin::Form group Password */}
			<div
				className="fv-row mb-8"
				data-kt-password-meter="true">
				<div
					className="mb-1">
					<label
						className="form-label fw-bolder text-gray-900 fs-6">Contraseña</label>
					<div
						className="position-relative mb-3">
						<input
							type="password"
							placeholder="Ingregar contraseña"
							autoComplete="off"
							{...formik.getFieldProps('password')}
							className={clsx(
								'form-control bg-transparent',
								{
									'is-invalid': formik.touched.password && formik.errors.password,
								},
								{
									'is-valid': formik.touched.password && !formik.errors.password,
								},
							)}
						/>
						{formik.touched.password && formik.errors.password && (
							<div
								className="fv-plugins-message-container">
								<div
									className="fv-help-block">
									<span
										role="alert">{formik.errors.password}</span>
								</div>
							</div>
						)}
					</div>
					{/* begin::Meter */}
					<div
						className="d-flex align-items-center mb-3"
						data-kt-password-meter-control="highlight"
					>
						<div
							className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
						<div
							className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
						<div
							className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
						<div
							className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
					</div>
					{/* end::Meter */}
				</div>
				<div
					className="text-muted">
					Usa 8 o más caracteres con una combinación de letras, números y símbolos.
				</div>
			</div>
			{/* end::Form group */}

			{/* begin::Form group Confirm password */}
			<div
				className="fv-row mb-5">
				<label
					className="form-label fw-bolder text-gray-900 fs-6">Confirmar contraseña</label>
				<input
					type="password"
					placeholder="Confirmación de tu contraseña"
					autoComplete="off"
					{...formik.getFieldProps('changepassword')}
					className={clsx(
						'form-control bg-transparent',
						{
							'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
						},
						{
							'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
						},
					)}
				/>
				{formik.touched.changepassword && formik.errors.changepassword && (
					<div
						className="fv-plugins-message-container">
						<div
							className="fv-help-block">
							<span
								role="alert">{formik.errors.changepassword}</span>
						</div>
					</div>
				)}
			</div>
			{/* end::Form group */}

			{/* begin::Form group */}
			<div
				className="fv-row mb-8">
				<label
					className="form-check form-check-inline"
					htmlFor="kt_login_toc_agree">
					<input
						className="form-check-input"
						type="checkbox"
						id="kt_login_toc_agree"
						{...formik.getFieldProps('acceptTerms')}
					/>
					<span>
						Yo acepto los{''}
						<a
							href="https://keenthemes.com/metronic/?page=faq"
							target="_blank"
							className="ms-1 link-primary"
							rel="noreferrer"
						>
							Términos y condiciones
						</a>
						.
					</span>
				</label>
				{formik.touched.acceptTerms && formik.errors.acceptTerms && (
					<div
						className="fv-plugins-message-container">
						<div
							className="fv-help-block">
							<span
								role="alert">{formik.errors.acceptTerms}</span>
						</div>
					</div>
				)}
			</div>
			{/* end::Form group */}

			{/* begin::Form group */}
			<div
				className="text-center">
				<button
					type="submit"
					id="kt_sign_up_submit"
					className="btn btn-lg btn-primary w-100 mb-5"
					disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
				>
					{!loading && <span
						className="indicator-label">Registrarme</span>}
					{loading && (
						<span
							className="indicator-progress"
							style={{ display: 'block' }}>
							Espera por favor...{' '}
							<span
								className="spinner-border spinner-border-sm align-middle ms-2"></span>
						</span>
					)}
				</button>
				<Link
					to="/auth/login">
					<button
						type="button"
						id="kt_login_signup_form_cancel_button"
						className="btn btn-lg btn-light-primary w-100 mb-5"
					>
						Cancelar
					</button>
				</Link>
			</div>
			{/* end::Form group */}
		</form>
	)
}
