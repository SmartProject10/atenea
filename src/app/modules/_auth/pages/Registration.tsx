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
	cellphone: '',
	email: '',
	password: '',
	changepassword: '',
	acceptTerms: false,
	country: '',
	countryCode: '',
}

const registrationSchema = Yup.object().shape({
	firstname: Yup.string()
		.min(3, 'Mínimo 3 caracteres')
		.max(50, 'Máximo 50 caracteres')
		.required('Sus nombres son obligatorio'),
	cellphone: Yup.string()
		.min(8, 'Mínimo 8 caracteres')
		.max(15, 'Máximo 15 caracteres')
		.required('El número de celular es obligatorio'),
	email: Yup.string()
		.email('Formato de correo incorrecto')
		.min(12, 'Mínimo 12 caracteres')
		.max(25, 'Máximo 25 caracteres')
		.required('El correo es obligatorio'),
	password: Yup.string()
		.min(8, 'Mínimo 8 caracteres')
		.max(15, 'Máximo 15 caracteres')
		.required('La contraseña es obligatoria'),
	changepassword: Yup.string()
		.min(8, 'Mínimo 8 caracteres')
		.max(15, 'Máximo 15 caracteres')
		.oneOf([Yup.ref('password')], 'La contraseña y la confirmación no coinciden'),
	acceptTerms: Yup.bool().required('Debes aceptar los términos y condiciones'),
	country: Yup.string().required('El país es obligatorio'),
	countryCode: Yup.string().required('El código de país es obligatorio'),
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
					values.cellphone,
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
						<div className="d-flex justify-content-center mb-9">
							{/* begin::Google link */}
							<a
								href="#"
								className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap"
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
					className="form-label fw-bolder text-gray-900 fs-6">Nombres Completos</label>
				<input
					placeholder="Ingresa tus nombres completos"
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
			{/* begin::Form group Country */}
			<div className="fv-row mb-8">
				<label className="form-label fw-bolder text-gray-900 fs-6">País</label>
				<select
					className="form-select bg-transparent"
					{...formik.getFieldProps('country')}
				>
					<option value="">Selecciona un país...</option>
					<option value="AF">Afganistán</option>
					<option value="AL">Albania</option>
					<option value="DZ">Argelia</option>
					<option value="AS">Samoa Americana</option>
					<option value="AD">Andorra</option>
					<option value="AO">Angola</option>
					<option value="AI">Anguila</option>
					<option value="AQ">Antártida</option>
					<option value="AG">Antigua y Barbuda</option>
					<option value="AR">Argentina</option>
					<option value="AM">Armenia</option>
					<option value="AW">Aruba</option>
					<option value="AU">Australia</option>
					<option value="AT">Austria</option>
					<option value="AZ">Azerbaiyán</option>
					<option value="BS">Bahamas</option>
					<option value="BH">Baréin</option>
					<option value="BD">Bangladés</option>
					<option value="BB">Barbados</option>
					<option value="BY">Bielorrusia</option>
					<option value="BE">Bélgica</option>
					<option value="BZ">Belice</option>
					<option value="BJ">Benín</option>
					<option value="BM">Bermudas</option>
					<option value="BT">Bután</option>
					<option value="BO">Bolivia</option>
					<option value="BA">Bosnia y Herzegovina</option>
					<option value="BW">Botsuana</option>
					<option value="BR">Brasil</option>
					<option value="BN">Brunéi</option>
					<option value="BG">Bulgaria</option>
					<option value="BF">Burkina Faso</option>
					<option value="BI">Burundi</option>
					<option value="KH">Camboya</option>
					<option value="CM">Camerún</option>
					<option value="CA">Canadá</option>
					<option value="CV">Cabo Verde</option>
					<option value="KY">Islas Caimán</option>
					<option value="CF">República Centroafricana</option>
					<option value="TD">Chad</option>
					<option value="CL">Chile</option>
					<option value="CN">China</option>
					<option value="CO">Colombia</option>
					<option value="KM">Comoras</option>
					<option value="CG">Congo</option>
					<option value="CR">Costa Rica</option>
					<option value="HR">Croacia</option>
					<option value="CU">Cuba</option>
					<option value="CY">Chipre</option>
					<option value="CZ">República Checa</option>
					<option value="DK">Dinamarca</option>
					<option value="DJ">Yibuti</option>
					<option value="DM">Dominica</option>
					<option value="DO">República Dominicana</option>
					<option value="EC">Ecuador</option>
					<option value="EG">Egipto</option>
					<option value="SV">El Salvador</option>
					<option value="GQ">Guinea Ecuatorial</option>
					<option value="ER">Eritrea</option>
					<option value="EE">Estonia</option>
					<option value="ET">Etiopía</option>
					<option value="FJ">Fiyi</option>
					<option value="FI">Finlandia</option>
					<option value="FR">Francia</option>
					<option value="GA">Gabón</option>
					<option value="GM">Gambia</option>
					<option value="GE">Georgia</option>
					<option value="DE">Alemania</option>
					<option value="GH">Ghana</option>
					<option value="GR">Grecia</option>
					<option value="GD">Granada</option>
					<option value="GT">Guatemala</option>
					<option value="GN">Guinea</option>
					<option value="GW">Guinea-Bisáu</option>
					<option value="GY">Guyana</option>
					<option value="HT">Haití</option>
					<option value="HN">Honduras</option>
					<option value="HU">Hungría</option>
					<option value="IS">Islandia</option>
					<option value="IN">India</option>
					<option value="ID">Indonesia</option>
					<option value="IR">Irán</option>
					<option value="IQ">Irak</option>
					<option value="IE">Irlanda</option>
					<option value="IL">Israel</option>
					<option value="IT">Italia</option>
					<option value="JM">Jamaica</option>
					<option value="JP">Japón</option>
					<option value="JO">Jordania</option>
					<option value="KZ">Kazajistán</option>
					<option value="KE">Kenia</option>
					<option value="KI">Kiribati</option>
					<option value="KP">Corea del Norte</option>
					<option value="KR">Corea del Sur</option>
					<option value="KW">Kuwait</option>
					<option value="KG">Kirguistán</option>
					<option value="LA">Laos</option>
					<option value="LV">Letonia</option>
					<option value="LB">Líbano</option>
					<option value="LS">Lesoto</option>
					<option value="LR">Liberia</option>
					<option value="LY">Libia</option>
					<option value="LI">Liechtenstein</option>
					<option value="LT">Lituania</option>
					<option value="LU">Luxemburgo</option>
					<option value="MO">Macao</option>
					<option value="MK">Macedonia del Norte</option>
					<option value="MG">Madagascar</option>
					<option value="MW">Malaui</option>
					<option value="MY">Malasia</option>
					<option value="MV">Maldivas</option>
					<option value="ML">Malí</option>
					<option value="MT">Malta</option>
					<option value="MH">Islas Marshall</option>
					<option value="MR">Mauritania</option>
					<option value="MU">Mauricio</option>
					<option value="MX">México</option>
					<option value="FM">Micronesia</option>
					<option value="MD">Moldavia</option>
					<option value="MC">Mónaco</option>
					<option value="MN">Mongolia</option>
					<option value="ME">Montenegro</option>
					<option value="MA">Marruecos</option>
					<option value="MZ">Mozambique</option>
					<option value="MM">Birmania</option>
					<option value="NA">Namibia</option>
					<option value="NR">Nauru</option>
					<option value="NP">Nepal</option>
					<option value="NL">Países Bajos</option>
					<option value="NZ">Nueva Zelanda</option>
					<option value="NI">Nicaragua</option>
					<option value="NE">Níger</option>
					<option value="NG">Nigeria</option>
					<option value="NO">Noruega</option>
					<option value="OM">Omán</option>
					<option value="PK">Pakistán</option>
					<option value="PW">Palaos</option>
					<option value="PA">Panamá</option>
					<option value="PG">Papúa Nueva Guinea</option>
					<option value="PY">Paraguay</option>
					<option value="PE">Perú</option>
					<option value="PH">Filipinas</option>
					<option value="PL">Polonia</option>
					<option value="PT">Portugal</option>
					<option value="QA">Catar</option>
					<option value="RO">Rumanía</option>
					<option value="RU">Rusia</option>
					<option value="RW">Ruanda</option>
					<option value="KN">San Cristóbal y Nieves</option>
					<option value="LC">Santa Lucía</option>
					<option value="VC">San Vicente y las Granadinas</option>
					<option value="WS">Samoa</option>
					<option value="SM">San Marino</option>
					<option value="ST">Santo Tomé y Príncipe</option>
					<option value="SA">Arabia Saudita</option>
					<option value="SN">Senegal</option>
					<option value="RS">Serbia</option>
					<option value="SC">Seychelles</option>
					<option value="SL">Sierra Leona</option>
					<option value="SG">Singapur</option>
					<option value="SK">Eslovaquia</option>
					<option value="SI">Eslovenia</option>
					<option value="SB">Islas Salomón</option>
					<option value="SO">Somalia</option>
					<option value="ZA">Sudáfrica</option>
					<option value="ES">España</option>
					<option value="LK">Sri Lanka</option>
					<option value="SD">Sudán</option>
					<option value="SR">Surinam</option>
					<option value="SZ">Suazilandia</option>
					<option value="SE">Suecia</option>
					<option value="CH">Suiza</option>
					<option value="SY">Siria</option>
					<option value="TW">Taiwán</option>
					<option value="TJ">Tayikistán</option>
					<option value="TZ">Tanzania</option>
					<option value="TH">Tailandia</option>
					<option value="TL">Timor Oriental</option>
					<option value="TG">Togo</option>
					<option value="TO">Tonga</option>
					<option value="TT">Trinidad y Tobago</option>
					<option value="TN">Túnez</option>
					<option value="TR">Turquía</option>
					<option value="TM">Turkmenistán</option>
					<option value="TV">Tuvalu</option>
					<option value="UG">Uganda</option>
					<option value="UA">Ucrania</option>
					<option value="AE">Emiratos Árabes Unidos</option>
					<option value="GB">Reino Unido</option>
					<option value="US">Estados Unidos</option>
					<option value="UY">Uruguay</option>
					<option value="UZ">Uzbekistán</option>
					<option value="VU">Vanuatu</option>
					<option value="VE">Venezuela</option>
					<option value="VN">Vietnam</option>
					<option value="YE">Yemen</option>
					<option value="ZM">Zambia</option>
					<option value="ZW">Zimbabue</option>
				</select>
				{formik.touched.country && formik.errors.country && (
					<div className="fv-plugins-message-container">
						<div className="fv-help-block">
							<span role="alert">{formik.errors.country}</span>
						</div>
					</div>
				)}
			</div>
			{/* end::Form group */}
			{/* end::Form group */}
			<div className="fv-row mb-8">
				{/* begin::Form group Cellphone */}
				<label className="form-label fw-bolder text-gray-900 fs-6">Número de celular</label>
				<div className="d-flex">
					<select
						className="form-select bg-transparent me-3 w-auto"
						{...formik.getFieldProps('countryCode')}
					>
						<option value="+1">Estados Unidos (+1)</option>
						<option value="+593">Ecuador (+593)</option>
						<option value="+51">Perú (+51)</option>
						{/* Add more country codes as needed */}
					</select>
					<input
						placeholder="Número de celular"
						type="text"
						autoComplete="off"
						{...formik.getFieldProps('cellphone')}
						className={clsx(
							'form-control bg-transparent',
							{
								'is-invalid': formik.touched.cellphone && formik.errors.cellphone,
							},
							{
								'is-valid': formik.touched.cellphone && !formik.errors.cellphone,
							},
						)}
					/>
				</div>
				{formik.touched.cellphone && formik.errors.cellphone && (
					<div className="fv-plugins-message-container">
						<div className="fv-help-block">
							<span role="alert">{formik.errors.cellphone}</span>
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
					placeholder="Confirma tu contraseña"
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