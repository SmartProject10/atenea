import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './rankingdesign.scss';

// Configuración de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export function Ranking() {
    const navigate = useNavigate();

    const totalHoursData = {
        labels: ['Cristian', 'Max', 'Airton', 'Maria', 'Patricia'],
        datasets: [
            {
                label: 'Horas Totales Acumuladas',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [1000, 900, 850, 800, 750],
            },
        ],
    };

    const myHoursData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
            {
                label: 'Mis Horas Trabajadas',
                backgroundColor: 'rgba(255,99,132,1)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [160, 170, 180, 175, 190],
            },
        ],
    };

    const myLastMonthHoursData = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Mis Horas Trabajadas en el Último Mes',
                backgroundColor: 'rgba(54,162,235,1)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54,162,235,0.4)',
                hoverBorderColor: 'rgba(54,162,235,1)',
                data: [40, 42, 38, 45],
            },
        ],
    };

    const totalProgrammersHours = 1000 + 900 + 850 + 800 + 750;

    const hoursData = [
        { id: 1, programmer: 'Cristian', module: 'Módulo 1', task: 'Tarea A', hours: 10, date: '2023-01-01', supervisor: 'Juan', difficulty: 'Alta', area: 'Front' },
        { id: 2, programmer: 'Max', module: 'Módulo 2', task: 'Tarea B', hours: 8, date: '2023-01-02', supervisor: 'Ana', difficulty: 'Media', area: 'Back' },
        { id: 3, programmer: 'Airton', module: 'Módulo 3', task: 'Tarea C', hours: 12, date: '2023-01-03', supervisor: 'Luis', difficulty: 'Baja', area: 'Mobile' },
        { id: 4, programmer: 'Maria', module: 'Módulo 4', task: 'Tarea D', hours: 7, date: '2023-01-04', supervisor: 'Carlos', difficulty: 'Alta', area: 'Front' },
        { id: 5, programmer: 'Patricia', module: 'Módulo 5', task: 'Tarea E', hours: 9, date: '2023-01-05', supervisor: 'Sofia', difficulty: 'Media', area: 'Back' },
    ];

    return (
        <div className="ranking-page">
            <h1>Ranking y Estadísticas de Programadores</h1>
            <p>En esta sección, puede ver y gestionar las horas trabajadas por los programadores. Utilice los filtros para buscar y exportar la información relevante.</p>
            <div className="separator my-10"></div>

            <div className="filters mb-3">
                <div className="row">
                    <div className="col">
                        <input type="text" placeholder="Buscar..." className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <select className="form-control form-control-sm">
                            <option value="">Programador</option>
                            <option value="Cristian">Cristian</option>
                            <option value="Max">Max</option>
                            <option value="Airton">Airton</option>
                            <option value="Maria">Maria</option>
                            <option value="Patricia">Patricia</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="date" className="form-control form-control-sm" placeholder="Fecha desde" />
                    </div>
                    <div className="col">
                        <input type="date" className="form-control form-control-sm" placeholder="Fecha hasta" />
                    </div>
                    <div className="col">
                        <button className="btn btn-secondary btn-sm">Exportar</button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                            <th className="min-w-50px">N°</th>
                            <th className="min-w-100px">Programador</th>
                            <th className="min-w-150px">Módulo</th>
                            <th className="min-w-200px">Tarea</th>
                            <th className="min-w-100px">Horas</th>
                            <th className="min-w-100px">Fecha</th>
                            <th className="min-w-150px">Supervisor</th>
                            <th className="min-w-150px">Dificultad</th>
                            <th className="min-w-150px">Área</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hoursData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.programmer}</td>
                                <td>{item.module}</td>
                                <td>{item.task}</td>
                                <td>{item.hours}</td>
                                <td>{item.date}</td>
                                <td>{item.supervisor}</td>
                                <td>{item.difficulty}</td>
                                <td>{item.area}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Horas Totales Acumuladas por Programador</h3>
                <Bar data={totalHoursData} options={{ indexAxis: 'y' }} />
            </div>

            <div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Mis Horas Trabajadas</h3>
                <Line data={myHoursData} />
            </div>

            <div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Mis Horas Trabajadas en el Último Mes</h3>
                <Bar data={myLastMonthHoursData} options={{ indexAxis: 'y' }} />
            </div>

            <div className="chart-container mt-4" style={{ width: '60%', margin: '0 auto' }}>
                <h3>Total de Horas entre Todos los Programadores</h3>
                <p>{totalProgrammersHours} horas</p>
            </div>
        </div>
    );
}
