import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Configuración de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AddClientModalProps {
	show: boolean;
	handleClose: () => void;
}

function AddClientModal({ show, handleClose }: AddClientModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Agregar Nuevo Cliente</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formRUC">
						<Form.Label>RUC</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el RUC" />
					</Form.Group>
					<Form.Group controlId="formCompanyName">
						<Form.Label>Nombre o razón social</Form.Label>
						<Form.Control type="text" placeholder="Ingrese el nombre o razón social" />
					</Form.Group>
					<Form.Group controlId="formCountry">
						<Form.Label>País</Form.Label>
						<Form.Control as="select">
							<option value="select">Seleccione país</option>
							<option value="Peru">Peru</option>
							<option value="Chile">Chile</option>
							<option value="Argentina">Argentina</option>
						</Form.Control>
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

export function Comisiones() {
	const [showModal, setShowModal] = useState(false);

	// Datos y opciones del gráfico
	const data = {
		labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
		datasets: [
			{
				label: 'Ingresos de Comisiones',
				data: [1000, 2000, 1500, 3000, 2500, 4000],
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				fill: true,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Ingresos - Ganancias de Comisiones',
			},
		},
	};

	const commissionsData = [
		{
			id: 1,
			country: 'Peru',
			ruc: '123456789',
			companyName: 'Empresa Peruana',
			type: 'comprado',
			income: 1000,
			commission: '10%',
			status: 'pendiente',
			date: '2023-01-01'
		},
		{
			id: 2,
			country: 'Chile',
			ruc: '987654321',
			companyName: 'Empresa Chilena',
			type: 'alquiler',
			income: 2000,
			commission: '15%',
			status: 'cancelado',
			date: '2023-02-01'
		}
	];

	const handleNewClient = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<h1>Comisiones de Iso and Iso</h1>
			<p>En esta sección, puede ver y gestionar las comisiones generadas por las transacciones de la empresa Iso and Iso. Utilice los filtros para buscar y exportar la información relevante.
				TODO CLIENTE SUBIDO TENDRÁ UN DURACIÓN DE 3 MESES
			</p>
			<button className="btn btn-primary mb-3" onClick={handleNewClient}>NUEVO CLIENTE</button>
			<div className="separator my-10"></div>
			
			<div className="filters mb-3">
				<div className="row">
					<div className="col">
						<input type="text" placeholder="Buscar..." className="form-control form-control-sm" />
					</div>
					<div className="col">
						<select className="form-control form-control-sm">
							<option value="">País</option>
							<option value="Peru">Peru</option>
							<option value="Chile">Chile</option>
							<option value="Argentina">Argentina</option>
						</select>
					</div>
					<div className="col">
						<select className="form-control form-control-sm">
							<option value="">Tipo</option>
							<option value="comprado">Comprado</option>
							<option value="alquiler">Alquiler</option>
						</select>
					</div>
					<div className="col">
						<select className="form-control form-control-sm">
							<option value="">Estado</option>
							<option value="cancelado">Cancelado</option>
							<option value="1 comisión">1 Comisión</option>
							<option value="pendiente">Pendiente</option>
						</select>
					</div>
					<div className="col">
						<input type="date" className="form-control form-control-sm" placeholder="Fecha desde" />
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
							<th className="min-w-100px">País</th>
							<th className="min-w-150px">RUC</th>
							<th className="min-w-200px">Nombre de la empresa</th>
							<th className="min-w-100px">Tipo</th>
							<th className="min-w-100px">Ingreso</th>
							<th className="min-w-100px">% de comisión</th>
							<th className="min-w-100px">Estado</th>
							<th className="min-w-100px">Fecha</th>
						</tr>
					</thead>
					<tbody>
						{commissionsData.map((commission) => (
							<tr key={commission.id}>
								<td>{commission.id}</td>
								<td>{commission.country}</td>
								<td>{commission.ruc}</td>
								<td>{commission.companyName}</td>
								<td>{commission.type}</td>
								<td>{commission.income}</td>
								<td>{commission.commission}</td>
								<td>{commission.status}</td>
								<td>{commission.date}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			
			{/* Gráfico de Ingresos de Comisiones */}
			<div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
				<Line data={data} options={options} />
			</div>
			
			<AddClientModal show={showModal} handleClose={handleCloseModal} />
		</div>
	);
}
