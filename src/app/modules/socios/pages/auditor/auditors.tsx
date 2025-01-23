import React, { useState } from 'react';
import { Partner } from './partner';
import { NewPartner } from './newpartner';

export const Auditors: React.FC = () => {
    const [activeTab, setActiveTab] = useState('kt_tab_pane_1');

    const handleTabClick = (e: React.MouseEvent, tabId: string) => {
        e.preventDefault();
        setActiveTab(tabId);
    };

    return (
        <div className="socios-dash w-100">
            <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'kt_tab_pane_1' ? 'active' : ''} btn-active-light-secondary`}
                        onClick={(e) => handleTabClick(e, 'kt_tab_pane_1')}
                        href="./partner"
                    >
                        Auditores activos
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'kt_tab_pane_2' ? 'active' : ''} btn-active-light-secondary`}
                        onClick={(e) => handleTabClick(e, 'kt_tab_pane_2')}
                        href="./newpartner"
                    >
                        Nuevos postulantes
                    </a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div
                    className={`tab-pane fade ${activeTab === 'kt_tab_pane_1' ? 'active show' : ''}`}
                    id="kt_tab_pane_1"
                    role="tabpanel"
                >
                    <Partner/>
                </div>
                <div
                    className={`tab-pane fade ${activeTab === 'kt_tab_pane_2' ? 'active show' : ''}`}
                    id="kt_tab_pane_2"
                    role="tabpanel"
                >
                    <NewPartner />
                </div>
            </div>
        </div>
    );
};