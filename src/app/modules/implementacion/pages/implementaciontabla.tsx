import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Configuración de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AddImplementationModalProps {
    show: boolean;
    handleClose: () => void;
}

function AddImplementationModal({ show, handleClose }: AddImplementationModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Implementación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCountry">
                        <Form.Label>País</Form.Label>
                        <Form.Control as="select">
                            <option value="select">Seleccione país</option>
                            <option value="Peru">Peru</option>
                            <option value="Chile">Chile</option>
                            <option value="Argentina">Argentina</option>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formISO">
                        <Form.Label>Sistema</Form.Label>
                        <Form.Control as="select">
                            <option value="select">Seleccione Sistema</option>
                            <option value="ISO 9001">ISO 9001</option>
                            <option value="ISO 14001">ISO 14001</option>
                            <option value="ISO 45001">ISO 45001</option>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formOtherISO">
                        <Form.Label>Otro Sistema</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese otro Sistema (opcional)" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formObservations">
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formFile">
                        <Form.Label>Subir un archivo</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Guardar y Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function Implementacion() {
    const [showModal, setShowModal] = useState(false);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Implementaciones Mensuales',
            },
        },
    };

    const implementationsData = [
        {
            id: 1,
            system: 'Contabilidad',
            status: 'pendiente',
            date: '2023-01-01',
            country: 'Peru',
            observations: 'Observación 1'
        },
        {
            id: 2,
            system: 'Almacen',
            status: 'cancelado',
            date: '2023-02-01',
            country: 'Chile',
            observations: 'Observación 2'
        }
    ];

    const handleNewImplementation = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>Implementaciones de Sistemas de Gestión</h1>
            <p>En esta sección, puede ver y gestionar las implementaciones de la empresa Iso and Iso. Utilice los filtros para buscar y exportar la información relevante.<br/> Todo cliente subido tendrá la duración de 3 meses</p>
            <button className="btn btn-primary mb-3" onClick={handleNewImplementation}>NUEVA IMPLEMENTACIÓN</button>
            <div className="separator my-10"></div>
            
            <div className="filters mb-3">
                <div className="row">
                    <div className="col">
                        <input type="text" placeholder="Buscar..." className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <select className="form-control form-control-sm">
                            <option value="">Sistema Digital</option>
                            <option value="Contabilidad">Contabilidad</option>
                            <option value="Almacen">Almacen</option>
                            <option value="21001">21001</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-control form-control-sm">
                            <option value="">Estado</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="rechazado">Rechazado</option>
                            <option value="aceptado">Aceptado</option>
                            <option value="pendiente">Pendiente</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="date" className="form-control form-control-sm" placeholder="Fecha de ingreso" />
                    </div>
                    <div className="col">
                        <button className="btn btn-secondary btn-sm">Exportar</button>
                    </div>
                </div>
            </div>
            
            <div className="table-responsive">
                <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                            <th className="min-w-50px">N°</th>
                            <th className="min-w-150px">Sistema Digital</th>
                            <th className="min-w-100px">Estado</th>
                            <th className="min-w-100px">Fecha de Ingreso</th>
                            <th className="min-w-100px">País</th>
                            <th className="min-w-200px">Observaciones</th>
                            <th className="min-w-100px">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {implementationsData.map((implementation) => (
                            <tr key={implementation.id}>
                                <td>{implementation.id}</td>
                                <td>{implementation.system}</td>
                                <td>{implementation.status}</td>
                                <td>{implementation.date}</td>
                                <td>{implementation.country}</td>
                                <td>{implementation.observations}</td>
                                <td>
                                    <FaEdit className="me-2" />
                                    <FaTrash />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddImplementationModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}