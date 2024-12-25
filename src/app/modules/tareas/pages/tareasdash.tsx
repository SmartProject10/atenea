import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface AddTaskModalProps {
    show: boolean;
    handleClose: () => void;
}

function AddTaskModal({ show, handleClose }: AddTaskModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nueva Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTaskName">
                        <Form.Label>Nombre de la tarea</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre de la tarea" />
                    </Form.Group>
                    <Form.Group controlId="formTaskHours">
                        <Form.Label>Horas de la tarea</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese las horas de la tarea" />
                    </Form.Group>
                    <Form.Group controlId="formDifficultyLevel">
                        <Form.Label>Nivel de dificultad</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nivel de dificultad" />
                    </Form.Group>
                    <Form.Group controlId="formProgrammerType">
                        <Form.Label>Tipo de programador</Form.Label>
                        <Form.Control as="select">
                            <option value="">Seleccione el tipo de programador</option>
                            <option value="artist"><strong>Artista:</strong> valor de 1.5 (vistas front)</option>
                            <option value="obsesionado"><strong>Obsesionado:</strong> valor de 1.3 (el 20% de los programadores)</option>
                            <option value="innovador"><strong>Innovador:</strong> valor de 1.2 (los que mejoran el sistema)</option>
                            <option value="dedicado">Dedicado (los que cumplen con el tiempo)</option>
                            <option value="comprometido">Comprometido (los últimos 10% de los programadores, con posibilidad de salir del proyecto)</option>
                            <option value="realiza_por_compromiso">Realiza por compromiso</option>
                            <option value="el_demoron">El demorón</option>
                            <option value="todos">Todos</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formProgrammerSearch">
                        <Form.Label>Buscar programador</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="Buscar al programador(s)" />
                            <InputGroup.Text>
                                <Button variant="outline-secondary">
                                    <FaSearch />
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formExperienceYears">
                        <Form.Label>Años de experiencia</Form.Label>
                        <Form.Control type="number" placeholder="Aquí cargan los años de exp del programador, ej. (5)" disabled />
                    </Form.Group>
                    <Form.Group controlId="formAssignmentDate">
                        <Form.Label>Fecha de asignación</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="formDueDate">
                        <Form.Label>Fecha de vencimiento</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="formLastDate">
                        <Form.Label>Última fecha</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="formPriority">
                        <Form.Label>Prioridad</Form.Label>
                        <Form.Control as="select">
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formAttachment">
                        <Form.Label>Archivo adjunto</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function Tareas() {
    const [showModal, setShowModal] = useState(false);

    const tasksData = [
        {
            id: 1,
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
            attachment: 'api-docs.pdf'
        },
        {
            id: 2,
            taskName: 'Diseñar UI',
            taskHours: 20,
            difficultyLevel: 'Alta',
            programmerType: 'Frontend',
            programmer: 'María López',
            experienceYears: 3,
            assignmentDate: '2023-02-01',
            dueDate: '2023-02-20',
            lastDate: '2023-02-18',
            priority: 'Media',
            attachment: 'ui-design.pdf'
        }
    ];

    const systemsData = [
        {
            systemName: 'ISO 45001',
            country: 'País',
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
                                <th>Nombre de la tarea</th>
                                <th>Horas de la tarea</th>
                                <th>Nivel de dificultad</th>
                                <th>Tipo de programador</th>
                                <th>Programador</th>
                                <th>Años de experiencia</th>
                                <th>Fecha de asignación</th>
                                <th>Fecha de vencimiento</th>
                                <th>Última fecha</th>
                                <th>Prioridad</th>
                                <th>Archivo adjunto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksData.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
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
                                    <td>{task.attachment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive my-16">
                    <h5>Módulos asignados</h5>
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
                                <th>Nombre de sistema</th>
                                <th>País</th>
                                <th>Programador</th>
                                <th>Tipo de tarea</th>
                                <th>Nombre de la tarea</th>
                                <th>Prioridad</th>
                                <th>Dificultad</th>
                                <th>Fecha de inicio</th>
                                <th>Fecha de vencimiento</th>
                                <th>Estado</th>
                                <th>Aprobado por</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksData.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.programmerType}</td>
                                    <td>{task.programmer}</td>
                                    <td>{task.programmerType}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.difficultyLevel}</td>
                                    <td>{task.assignmentDate}</td>
                                    <td>{task.dueDate}</td>
                                    <td>En Proceso</td>
                                    <td>Admin</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive my-16">
                    <h5>Sistemas en proceso</h5>
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
                                <th>Nombre del sistema</th>
                                <th>País</th>
                                <th>Usuario</th>
                                <th>Estado</th>
                                <th>Porcentaje auditor</th>
                                <th>Porcentaje Programador</th>
                                <th>Front-Tareas (%)</th>
                                <th>Back-Tareas (%)</th>
                                <th>Mobile-Tareas (%)</th>
                                <th>RV-Tareas (%)</th>
                                <th>IA-Tareas (%)</th>
                                <th>Fecha final proyecto</th>
                                <th>Estado Proyecto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemsData.map((system, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{system.systemName}</td>
                                    <td>{system.country}</td>
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
            <AddTaskModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}
