import { Developers } from './develop/developers'
import { Auditors } from './auditor/auditors'
import { Partners } from './others/partners'


export function Socios() {
    return (
        <div className="socios-dash w-100">
            <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
                <li className="nav-item">
                    <a
                        className="nav-link active btn-active-light-secondary"
                        data-bs-toggle="tab"
                        href="#kt_tab_pane_1"
                    >
                        Programadores
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link btn-active-light-secondary"
                        data-bs-toggle="tab"
                        href="#kt_tab_pane_2"
                    >
                        Auditores
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link btn-active-light-secondary"
                        data-bs-toggle="tab"
                        href="#kt_tab_pane_3"
                    >
                        Otros Socios
                    </a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade active show"
                    id="kt_tab_pane_1"
                    role="tabpanel"
                >
                    <Developers />
                </div>
                <div
                    className="tab-pane fade"
                    id="kt_tab_pane_2"
                    role="tabpanel"
                >
                    <Auditors />
                </div>
                <div
                    className="tab-pane fade"
                    id="kt_tab_pane_3"
                    role="tabpanel"
                >
                    <Partners />
                </div>
            </div>
        </div>
    )
}