import './FichaUsuario.scss'
import { BankRegister } from './bank-register'
import { FamilyPayments } from './family-payments'
import { PayHistory } from './pay-history'
import { PersonalDataSection } from './personal-data'
import { Recibos } from './recibos'
import { Sistemas } from './sistemas'
import  Security  from './security'

export function FichaUsuario() {
	return (
		<div className="ficha-usuario w-100">
			<div className="d-flex flex-column align-items-center w-100 position-relative">
				<img
					src="URL_DE_LA_IMAGEN"
					alt="Profile"
					className="rounded-circle border border-info border-4"
				/>
				<button
					className="btn btn-secondary position-absolute"
					style={{ bottom: '10px', right: '10px' }}
					onClick={() => alert('Change profile picture')}
				>
					<i className="bi bi-camera"></i>
				</button>

				<p className="fw-bold fs-1 mt-5 mb-2">NOMBRE_USUARIO</p>
				<p className="fw-bold fs-4 text-muted">ROL_USUARIO</p>
			</div>

			<ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
				<li className="nav-item">
					<a
						className="nav-link active btn-active-light-secondary"
						data-bs-toggle="tab"
						href="#kt_tab_pane_1"
					>
						Datos personales
					</a>
				</li>

				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_3"
					>
						Registro bancario
					</a>
				</li>

				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_4"
					>
						Pagos a familiares
					</a>
				</li>

				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_5"
					>
						Historial de pagos
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_6"
					>
						Recibos
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_7"
					>
						Sistemas
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						data-bs-toggle="tab"
						href="#kt_tab_pane_8"
					>
						Seguridad
					</a>
				</li>

			</ul>

			<div className="tab-content" id="myTabContent">
				<div
					className="tab-pane fade active show"
					id="kt_tab_pane_1"
					role="tabpanel"
				>
					<PersonalDataSection />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_3"
					role="tabpanel"
				>
					<BankRegister />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_4"
					role="tabpanel"
				>
					<FamilyPayments />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_5"
					role="tabpanel"
				>
					<PayHistory />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_6"
					role="tabpanel"
				>
					<Recibos />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_7"
					role="tabpanel"
				>
					<Sistemas />
				</div>
				<div
					className="tab-pane fade"
					id="kt_tab_pane_8"
					role="tabpanel"
				>
					<Security />
				</div>
			</div>
		</div>
	)
}
