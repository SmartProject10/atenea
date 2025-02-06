import React, { useState } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface AddTaskModalProps {
    show: boolean;
    handleClose: () => void;
}

function AddTaskModal({ show, handleClose }: AddTaskModalProps) {
    const [validated, setValidated] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nueva Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formCountry">
                        <Form.Label>País</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">Seleccione el país</option>
                            <option value="Peru">Peru</option>
                            <option value="Chile">Chile</option>
                            <option value="Argentina">Argentina</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione un país.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formSystemName">
                        <Form.Label>Nombre del sistema</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">Seleccione el sistema</option>
                            <option value="ISO 45001">ISO 45001</option>
                            <option value="ISO 9001">ISO 9001</option>
                            <option value="ISO 14001">ISO 14001</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione un sistema.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formTaskName">
                        <Form.Label>Nombre de la tarea</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre de la tarea" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese el nombre de la tarea.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formTaskDescription">
                        <Form.Label>Descripción de la tarea</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción de la tarea" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese la descripción de la tarea.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formProgrammingType">
                        <Form.Label>Tipo de Programación</Form.Label>
                        <div>
                            {['Back', 'Front', 'Mobile', 'IA', 'Data'].map(type => {
                                const isSelected = selectedTypes.includes(type);
                                
                                return !isSelected && (
                                    <Button
                                        key={type}
                                        onClick={() => {
                                            if (!selectedTypes.includes(type)) {
                                                setSelectedTypes([...selectedTypes, type]);
                                            }
                                        }}
                                        style={{ marginRight: 8, marginBottom: 8 }}
                                    >
                                        {type}
                                    </Button>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 8 }}>
                            {selectedTypes.map((type: string) => (
                                <Badge 
                                    key={type} 
                                    pill 
                                    bg="primary" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => {
                                        setSelectedTypes(selectedTypes.filter((t: string) => t !== type));
                                    }}
                                >
                                    {type} &times;
                                </Badge>
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formAssignmentDate">
                        <Form.Label>Fecha de asignación</Form.Label>
                        <Form.Control type="date" defaultValue={new Date().toISOString().split('T')[0]} readOnly required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese la fecha de asignación.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formPriority">
                        <Form.Label>Dependencia</Form.Label>
                        <Form.Control as="select" required>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione una dependencia.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formAttachment">
                        <Form.Label>Archivo adjunto</Form.Label>
                        <Form.Control type="file" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor adjunte un archivo.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export function TasksPage() {
    const [showModal, setShowModal] = useState(false);

    const tasksData = [
        {
            id: 1,
            country: 'Perú',
            namesystem: 'ISO 45001',
            taskName: 'Implementar API',
            taskHours: 10,
            difficultyLevel: 'Media',
            programmerType: 'Backend',
            programmer: 'Juan Pérez',
            experienceYears: 5,
            assignmentDate: '2023-01-01',
            dueDate: '2023-01-15',
            lastDate: '2023-01-10',
            priority: 'Alta',
            difficulty: 'Intermedia',
            attachment: 'api-docs.pdf'
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
                                <th>Horas de la tarea</th>
                                <th>Nivel de dificultad</th>
                                <th>Tipo de tarea</th>
                                <th>Programador</th>
                                <th>Años de experiencia</th>
                                <th>Fecha de asignación</th>
                                <th>Fecha de vencimiento</th>
                                <th>Última fecha</th>
                                <th>Prioridad</th>
                                <th>Dificultad</th>
                                <th>Archivo adjunto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksData.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.country}</td>
                                    <td>{task.namesystem}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.taskHours}</td>
                                    <td>{task.difficultyLevel}</td>
                                    <td>{task.programmerType}</td>
                                    <td>{task.programmer}</td>
                                    <td>{task.experienceYears}</td>
                                    <td>{task.assignmentDate}</td>
                                    <td>{task.dueDate}</td>
                                    <td>{task.lastDate}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.difficulty}</td>
                                    <td>{task.attachment}</td>
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