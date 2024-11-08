import { EmploymentDataSection } from './sections/employment-data'
import { PersonalDataSection } from './sections/personal-data'
import { BundleSection } from './sections/bundles'

export function PersonalInformation() {
	return (
		<div className="row">
			<div className="col-sm-12 col-lg-3">
				<div className="position-sticky top-8">
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<a href="#personal-data">Datos Personales</a>
						</li>
						<li className="list-group-item">
							<a href="#employment-data">Datos Profesionales</a>
						</li>
						<li className="list-group-item">
							<a href="#bundles">Mis documentos</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-sm-12 col-lg-9">
				<PersonalDataSection />
				<EmploymentDataSection />
				<BundleSection />
			</div>
		</div>
	)
}
