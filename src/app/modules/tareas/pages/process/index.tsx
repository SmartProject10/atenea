import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SystemData {
    country: string;
    systemName: string;
    user: string;
    status: string;
    auditorPercentage: number;
    programmerPercentage: number;
    frontTasks: number;
    backTasks: number;
    mobileTasks: number;
    rvTasks: number;
    iaTasks: number;
    projectEndDate: string;
    projectStatus: string;
}

const systemsData: SystemData[] = [
    // Aquí puedes agregar tus datos de ejemplo
    {
        country: 'Peru',
        systemName: 'Sistema de ventas',
        user: 'Juan Perez',
        status: 'En proceso',
        auditorPercentage: 50,
        programmerPercentage: 50,
        frontTasks: 50,
        backTasks: 50,
        mobileTasks: 50,
        rvTasks: 50,
        iaTasks: 50,
        projectEndDate: '2021-10-10',
        projectStatus: 'En proceso',
    },
];

export function ProcessPage() {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="card">
            <div className="card-body">
                <div className="table-responsive my-16">
                    <h5>Sistemas en proceso</h5>
                    <div className="filters mb-3">
                        <div className="row">
                            <div className="col">
                                <input 
                                    type="text" 
                                    placeholder="Buscar..." 
                                    className="form-control form-control-sm" 
                                />
                            </div>
                            <div className="col">
                                <select className="form-control form-control-sm">
                                    <option value="">País</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Chile">Chile</option>
                                    <option value="Argentina">Argentina</option>
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-control form-control-sm">
                                    <option value="">Tipo</option>
                                    <option value="comprado">Comprado</option>
                                    <option value="alquiler">Alquiler</option>
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-control form-control-sm">
                                    <option value="">Estado</option>
                                    <option value="cancelado">Cancelado</option>
                                    <option value="1 comisión">1 Comisión</option>
                                    <option value="pendiente">Pendiente</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>País</th>
                                <th>Nombre del sistema</th>
                                <th>Usuario</th>
                                <th>Estado</th>
                                <th>Porcentaje auditor</th>
                                <th>Porcentaje Programador</th>
                                <th>Front (%)</th>
                                <th>Back (%)</th>
                                <th>Mobile (%)</th>
                                <th>Data (%)</th>
                                <th>IA (%)</th>
                                <th>Fecha final proyecto</th>
                                <th>Estado Proyecto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemsData.map((system, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{system.country}</td>
                                    <td>{system.systemName}</td>
                                    <td>{system.user}</td>
                                    <td>{system.status}</td>
                                    <td>{system.auditorPercentage}%</td>
                                    <td>{system.programmerPercentage}%</td>
                                    <td>{system.frontTasks}%</td>
                                    <td>{system.backTasks}%</td>
                                    <td>{system.mobileTasks}%</td>
                                    <td>{system.rvTasks}%</td>
                                    <td>{system.iaTasks}%</td>
                                    <td>{system.projectEndDate}</td>
                                    <td>{system.projectStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProcessPage;