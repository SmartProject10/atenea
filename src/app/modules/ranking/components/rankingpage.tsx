import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RankingTable } from './rankingtable';
import { RankingModal } from './rankingmodal';
import './rankingdesign.scss';

interface HoursData {
    id: number;
    programmer: string;
    module: string;
    country: string;
    supervisor: string;
    entryDate: string;
    lastMonthHours: number;
    totalHours: number;
}

export function Ranking() {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    const [hoursData] = useState<HoursData[]>([
        { id: 1, programmer: 'Cristian', module: 'Módulo 1', country: 'Perú', supervisor: 'Juan', entryDate: '2022-01-01', lastMonthHours: 40, totalHours: 1000 },
        { id: 2, programmer: 'Max', module: 'Módulo 2', country: 'Ecuador', supervisor: 'Ana', entryDate: '2022-02-01', lastMonthHours: 42, totalHours: 900 },
        { id: 3, programmer: 'Airton', module: 'Módulo 3', country: 'Ecuador', supervisor: 'Luis', entryDate: '2022-03-01', lastMonthHours: 38, totalHours: 850 },
        { id: 4, programmer: 'Maria', module: 'Módulo 4', country: 'Ecuador', supervisor: 'Carlos', entryDate: '2022-04-01', lastMonthHours: 45, totalHours: 800 },
        { id: 5, programmer: 'Patricia', module: 'Módulo 5', country: 'Ecuador', supervisor: 'Sofia', entryDate: '2022-05-01', lastMonthHours: 40, totalHours: 750 }
    ]);

    const handleRowClick = (data: HoursData) => {
        setModalData({
            country: 'España',
            year: '2023',
            system: data.module,
            programmers: [data.programmer],
            totalHours: data.totalHours
        });
        setModalShow(true);
    };

    return (
        <div className="ranking-page">
            <h1>Programadores</h1>
            <p>En esta sección, puede ver las horas trabajadas por los programadores.</p>
            <div className="separator my-10"></div>

            <RankingTable 
                hoursData={hoursData} 
                onRowClick={handleRowClick}
            />

            <RankingModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={modalData}
            />
        </div>
    );
}

export default Ranking;
