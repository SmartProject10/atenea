import React, { useState, useEffect } from 'react';
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
    const [hoursData, setHoursData] = useState<HoursData[]>([]);

    useEffect(() => {
        // Fetch data from backend
        fetch('/api/hoursData')
            .then(response => response.json())
            .then(data => setHoursData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
