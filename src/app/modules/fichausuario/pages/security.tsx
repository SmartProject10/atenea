import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import './security.scss';

const Security: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const intl = useIntl();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Mínimo 8 caracteres')
                .max(15, 'Máximo 15 caracteres')
                .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
                .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
                .matches(/[0-9]/, 'Debe contener al menos un número')
                .matches(/[@$!%*?&#]/, 'Debe contener al menos un carácter especial')
                .required('La contraseña es obligatoria'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Las contraseñas deben coincidir')
                .required('Confirmar contraseña es obligatorio')
        }),
        onSubmit: values => {
            console.log('Contraseña actualizada:', values);
            setIsModalOpen(false);
        }
    });

    const handleOpenModal = () => {
        formik.resetForm();
        setIsModalOpen(true);
    };

    return (
        <div className="security-container">
            <h2 className="security-title">Seguridad</h2>
            <div className="security-item">
                <h3>Cambiar Contraseña</h3>
                <button className="security-button" onClick={handleOpenModal}>Cambiar Contraseña</button>
            </div>
            <div className="security-item">
                <h3>Teléfono de Recuperación</h3>
                <input type="text" placeholder="Nuevo Teléfono" className="security-input" />
                <button className="security-button">Actualizar Teléfono</button>
            </div>
            <div className="security-item">
                <h3>Correo de Recuperación</h3>
                <input type="email" placeholder="Nuevo Correo" className="security-input" />
                <button className="security-button">Actualizar Correo</button>
            </div>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar Contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit} className="form w-100" noValidate>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label fs-6 fw-bolder text-gray-900">
                                {intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
                                <i
                                    className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                ></i>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                {...formik.getFieldProps('password')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.password && formik.errors.password },
                                    { 'is-valid': formik.touched.password && !formik.errors.password }
                                )}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="fv-plugins-message-container">
                                    <span role="alert">{formik.errors.password}</span>
                                </div>
                            ) : null}
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                                {intl.formatMessage({ id: 'AUTH.INPUT.CONFIRM_PASSWORD' })}
                                <i
                                    className={showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                ></i>
                            </label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                {...formik.getFieldProps('confirmPassword')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword },
                                    { 'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword }
                                )}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                        <span role="alert">{formik.errors.confirmPassword}</span>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || !formik.isValid}>
                            Guardar
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Security;
