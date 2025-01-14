import React from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './profileview.scss';

export const ProfileView: React.FC = () => {
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
        profile: "Cumplido"
    };

    const productivityData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Horas Trabajadas',
                data: [40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90, 85],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

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
                            <span className="fw-bolder fs-6 text-dark">{profileData.systems}</span>
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
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">Título dentro del proyecto</label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-dark">{profileData.profile}</span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <Bar data={productivityData} />
                    </div>
                </div>
            </div>
        </div>
    );
};