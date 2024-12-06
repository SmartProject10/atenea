import { MdEdit } from 'react-icons/md';

const data = [
	{
		title: 'Nombres Completos',
		type: 'text',
		value: 'Abel Castillo',
		disabled: true,
		name: 'name',
	},
	{
		title: 'Fecha de nacimiento',
		type: 'date',
		value: '01/01/1990',
		disabled: true,
		name: 'birthdate',
	},
	{
		title: 'Sexo',
		type: 'select',
		value: 'Masculino',
		disabled: true,
		name: 'sex',
	},
	{
		title: 'Correo personal',
		type: 'email',
		value: 'abelairton@gmail.com',
		disabled: true,
		name: 'email',
	},
	{
		title: 'Dirección exacta del domicilio',
		type: 'text',
		value: 'Calle 123, 123 123',
		disabled: true,
		name: 'address',
	},
	{
		title: 'País',
		type: 'text',
		value: 'Ecuador',
		disabled: true,
		name: 'country',
	},
	{
		title: 'Número de teléfono',
		type: 'number',
		value: '+593 980513677',
		disabled: true,
		name: 'phone',
	},
]

export function PersonalDataSection() {
	const handleEdit = (name: string) => {
		// Logic to enable editing for the specific field
		console.log(`Edit ${name}`);
	}

	return (
		<div className="card mb-8" id="personal-data">
			<div className="card-header">
				<h2 className="card-title">Datos personales</h2>
			</div>
			<div className="card-body">
				<div className="card-content">
					<form action="">
						{
							data.map((item) => (
								<div className="form-group row my-4" key={item.name}>
									<label className="col-form-label col-lg-4 col-sm-12">
										{item.title}
									</label>
									<div className="col-lg-8 col-md-9 col-sm-12 position-relative">
										{['phone', 'email', 'address'].includes(item.name) && (
											<button
												type="button"
												className="btn btn-link p-0 position-absolute"
												style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#007bff' }}
												onClick={() => handleEdit(item.name)}
											>
												<MdEdit size={18} />
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
							))
						}
						<div className="d-flex justify-content-end mt-8">
							<button className="btn btn-primary">Guardar cambios</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
