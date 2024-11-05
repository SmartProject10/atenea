import './FichaUsuario.scss'

import { BankRegister } from './bank-register'
import { PersonalInformation } from './personal-information'
import { FamilyPayments } from './family-payments'
import { PayHistory } from './pay-history'

export function FichaUsuario() {
	return (
		<div className="ficha-usuario w-100">
			<div className="d-flex flex-column align-items-center w-100">
				<img
					src="https://placeholder.co/200.png"
					alt=""
					className="rounded-circle border border-info border-4"
				/>

				<p className="fw-bold fs-1 mt-5 mb-2">Abel Castillo</p>
				<p className="fw-bold fs-4 text-muted">Socio programador</p>

			</div>

			<ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
				<li className="nav-item">
					<a
						className="nav-link active btn-active-light-secondary"
						data-bs-toggle="tab"
						href="#kt_tab_pane_1"
					>
						Información laboral y personal
					</a>
				</li>

				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_2"
					>
						Registro bancario
					</a>
				</li>

				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_3"
					>
						Pagos a familiares
					</a>
				</li>

				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_4"
					>
						Historial de pagos
					</a>
				</li>

			</ul>

			<div className="tab-content" id="myTabContent">
				<div
					className="tab-pane fade active show"
					id="kt_tab_pane_1"
					role="tabpanel"
				>
					<PersonalInformation />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_2"
					role="tabpanel"
				>
					<BankRegister />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_3"
					role="tabpanel"
				>
					<FamilyPayments />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_4"
					role="tabpanel"
				>
					<PayHistory />
				</div>
			</div>
		</div>
	)
}
