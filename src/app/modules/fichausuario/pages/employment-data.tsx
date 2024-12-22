import { KTIcon } from '@zeus/_zeus/helpers' 

const data = [
	{
		title: 'Codigo del trabajador',
		type: 'text',
		value: '12345678',
		disabled: true,
		name: 'code',
	},
	{
		title: 'Especialidades',
		type: 'text',
		value: 'Full-stack',
		disabled: true,
		name: 'specialties',
	},
	{
		title: 'Area del trabajador',
		type: 'text',
		value: 'Desarollo Móvil',
		disabled: true,
		name: 'area',
	},
	{
		title: 'Años de experiencia',
		type: 'text',
		value: '5',
		disabled: true,
		name: 'experience',
	},
	{
		title: 'Tecnologías dominadas',
		type: 'text',
		value: 'React, Node, Express',
		disabled: true,
		name: 'technologies',
	},
	{
		title: 'Certificaciones técnicas',
		type: 'text',
		value: 'Certificación de React',
		disabled: true,
		name: 'certifications',
	},
	{
		title: 'Portafolio git',
		type: 'text',
		value: 'https://github.com/usuario/proyecto1',
		disabled: true,
		name: 'portfolio',
	},
	{
		title: 'Horario de trabajo',
		type: 'text',
		value: '8:00 AM - 5:00 PM',
		disabled: true,
		name: 'workhours',
	},
	{
		title: 'Disponibilidad de proyectos',
		type: 'text',
		value: 'Disponible',
		disabled: true,
		name: 'availability',
	},
	{
		title: 'Idiomas',
		type: 'text',
		value: 'Inglés B2, Español nativo',
		disabled: true,
		name: 'english',
	},
	{
		title: 'Estado',
		type: 'text',
		value: 'Activo',
		disabled: true,
		name: 'status',
	},
	{
		title: 'Tipo de contrato',
		type: 'text',
		value: 'Indefinido',
		disabled: true,
		name: 'contract',
	},
	{
		title: 'Curriculum Vitae',
		type: 'file',
		value: '',
		disabled: false,
		name: 'cv',
	}
]

export function EmploymentDataSection() {
	return (
		<div className="card mb-8" id="employment-data">
			<div className="card-header">
				<h2 className="card-title">Datos Profesionales</h2>
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
									<div className="col-lg-8 col-md-9 col-sm-12">
										<input
											name={item.name}
											type={item.type}
											className="form-control"
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