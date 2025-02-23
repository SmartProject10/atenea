import { KTIcon } from '@zeus/_zeus/helpers'

const data = [
	{
		title: 'Codigo socio',
		type: 'text',
		value: '',
		disabled: true,
		name: 'code',
	},
	{
		title: 'Sectores de especialización',
		type: 'text',
		value: '',
		disabled: true,
		name: 'specialization',
	},
	{
		title: 'Años de experiencia',
		type: 'text',
		value: '',
		disabled: true,
		name: 'experience',
	},
	{
		title: 'Certificaciones de auditoría',
		type: 'text',
		value: '',
		disabled: true,
		name: 'auditCertifications',
	},
	{
		title: 'Horario de trabajo',
		type: 'text',
		value: '',
		disabled: true,
		name: 'workhours',
	},
	{
		title: 'Disponibilidad de proyectos',
		type: 'text',
		value: '',
		disabled: true,
		name: 'availability',
	},
	{
		title: 'Idiomas',
		type: 'text',
		value: '',
		disabled: true,
		name: 'english',
	},
	{
		title: 'Estado',
		type: 'text',
		value: '',
		disabled: true,
		name: 'status',
	},
	{
		title: 'Tipo de contrato',
		type: 'text',
		value: '',
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