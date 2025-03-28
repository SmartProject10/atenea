import { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_zeus/helpers";
import { PasswordMeterComponent } from "../../../../_zeus/assets/ts/components";
import { useAuth } from "@zeus/@hooks/auth/useAuth.tsx";
import { backyService } from "@zeus/@services/api";
import FilterableSelect from "./selectCountry";
import { Form } from "react-bootstrap";
import FilterableRole from "./selectRol";

interface Country {
  name: string;
  code: string;
}
interface Rol {
  name: string;
  access: string[];
}
const initialValues = {
  firstname: "",
  lastname: "",
  cellphone: "",
  country: "",
  rol: "",
  email: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

const countries: Country[] = [
  { name: "Canadá", code: "+1" },
  { name: "Estados Unidos", code: "+1" },
  { name: "México", code: "+52" },
  { name: "Belice", code: "+501" },
  { name: "Costa Rica", code: "+506" },
  { name: "España", code: "+34" },
  { name: "El Salvador", code: "+503" },
  { name: "Guatemala", code: "+502" },
  { name: "Honduras", code: "+504" },
  { name: "Nicaragua", code: "+505" },
  { name: "Panamá", code: "+507" },
  { name: "Antigua y Barbuda", code: "+1-268" },
  { name: "Bahamas", code: "+1-242" },
  { name: "Barbados", code: "+1-246" },
  { name: "Cuba", code: "+53" },
  { name: "Dominica", code: "+1-767" },
  { name: "Granada", code: "+1-473" },
  { name: "Haití", code: "+509" },
  { name: "Jamaica", code: "+1-876" },
  { name: "República Dominicana", code: "+1-809, +1-829, +1-849" },
  { name: "San Cristóbal y Nieves", code: "+1-869" },
  { name: "Santa Lucía", code: "+1-758" },
  { name: "San Vicente y las Granadinas", code: "+1-784" },
  { name: "Trinidad y Tobago", code: "+1-868" },
  { name: "Argentina", code: "+54" },
  { name: "Bolivia", code: "+591" },
  { name: "Brasil", code: "+55" },
  { name: "Chile", code: "+56" },
  { name: "Colombia", code: "+57" },
  { name: "Ecuador", code: "+593" },
  { name: "Guyana", code: "+592" },
  { name: "Paraguay", code: "+595" },
  { name: "Perú", code: "+51" },
  { name: "Surinam", code: "+597" },
  { name: "Uruguay", code: "+598" },
  { name: "Venezuela", code: "+58" },
];

const roles: Rol[] = [
  { name: "Administrador", access: ["all"] },
  { name: "Auditor / implemntador", access: ["read"] },
  { name: "Programador", access: ["all"] },
  { name: "Ux / UI", access: ["read"] },
  { name: "Aanalista financiero", access: ["read"] },
  { name: "Contador", access: ["read"] },
  { name: "Aabogado", access: ["read"] },

];

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .required("Sus nombres son obligatorios"),
  lastname: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .required("Sus apellidos son obligatorios"),
  cellphone: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres")
    .required("El número de celular es obligatorio"),
  country: Yup.string().required("El pais es obligatorio"),
  rol: Yup.string().required("El rol es obligatorio"),
  email: Yup.string()
    .email("Formato de correo incorrecto")
    .min(12, "Mínimo 12 caracteres")
    .max(25, "Máximo 25 caracteres")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres")
    .required("La contraseña es obligatoria"),
  changepassword: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres")
    // .required("La confirmación de la contraseña es obligatoria")
    .oneOf(
      [Yup.ref("password")],
      "La contraseña y la confirmación no coinciden"
    ),
  acceptTerms: Yup.bool().required("Debes aceptar los términos y condiciones"),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      try {
        const { data: auth } = await backyService.auth.register(
          values.email,
          values.lastname,
          values.firstname,
          values.country,
          values.rol,
          values.cellphone,
          values.password
        );
        saveAuth(auth);
        const { data: user } = await backyService.auth.verifyToken();
        setCurrentUser(user);
        console.log(auth.data.message);
        console.log(values);
      } catch (error) {
        const errorMessage =
          (error as any).response?.data?.message || "An error occurred";
        console.error(errorMessage);
        saveAuth(undefined);
        setStatus(
          "The registration details is incorrect. Error Details: " +
            (error as any).response.data.message
        );
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className="text-center mb-11">
        {/* begin::Title */}
        <h1 className="text-gray-900 fw-bolder mb-3">Registro</h1>
        {/* end::Title */}

        <div className="text-gray-500 fw-semibold fs-6">
          Inicia tu registro como socio
        </div>
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
            src={toAbsoluteUrl("media/svg/brand-logos/google-icon.svg")}
            className="h-15px me-3"
          />
          Iniciar sesión con Google
        </a>
        {/* end::Google link */}
      </div>
      {/* end::Login options */}

      <div className="separator separator-content my-14">
        <span className="w-125px text-gray-500 fw-semibold fs-7">
          o con tu correo
        </span>
      </div>

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Nombres 
        </label>
        <input
          placeholder="Ingresa tus nombres completos"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("firstname")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.firstname && formik.errors.firstname,
            },
            {
              "is-valid": formik.touched.firstname && !formik.errors.firstname,
            }
          )}
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.firstname}</span>
            </div>
          </div>
        )}
      </div>
            {/* begin::Form group Lastname */}
            <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Apellidos 
        </label>
        <input
          placeholder="Ingresa tus apellidos"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("lastname")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.lastname && formik.errors.lastname,
            },
            {
              "is-valid": formik.touched.lastname && !formik.errors.lastname,
            }
          )}
        />
        {/* {formik.touched.lastname && formik.errors.lastname && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.lastname}</span>
            </div>
          </div>
        )} */}
      </div>
      {/* end::Form group */}
	  <div className="fv-row mb-8">
	  <label className="form-label fw-bolder text-gray-900 fs-6">
          País
        </label>
        <div className="d-flex">
	  <Formik
            initialValues={{ country: "" }}
            onSubmit={(values) => {
              console.log("Valores enviados:", values);
            }}
          >
            {() => (
              <FilterableSelect countries={countries} />
            )}
          </Formik>
		</div>

        {/* {formik.touched.country && formik.errors.country && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.country}</span>
            </div>
          </div>
        )} */}
        {/* end::Form group */}
		</div>
    <div className="fv-row mb-8">
	  <label className="form-label fw-bolder text-gray-900 fs-6">
          Rol
        </label>
        <div className="d-flex">
	  <Formik
            initialValues={{ rol: "" }}
            onSubmit={(roles) => {
              console.log("Valores enviados:", roles);
            }}
          >
            {() => (
              <FilterableRole roles={roles} />
            )}
          </Formik>
          
		</div>

        {/* {formik.touched.rol && formik.errors.rol && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.rol}</span>
            </div>
          </div>
        )} */}
        {/* end::Form group */}
		</div>
    

      <div className="fv-row mb-8">
        {/* begin::Form group Cellphone */}
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Número de celular
        </label>
        <div className="d-flex">
          <select
            className="form-select bg-transparent me-3 w-auto"
            {...formik.getFieldProps("countryCode")}
          >
            <option value="+1">(+1)</option>
            <option value="+593">(+593)</option>
            <option value="+51">(+51)</option>
            {/* Add more country codes as needed */}
          </select>

        

          <input
            placeholder="Número de celular"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("cellphone")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.cellphone && formik.errors.cellphone,
              },
              {
                "is-valid":
                  formik.touched.cellphone && !formik.errors.cellphone,
              }
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
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Correo personal
        </label>
        <input
          placeholder="ingresa tu correo personal (no empresarial)"
          type="email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className="fv-row mb-8" data-kt-password-meter="true">
        <div className="mb-1">
          <label className="form-label fw-bolder text-gray-900 fs-6">
            Contraseña
          </label>
          <div className="position-relative mb-3">
            <input
              type="password"
              placeholder="Ingregar contraseña"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className="text-muted">
          Usa 8 o más caracteres con una combinación de letras, números y
          símbolos.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className="fv-row mb-5">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Confirmar contraseña
        </label>
        <input
          type="password"
          placeholder="Confirma tu contraseña"
          autoComplete="off"
          {...formik.getFieldProps("changepassword")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              "is-valid":
                formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label
          className="form-check form-check-inline"
          htmlFor="kt_login_toc_agree"
        >
          <input
            className="form-check-input"
            type="checkbox"
            id="kt_login_toc_agree"
            {...formik.getFieldProps("acceptTerms")}
          />
          <span>
            Yo acepto los{""}
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
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
          disabled={
            formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms
          }
        >
          {!loading && <span className="indicator-label">Registrarme</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Espera por favor...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
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
  );
}

export default FilterableSelect;
