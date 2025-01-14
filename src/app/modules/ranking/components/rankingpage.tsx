import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { RankingTable } from './rankingtable';
import { RankingCharts } from './rankingcharts';
import { RankingModal } from './rankingmodal';
import './rankingdesign.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface HoursData {
    id: number;
    programmer: string;
    module: string;
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
        { id: 1, programmer: 'Cristian', module: 'Módulo 1', supervisor: 'Juan', entryDate: '2022-01-01', lastMonthHours: 40, totalHours: 1000 },
        { id: 2, programmer: 'Max', module: 'Módulo 2', supervisor: 'Ana', entryDate: '2022-02-01', lastMonthHours: 42, totalHours: 900 },
        { id: 3, programmer: 'Airton', module: 'Módulo 3', supervisor: 'Luis', entryDate: '2022-03-01', lastMonthHours: 38, totalHours: 850 },
        { id: 4, programmer: 'Maria', module: 'Módulo 4', supervisor: 'Carlos', entryDate: '2022-04-01', lastMonthHours: 45, totalHours: 800 },
        { id: 5, programmer: 'Patricia', module: 'Módulo 5', supervisor: 'Sofia', entryDate: '2022-05-01', lastMonthHours: 40, totalHours: 750 }
    ]);

    const [totalHoursData] = useState({
        labels: ['Cristian', 'Max', 'Airton', 'Maria', 'Patricia'],
        datasets: [{
            label: 'Horas Totales Acumuladas',
            data: [1000, 900, 850, 800, 750],
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1
        }]
    });

    const [myHoursData] = useState({
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
            label: 'Mis Horas Trabajadas',
            data: [160, 170, 180, 175, 190],
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    });

    const [myLastMonthHoursData] = useState({
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Mis Horas Último Mes',
            data: [40, 42, 38, 45],
            backgroundColor: 'rgba(153,102,255,0.2)',
            borderColor: 'rgba(153,102,255,1)',
            borderWidth: 1
        }]
    });

    const totalProgrammersHours = totalHoursData.datasets[0].data.reduce((a, b) => a + b, 0);

    const handleChartClick = () => {
        setModalData({
            country: 'España',
            year: '2023',
            system: 'Sistema de Gestión',
            programmers: hoursData.map(data => data.programmer),
            totalHours: totalProgrammersHours
        });
        setModalShow(true);
    };

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
            <h1>Ranking y Estadísticas de Programadores</h1>
            <p>En esta sección, puede ver y gestionar las horas trabajadas por los programadores.</p>
            <div className="separator my-10"></div>

            <RankingTable 
                hoursData={hoursData} 
                onRowClick={handleRowClick}
            />
            
            <div onClick={handleChartClick}>
                <RankingCharts
                    totalHoursData={totalHoursData}
                    myHoursData={myHoursData}
                    myLastMonthHoursData={myLastMonthHoursData}
                    totalProgrammersHours={totalProgrammersHours}
                />
            </div>

            <RankingModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={modalData}
            />
        </div>
    );
}

export default Ranking;