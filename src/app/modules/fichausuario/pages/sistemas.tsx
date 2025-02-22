import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Modal, Button, Form } from 'react-bootstrap'
import { KTIcon } from '@zeus/_zeus/helpers'

function Pagination() {
    return (
        <ul className="pagination">
            <li className="page-item previous disabled">
                <a href="#" className="page-link">
                    <i className="previous"></i>
                </a>
            </li>
            <li className="page-item "><a href="#" className="page-link">1</a></li>
            <li className="page-item active"><a href="#" className="page-link">2</a></li>
            <li className="page-item "><a href="#" className="page-link">3</a></li>
            <li className="page-item "><a href="#" className="page-link">4</a></li>
            <li className="page-item "><a href="#" className="page-link">5</a></li>
            <li className="page-item "><a href="#" className="page-link">6</a></li>
            <li className="page-item next">
                <a href="#" className="page-link">
                    <i className="next"></i>
                </a>
            </li>
        </ul>
    )
}

interface Sistema {
    id: number;
    nombreSistema: string;
    pais: string;
    usuario: string;
    estado: string;
    existencia: string;
    comentario: string;
    observaciones: string;
}

function SistemasTable({ data }: { data: Sistema[] }) {
    return (
        <div className="table-responsive my-16">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Nombre de sistema</th>
                        <th>País</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Existencia</th>
                        <th>Comentario</th>
                        <th>Observaciones-Documentación</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombreSistema}</td>
                                    <td>{item.pais}</td>
                                    <td>{item.usuario}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.existencia}</td>
                                    <td>{item.comentario}</td>
                                    <td>{item.observaciones}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export function Sistemas() {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([])

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const fetchData = async () => {
        // Fetch data from backend
        const response = await fetch('/api/sistemas')
        const result = await response.json()
        setData(result)
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Historial de Sistemas')
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([wbout], { type: 'application/octet-stream' })
        saveAs(blob, 'historial_de_sistemas.xlsx')
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="card">
            <div className="card-header align-items-center">
                <h5 className="card-title flex-1 align-items-center">Historial de Sistemas</h5>
                <button className="btn btn-primary btn-sm" onClick={exportToExcel}>
                    <KTIcon
                        iconName="file"
                        iconType="duotone"
                    />
                    Exportar
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleShow}>
                    <KTIcon
                        iconName="add-item"
                        iconType="duotone"
                    />
                    Agregar Sistema
                </button>
            </div>
            <div className="card-body">
                <div className="card-content">
                    <p>
                        El historial de sistemas permite a los usuarios almacenar y gestionar la información de los sistemas utilizados en los proyectos de manera segura y eficiente. Los datos registrados incluyen el nombre del sistema, el país, el usuario, el estado, la existencia, comentarios y observaciones/documentación.
                    </p>
                </div>
                <SistemasTable data={data} />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                </div>
            </div>
            <AddSistemaModal show={showModal} handleClose={handleClose} />
        </div>
    )
}

interface AddSistemaModalProps {
    show: boolean
    handleClose: () => void
}

function AddSistemaModal({ show, handleClose }: AddSistemaModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Sistema</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNombreSistema">
                        <Form.Label>Nombre del sistema</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre del sistema" />
                    </Form.Group>
                    <Form.Group controlId="formPais">
                        <Form.Label>País</Form.Label>
                        <Form.Control as="select">
                            <option value="">Seleccione el país</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Brasil">Brasil</option>
                            <option value="Chile">Chile</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Honduras">Honduras</option>
                            <option value="México">México</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Panamá">Panamá</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Perú">Perú</option>
                            <option value="República Dominicana">República Dominicana</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Venezuela">Venezuela</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formUsuario">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el usuario" />
                    </Form.Group>
                    <Form.Group controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control as="select">
                            <option value="">Seleccione el estado</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formExistencia">
                        <Form.Label>Existencia</Form.Label>
                        <Form.Control as="select">
                            <option value="">Seleccione la existencia</option>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formComentario">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese un comentario" />
                    </Form.Group>
                    <Form.Group controlId="formObservacionesDocumentacion">
                        <Form.Label>Observaciones-Documentación</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
