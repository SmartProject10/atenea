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

const data = [
	{
		id: 1,
		numero: '1',
		fechaPago: '2023-01-01',
		metodoPago: 'Transferencia',
		beneficiario: 'Juan Pérez',
		descripcion: 'Pago de servicios',
		numeroReferencia: '123456',
		estadoPago: 'Completado',
		porcentajeUtilidad: '0.5%',
		notasAdicionales: 'Ninguna',
	},
]

function PayHistoryTable() {
	return (
		<div className="table-responsive my-16">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th style={{ minWidth: '80px' }}>Número</th>
						<th style={{ minWidth: '150px' }}>Fecha del pago</th>
						<th style={{ minWidth: '150px' }}>Método de pago</th>
						<th style={{ minWidth: '150px' }}>Beneficiario</th>
						<th style={{ minWidth: '200px' }}>Descripción</th>
						<th style={{ minWidth: '200px' }}>Número de referencia</th>
						<th style={{ minWidth: '150px' }}>Estado del pago</th>
						<th style={{ minWidth: '200px' }}>Porcentaje de utilidad recibida</th>
						<th style={{ minWidth: '200px' }}>Notas adicionales</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.numero}</td>
									<td>{item.fechaPago}</td>
									<td>{item.metodoPago}</td>
									<td>{item.beneficiario}</td>
									<td>{item.descripcion}</td>
									<td>{item.numeroReferencia}</td>
									<td>{item.estadoPago}</td>
									<td>{item.porcentajeUtilidad}</td>
									<td>{item.notasAdicionales}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export function PayHistory() {
	const [showModal, setShowModal] = useState(false)

	const handleShow = () => setShowModal(true)
	const handleClose = () => setShowModal(false)

	return (
		<div className="card">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">Historial de Pagos</h5>
				<button className="btn btn-primary btn-sm" onClick={handleShow}>
					<KTIcon
						iconName="add-item"
						iconType="duotone"
					/>
					Agregar pago
				</button>
				<AddPaymentModal show={showModal} handleClose={handleClose} />
			</div>
			<div className="card-body">
				<div className="card-content">
					<p>
						El historial de pagos permite a los usuarios almacenar y gestionar la información de los pagos realizados a sus familiares de manera segura y eficiente. Los datos registrados incluyen el número de pago, la fecha, el método de pago, el beneficiario, la descripción, el número de referencia, el estado del pago, el porcentaje de utilidad recibida y notas adicionales.
					</p>
				</div>
				<PayHistoryTable />
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination />
					<div className="card-footer">
						<button className="btn btn-primary" onClick={exportToExcel}>Exportar</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function exportToExcel() {
	const ws = XLSX.utils.json_to_sheet(data)
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, 'Historial de Pagos')
	const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
	const blob = new Blob([wbout], { type: 'application/octet-stream' })
	saveAs(blob, 'historial_de_pagos.xlsx')
}

interface AddPaymentModalProps {
	show: boolean
	handleClose: () => void
}

function AddPaymentModal({ show, handleClose }: AddPaymentModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Agregar pago</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formNumero">
						<Form.Label>Número</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el número" />
					</Form.Group>
					<Form.Group controlId="formFechaPago">
						<Form.Label>Fecha del pago</Form.Label>
						<Form.Control type="date" />
					</Form.Group>
					<Form.Group controlId="formMetodoPago">
						<Form.Label>Método de pago</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el método de pago" />
					</Form.Group>
					<Form.Group controlId="formBeneficiario">
						<Form.Label>Beneficiario</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el beneficiario" />
					</Form.Group>
					<Form.Group controlId="formDescripcion">
						<Form.Label>Descripción</Form.Label>
						<Form.Control type="text" placeholder="Ingrese la descripción" />
					</Form.Group>
					<Form.Group controlId="formNumeroReferencia">
						<Form.Label>Número de referencia</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el número de referencia" />
					</Form.Group>
					<Form.Group controlId="formEstadoPago">
						<Form.Label>Estado del pago</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el estado del pago" />
					</Form.Group>
					<Form.Group controlId="formPorcentajeUtilidad">
						<Form.Label>Porcentaje de utilidad recibida</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el porcentaje de utilidad recibida" />
					</Form.Group>
					<Form.Group controlId="formNotasAdicionales">
						<Form.Label>Notas adicionales</Form.Label>
						<Form.Control type="text" placeholder="Ingrese las notas adicionales" />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant="primary" onClick={handleClose}>
					Agregar pago
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
