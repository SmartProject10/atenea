import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { backyService } from '@zeus/@services/api'

const initialValues = {
  email: 'admin@demo.com',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de correo incorrecto')
    .min(3, 'Mínimo 3 símbolos')
    .max(50, 'Máximo 50 símbolos')
    .required('El correo es obligatorio'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        backyService.auth.resetPassword(values.email)
          .then(() => {
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={formik.handleSubmit}
    >
      <div
className="text-center mb-10">
        {/* begin::Title */}
        <h1
className="text-gray-900 fw-bolder mb-3">¿Olvidaste tu contraseña?</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div
className="text-gray-500 fw-semibold fs-6">
          Ingresa tu correo y resetearemos tu contraseña
        </div>
        {/* end::Link */}
      </div>

      {/* begin::Title */}
      {hasErrors === true && (
        <div
className="mb-lg-15 alert alert-danger">
            <div
      className="alert-text font-weight-bold">
            Lo siento, parece que se detectaron algunos errores, por favor intente de nuevo.
            </div>
        </div>
      )}

      {hasErrors === false && (
        <div
className="mb-10 bg-light-info p-8 rounded">
            <div
      className="text-info">Se ha enviado el restablecimiento de contraseña. Por favor, revisa tu correo electrónico</div>
        </div>
      )}
      {/* end::Title */}

      {/* begin::Form group */}
      <div
className="fv-row mb-8">
        <label
className="form-label fw-bolder text-gray-900 fs-6">Correo electrónico</label>
        <input
          type="email"
          placeholder=""
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

      {/* begin::Form group */}
      <div
className="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
type="submit"
id="kt_password_reset_submit"
className="btn btn-primary me-4">
          <span
className="indicator-label">Enviar</span>
          {loading && (
            <span
className="indicator-progress">
              Espera por favor...
              <span
className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link
to="/auth/login">
          <button
            type="button"
            id="kt_login_password_reset_form_cancel_button"
            className="btn btn-light"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancelar
          </button>
        </Link>{' '}
      </div>
      {/* end::Form group */}
    </form>
  )
}
