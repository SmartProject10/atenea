import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { Modal, Button, Form } from 'react-bootstrap';

const initialData = [
	{ title: 'Nombres Completos', type: 'text', value: '', disabled: true, name: 'name' },
	{ title: 'Fecha de nacimiento', type: 'date', value: '', disabled: true, name: 'birthdate' },
	{ title: 'Sexo', type: 'select', value: '', disabled: true, name: 'sex' },
	{ title: 'Correo personal (no institucional)', type: 'email', value: '', disabled: true, name: 'email' },
	{ title: 'Dirección exacta del domicilio', type: 'text', value: '', disabled: true, name: 'address' },
	{ title: 'País', type: 'text', value: '', disabled: true, name: 'country' },
	{ title: 'Número de teléfono', type: 'number', value: '', disabled: true, name: 'phone' },
];

export function PersonalDataSection() {
	const [data, setData] = useState(initialData);
	const [showModal, setShowModal] = useState(false);
	const [currentField, setCurrentField] = useState({ name: '', value: '' });

	const handleEdit = (name: string) => {
		const field = data.find(item => item.name === name);
		if (field) {
			setCurrentField({ name: field.name, value: field.value });
			setShowModal(true);
		}
	};

	const handleSave = () => {
		setData(prevData =>
			prevData.map(item =>
				item.name === currentField.name ? { ...item, value: currentField.value } : item
			)
		);
		setShowModal(false);
	};

	return (
		<div className="card mb-8" id="personal-data">
			<div className="card-header">
				<h2 className="card-title">Datos personales</h2>
			</div>
			<div className="card-body">
				<div className="card-content">
					<form action="">
						{data.map(item => (
							<div className="form-group row my-4" key={item.name}>
								<label className="col-form-label col-lg-4 col-sm-12">{item.title}</label>
								<div className="col-lg-8 col-md-9 col-sm-12 position-relative">
									{['birthdate', 'phone', 'sex', 'email', 'country', 'address'].includes(item.name) && (
										<button
											type="button"
											className="btn btn-link p-0 position-absolute"
											style={{
												right: '10px',
												top: '50%',
												transform: 'translateY(-50%)',
												color: '#007bff',
												fontSize: '14px',
												border: '2px solid #007bff',
												padding: '10px',
												borderRadius: '10px',
												backgroundColor: 'rgba(0, 123, 255, 0.1)',
											}}
											onClick={() => handleEdit(item.name)}
										>
											<MdEdit size={20} />
										</button>
									)}
									<input
										name={item.name}
										type={item.type}
										className="form-control pr-5"
										placeholder={item.value}
										disabled={item.disabled}
									/>
								</div>
							</div>
						))}
						<div className="d-flex justify-content-end mt-8">
							<button className="btn btn-primary">Guardar cambios</button>
						</div>
					</form>
				</div>
			</div>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Editar Información</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId={`form${currentField.name}`}>
							<Form.Label>{data.find(item => item.name === currentField.name)?.title}</Form.Label>
							<Form.Control
								type={data.find(item => item.name === currentField.name)?.type}
								value={currentField.value}
								onChange={e => setCurrentField({ ...currentField, value: e.target.value })}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
