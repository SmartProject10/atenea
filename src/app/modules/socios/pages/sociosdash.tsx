import React from 'react';
import { Developers } from './develop/developers'
import { Auditors } from './pauditor/audi'
import { Partners } from './others/partners'


export function Socios() {
    const [activeTab, setActiveTab] = React.useState('kt_tab_pane_1');

    const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    return (
        <div className="socios-dash w-100">
            <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'kt_tab_pane_1' ? 'active' : ''} btn-active-light-secondary`}
                        onClick={(e) => handleTabClick(e, 'kt_tab_pane_1')}
                        href="#kt_tab_pane_1"
                    >
                        Programadores
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'kt_tab_pane_2' ? 'active' : ''} btn-active-light-secondary`}
                        onClick={(e) => handleTabClick(e, 'kt_tab_pane_2')}
                        href="#kt_tab_pane_2"
                    >
                        Auditores
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'kt_tab_pane_3' ? 'active' : ''} btn-active-light-secondary`}
                        onClick={(e) => handleTabClick(e, 'kt_tab_pane_3')}
                        href="#kt_tab_pane_3"
                    >
                        Otros Socios
                    </a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div
                    className={`tab-pane fade ${activeTab === 'kt_tab_pane_1' ? 'active show' : ''}`}
                    id="kt_tab_pane_1"
                    role="tabpanel"
                >
                    <Developers />
                </div>
                <div
                    className={`tab-pane fade ${activeTab === 'kt_tab_pane_2' ? 'active show' : ''}`}
                    id="kt_tab_pane_2"
                    role="tabpanel"
                >
                    <Auditors />
                </div>
                <div
                    className={`tab-pane fade ${activeTab === 'kt_tab_pane_3' ? 'active show' : ''}`}
                    id="kt_tab_pane_3"
                    role="tabpanel"
                >
                    <Partners />
                </div>
            </div>
        </div>
    );
}