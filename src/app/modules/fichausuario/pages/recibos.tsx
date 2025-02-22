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

interface Recibo {
    id: number
    numeroRecibo: string
    rucEmpresa: string
    paisSistema: string
    sgDigital: string
    fechaRecibo: string
    costoVenta: number
    utilidad: number
}

const data: Recibo[] = [
    // Data should be fetched from backend
]

function RecibosTable() {
    return (
        <div className="table-responsive my-16">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>N° de recibo</th>
                        <th>RUC empresa</th>
                        <th>País sistema</th>
                        <th>SG digital</th>
                        <th>Fecha de recibo</th>
                        <th>Costo de venta</th>
                        <th>Utilidad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.numeroRecibo}</td>
                                    <td>{item.rucEmpresa}</td>
                                    <td>{item.paisSistema}</td>
                                    <td>{item.sgDigital}</td>
                                    <td>{item.fechaRecibo}</td>
                                    <td>{item.costoVenta}</td>
                                    <td>{item.utilidad}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export function Recibos() {
    const [showModal, setShowModal] = useState(false)

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    return (
        <div className="card">
            <div className="card-header align-items-center">
                <h5 className="card-title flex-1 align-items-center">Historial de Recibos</h5>
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
                    Agregar Recibo
                </button>
            </div>
            <div className="card-body">
                <div className="card-content">
                    <p>
                        El historial de recibos permite a los usuarios almacenar y gestionar la información de los pagos realizados a sus familiares de manera segura y eficiente. Los datos registrados incluyen el número de recibo, el RUC de la empresa, el país del sistema, SG digital, la fecha del recibo, el costo de venta y la utilidad.
                    </p>
                </div>
                <RecibosTable />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                </div>
            </div>
            <AddReciboModal show={showModal} handleClose={handleClose} />
        </div>
    )
}

function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Recibos')
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    saveAs(blob, 'historial_de_recibos.xlsx')
}

interface AddReciboModalProps {
    show: boolean
    handleClose: () => void
}

function AddReciboModal({ show, handleClose }: AddReciboModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Recibo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formPaisSistema">
                        <Form.Label>País del sistema</Form.Label>
                        <Form.Control as="select">
                            <option value="">Seleccione el país</option>
                            {/* Add options dynamically */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formRucEmpresa">
                        <Form.Label>RUC de la empresa</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el RUC de la empresa" />
                    </Form.Group>
                    <Form.Group controlId="formNombreEmpresa">
                        <Form.Label>Nombre de la empresa</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre de la empresa" />
                    </Form.Group>
                    <Form.Group controlId="formSgDigital">
                        <Form.Label>Sistema de gestión</Form.Label>
                        <Form.Control as="select">
                            <option value="">Seleccione el sistema de gestión</option>
                            {/* Add options dynamically */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formOtroSg">
                        <Form.Label>Otro sistema de gestión (opcional)</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese otro sistema de gestión" />
                    </Form.Group>
                    <Form.Group controlId="formNumeroRecibo">
                        <Form.Label>Número del recibo</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el número del recibo" />
                    </Form.Group>
                    <Form.Group controlId="formFechaRecibo">
                        <Form.Label>Fecha de recibo</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="formArchivo">
                        <Form.Label>Archivo</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group controlId="formCostoVenta">
                        <Form.Label>Costo de venta</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el costo de venta" />
                    </Form.Group>
                    <Form.Group controlId="formUtilidad">
                        <Form.Label>Utilidad</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese la utilidad" />
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
