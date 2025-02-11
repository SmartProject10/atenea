import React, { useState } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AddTaskModal from './modal';

export function TasksPage() {
    const [showModal, setShowModal] = useState(false);

    const tasksData = [
        {
            id: 1,
            country: 'Perú',
            namesystem: 'ISO 45001',
            taskName: 'Implementar API',
            taskDescription: 'Desarrollar la API para el sistema',
            dependency: 'Alta',
            requiredTechnologies: 'Backend',
            assignmentDate: '2023-01-01',
            dueDate: '2023-01-15',
            lastDate: '2023-01-10',
            state: 'En proceso',
            assignedTo: 'Juan Pérez',
            comments: 'Intermedia',
            materials: 'api-docs.pdf'
        }
    ];

    const systemsData = [
        {
            country: 'País',
            systemName: 'ISO 45001',
            user: 'Usuario',
            status: 'En proceso',
            auditorPercentage: 50,
            programmerPercentage: 70,
            frontTasks: 20,
            backTasks: 30,
            mobileTasks: 10,
            rvTasks: 5,
            iaTasks: 15,
            projectEndDate: '2023-12-31',
            projectStatus: 'En proceso'
        }
    ];

    const handleNewTask = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const exportToExcel = (data: any[], fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    };

    return (
        <div className="card">
            <div className="card-header align-items-center">
                <h5 className="card-title flex-1 align-items-center">Asignación de Tareas</h5>
                <div>
                    <button className="btn btn-primary btn-sm me-2" onClick={handleNewTask}>
                        Agregar Tarea
                    </button>
                    <button className="btn btn-success btn-sm" onClick={() => exportToExcel(tasksData, 'tareas.xlsx')}>
                        Exportar
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive my-16">
                    <h5>Tareas en Asignadas en Proceso</h5>
                    <div className="filters mb-3">
                        <div className="row">
                            <div className="col">
                                <input type="text" placeholder="Buscar..." className="form-control form-control-sm" />
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
                                <th>Nombre de la tarea</th>
                                <th>Descripción</th>
                                <th>Dependencia</th>
                                <th>Tecnologías requeridas</th>
                                <th>Fecha de asignación</th>
                                <th>Fecha de vencimiento</th>
                                <th>Última fecha</th>
                                <th>Estado</th>
                                <th>Asignado a</th>
                                <th>Comentarios</th>
                                <th>Materiales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksData.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.country}</td>
                                    <td>{task.namesystem}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.taskDescription}</td>
                                    <td>{task.dependency}</td>
                                    <td>{task.requiredTechnologies}</td>
                                    <td>{task.assignmentDate}</td>
                                    <td>{task.dueDate}</td>
                                    <td>{task.lastDate}</td>
                                    <td>{task.state}</td>
                                    <td>{task.assignedTo}</td>
                                    <td>{task.comments}</td>
                                    <td>{task.materials}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddTaskModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default TasksPage;
