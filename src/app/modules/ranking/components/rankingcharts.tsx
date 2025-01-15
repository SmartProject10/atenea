import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

interface RankingChartsProps {
    totalHoursData: any;
    myHoursData: any;
    myLastMonthHoursData: any;
    totalProgrammersHours: number;
}

export const RankingCharts: React.FC<RankingChartsProps> = ({
    totalHoursData,
    myHoursData,
    totalProgrammersHours
}) => {
    return (
        <>
            <div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Horas Totales Acumuladas por Programador</h3>
                <Bar data={totalHoursData} options={{ indexAxis: 'y' }} />
            </div>

            <div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Mis Horas Trabajadas</h3>
                <Line data={myHoursData} />
            </div>

            <div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Total de Horas entre Todos los Programadores</h3>
                <p>{totalProgrammersHours} horas</p>
            </div>
        </>
    );
};