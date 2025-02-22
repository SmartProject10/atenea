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
			<li className="page-item"><a href="#" className="page-link">1</a></li>
			<li className="page-item active"><a href="#" className="page-link">2</a></li>
			<li className="page-item"><a href="#" className="page-link">3</a></li>
			<li className="page-item"><a href="#" className="page-link">4</a></li>
			<li className="page-item"><a href="#" className="page-link">5</a></li>
			<li className="page-item"><a href="#" className="page-link">6</a></li>
			<li className="page-item next">
				<a href="#" className="page-link">
					<i className="next"></i>
				</a>
			</li>
		</ul>
	)
}

interface FamilyMember {
	id: number
	number: string
	name: string
	relation: string
	accountNumber: string
	accountType: string
	country: string
	address: string
	email: string
	phone: string
	percentage: number
	authorization: string
}

function FamilyPaymentsTable({ data }: { data: FamilyMember[] }) {
	return (
		<div className="table-responsive my-16">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th style={{ minWidth: '80px' }}>Número</th>
						<th style={{ minWidth: '150px' }}>Nombre del familiar</th>
						<th style={{ minWidth: '100px' }}>Relación</th>
						<th style={{ minWidth: '150px' }}>Número de cuenta</th>
						<th style={{ minWidth: '140px' }}>Tipo de cuenta</th>
						<th style={{ minWidth: '100px' }}>País</th>
						<th style={{ minWidth: '200px' }}>Dirección</th>
						<th style={{ minWidth: '200px' }}>Correo electrónico</th>
						<th style={{ minWidth: '100px' }}>Teléfono</th>
						<th style={{ minWidth: '120px' }}>Porcentaje</th>
						<th style={{ minWidth: '150px' }}>Autorización</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => (
							<tr key={item.id}>
								<td>{item.number}</td>
								<td>{item.name}</td>
								<td>{item.relation}</td>
								<td>{item.accountNumber}</td>
								<td>{item.accountType}</td>
								<td>{item.country}</td>
								<td>{item.address}</td>
								<td>{item.email}</td>
								<td>{item.phone}</td>
								<td>{item.percentage}</td>
								<td>{item.authorization}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export function FamilyPayments() {
	const [showModal, setShowModal] = useState(false)
	const [familyData, setFamilyData] = useState([])

	const handleShow = () => setShowModal(true)
	const handleClose = () => setShowModal(false)

	return (
		<div className="card">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">Pagos a Familiares</h5>
				<button className="btn btn-primary btn-sm" onClick={handleShow}>
					<KTIcon
						iconName="add-item"
						iconType="duotone"
					/>
					Agregar familiar
				</button>
				<AddFamilyMemberModal show={showModal} handleClose={handleClose} />
			</div>
			<div className="card-body">
				<div className="card-content">
					<p>
						Registro de pagos a familiares de los socios. Aquí puede agregar, editar y eliminar la información de los familiares que recibirán un porcentaje de utilidad.
					</p>
				</div>
				<FamilyPaymentsTable data={familyData} />
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination />
				</div>
			</div>
		</div>
	)
}

interface AddFamilyMemberModalProps {
	show: boolean
	handleClose: () => void
}

function AddFamilyMemberModal({ show, handleClose }: AddFamilyMemberModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Agregar familiar</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formName">
						<Form.Label>Nombre del familiar</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el nombre del familiar" />
					</Form.Group>
					<Form.Group controlId="formRelation">
						<Form.Label>Relación con el socio</Form.Label>
						<Form.Control type="text" placeholder="Ingrese la relación con el socio" />
					</Form.Group>
					<Form.Group controlId="formAccountNumber">
						<Form.Label>Número de cuenta del familiar</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el número de cuenta del familiar" />
					</Form.Group>
					<Form.Group controlId="formAccountType">
						<Form.Label>Tipo de cuenta</Form.Label>
						<Form.Control as="select">
							<option value="">Seleccione el tipo de cuenta</option>
							<option value="Corriente">Corriente</option>
							<option value="Ahorro">Ahorro</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="formCountry">
						<Form.Label>País del familiar</Form.Label>
						<Form.Control as="select">
							<option value="">Seleccione el país</option>
							<option value="México">México</option>
							<option value="Estados Unidos">Estados Unidos</option>
							<option value="Canadá">Canadá</option>
							<option value="España">España</option>
							<option value="Argentina">Argentina</option>
							<option value="Colombia">Colombia</option>
							<option value="Chile">Chile</option>
							<option value="Perú">Perú</option>
							<option value="Brasil">Brasil</option>
							<option value="Uruguay">Uruguay</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="formAddress">
						<Form.Label>Dirección del familiar</Form.Label>
						<Form.Control type="text" placeholder="Ingrese la dirección del familiar" />	
					</Form.Group>
					<Form.Group controlId="formEmail">
						<Form.Label>Correo electrónico del familiar</Form.Label>
						<Form.Control type="email" placeholder="Ingrese el correo electrónico del familiar" />
					</Form.Group>
					<Form.Group controlId="formPhone">
						<Form.Label>Número de teléfono del familiar</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el número de teléfono del familiar" />
					</Form.Group>
					<Form.Group controlId="formPercentage">
						<Form.Label>Porcentaje de utilidad a recibir</Form.Label>
						<Form.Control
							type="number"
							step="0.01"
							min="0"
							max="100"
							placeholder="Ingrese el porcentaje de utilidad a recibir"
						/>
					</Form.Group>
					<Form.Group controlId="formAuthorization">
						<Form.Label>Autorización del familiar (documento adjunto)</Form.Label>
						<Form.Control type="file" />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant="primary" onClick={handleClose}>
					Agregar familiar
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
