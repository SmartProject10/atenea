import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import './profileview.scss';

export const ProfileView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    // Mock data for demonstration purposes
    const profileData = {
        name: "Juan Pérez",
        country: "México",
        technicalProfile: "Back-End Developer, Front-End Developer",
        phone: "1234567890",
        joinDate: "01/01/2020",
        hoursLastTwoMonths: 160,
        totalHours: 1200,
        tasksCompleted: 50,
        status: "Activo",
        rank: "Oro" // Changed rank to "Oro"
    };

    const radarData = {
        labels: ['Back', 'Front', 'Mobile', 'Data', 'IA'],
        datasets: [
            {
                label: 'Habilidades',
                data: [4, 3, 2, 5, 4],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const [filterMonth, setFilterMonth] = useState<string>('');

    const tasks = [
        { number: 1, name: 'Tarea 1', country: 'México', system: 'Sistema A', date: '01/01/2023' },
        { number: 2, name: 'Tarea 2', country: 'México', system: 'Sistema B', date: '02/01/2023' },
        // Add more tasks as needed
    ];

    const filteredTasks = tasks.filter(task => 
        filterMonth === '' || new Date(task.date).getMonth() + 1 === parseInt(filterMonth)
    );

    return (
        <div className="perfil-programador">
            <div className="card mb-5 mb-xl-10">
                <div className="card-header">
                    <div className="card-title m-0">
                        <h3 className="fw-bolder m-0">Detalles del Programador</h3>
                    </div>
                </div>
                <div className="card-body p-9">
                    <div className="row mb-7">
                        <div className="col-lg-8">
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Identificador</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{id}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Nombre</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.name}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">País</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.country}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Perfil Técnico</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.technicalProfile}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Teléfono</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.phone}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Fecha de Ingreso</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.joinDate}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Horas Trabajadas (Últimos 2 Meses)</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.hoursLastTwoMonths}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Horas Totales Trabajadas</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.totalHours}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Estado</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="radar-container">
                                <Radar data={radarData} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className="mt-3">
                                <span className="fw-bolder fs-6 text-dark"># de Tareas Cumplidas: {profileData.tasksCompleted}</span>
                            </div>
                            <div className="mt-3">
                                <i className="fas fa-medal" style={{ color: 'gold', fontSize: '2rem' }}></i> <br />
                                <span className="fw-bolder fs-6 text-dark">Rango: {profileData.rank}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h4 className="fw-bolder">TAREAS REALIZADAS</h4>
                        <div className="mb-3">
                            <label className="fw-bold text-muted">Filtrar por mes:</label>
                            <select 
                                className="form-select" 
                                value={filterMonth} 
                                onChange={(e) => setFilterMonth(e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nombre de tarea</th>
                                    <th>País</th>
                                    <th>Sistema</th>
                                    <th>Fecha de envio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map(task => (
                                    <tr key={task.number}>
                                        <td>{task.number}</td>
                                        <td>{task.name}</td>
                                        <td>{task.country}</td>
                                        <td>{task.system}</td>
                                        <td>{task.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
