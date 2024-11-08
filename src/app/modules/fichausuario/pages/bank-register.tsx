import { KTIcon } from '@zeus/_zeus/helpers'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

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
		pais: 'España',
		banco: 'Banco Santander',
		numeroCuenta: 'ES7620770024003102575766',
		tipoCuenta: 'Corriente',
		moneda: 'DOLAR',
		acciones: 'Ver detalles',
	},
]

function BankRegisterTable() {
	return (
		<div className="table-response my-16">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Número</th>
						<th>País</th>
						<th>Banco</th>
						<th>Número de cuenta</th>
						{/* <th>Tipo de Cuenta</th> */}
						<th>Moneda</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.numero}</td>
									<td>{item.pais}</td>
									<td>{item.banco}</td>
									<td>{item.numeroCuenta}</td>
									{/*<td>{item.tipoCuenta}</td>*/}
									<td>{item.moneda}</td>
									<td>{item.acciones}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export function BankRegister() {
	const [showModal, setShowModal] = useState(false)

	const handleShow = () => setShowModal(true)
	const handleClose = () => setShowModal(false)

	return (
		<div className="card">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">Registro de cuenta bancaria</h5>
				<button className="btn btn-primary btn-sm" onClick={handleShow}>
					<KTIcon
						iconName="add-item"
						iconType="duotone"
					/>
					Agregar cuenta bancaria
				</button>
				<AddAccountModal show={showModal} handleClose={handleClose} />
			</div>
			<div className="card-body">
				<div className="card-content">
					<p>
						El registro bancario de los socios ISO & ISO permite a los usuarios almacenar y gestionar
						la información de
						sus cuentas bancarias de manera segura y eficiente. Los datos registrados incluyen el número de cuenta,
						el país, el banco, el tipo de cuenta y la moneda. Esta información es esencial para realizar
						transacciones financieras y asegurar que los pagos se procesen correctamente.
					</p>
				</div>
				<BankRegisterTable />
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination />
				</div>
			</div>
		</div>
	)
}

interface AddAccountModalProps {
	show: boolean
	handleClose: () => void
}

function AddAccountModal({ show, handleClose }: AddAccountModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Agregar cuenta bancaria</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
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
					<Form.Group controlId="formBanco">
						<Form.Label>Banco</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el banco" />
					</Form.Group>
					<Form.Group controlId="formNumeroCuenta">
						<Form.Label>Número de cuenta</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el número de cuenta" />
					</Form.Group>
					{/* <Form.Group controlId="formTipoCuenta">
						<Form.Label>Tipo de Cuenta</Form.Label>
						<Form.Control as="select">
							<option value="">Seleccione el tipo de cuenta</option>
							<option value="Corriente">Corriente</option>
							<option value="Ahorro">Ahorro</option>
							<option value="Nómina">Nómina</option>
							<option value="Inversión">Inversión</option>
						</Form.Control>
					</Form.Group> */}
					<Form.Group controlId="formMoneda">
						<Form.Label>Moneda</Form.Label>
						<Form.Control type="text" placeholder="Ingrese la moneda" />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant="primary" onClick={handleClose}>
					Agregar banco
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
