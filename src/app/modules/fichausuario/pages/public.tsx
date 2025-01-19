import React from 'react';
import { useParams } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';

export const PubProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    // Mock data for demonstration purposes
    const profileData = {
        name: "Juan Pérez",
        country: "México",
        systems: ["Sistema A", "Sistema B", "Sistema C"],
        technicalProfile: "Full Stack",
        joinDate: "01/01/2020",
        hoursLastTwoMonths: 160,
        totalHours: 1200,
        tasksCompleted: 50,
        rank: "Diamante"
    };

    const radarData = {
        labels: ['Back', 'Front', 'Mobile', 'Data', 'Otros'],
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

    return (
        <div className="perfil-programador">
            <div className="card mb-5 mb-xl-10">
                <div className="card-header">
                    <div className="card-title m-0">
                        <h3 className="fw-bolder m-0">Tus detalles personales</h3>
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
                                <label className="col-lg-4 fw-bold text-muted">Sistemas Trabajados</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.systems.join(', ')}</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">Perfil Técnico</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">{profileData.technicalProfile}</span>
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
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="radar-container">
                                <Radar data={radarData} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className="mt-3">
                                <span className="fw-bolder fs-6 text-dark"># de Tareas Cumplidas: {profileData.tasksCompleted}</span>
                            </div>
                            <div className="mt-3">
                                <i className="fas fa-gem" style={{ color: 'blue', fontSize: '2rem' }}></i> <br />
                                <span className="fw-bolder fs-6 text-dark">Rango: {profileData.rank}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};