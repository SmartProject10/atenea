import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

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
                    <Form.Group controlId="formSystemName">
                        <Form.Label>Nombre del sistema</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre del sistema" />
                    </Form.Group>
                    <Form.Group controlId="formCountry">
                        <Form.Label>País</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el país" />
                    </Form.Group>
                    <Form.Group controlId="formProgrammer">
                        <Form.Label>Programador designado</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre del programador" />
                    </Form.Group>
                    <Form.Group controlId="formSpecialty">
                        <Form.Label>Especialidad de la tarea</Form.Label>
                        <Form.Control as="select">
                            <option value="back">Back</option>
                            <option value="front">Front</option>
                            <option value="mobile">Mobile</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formTaskName">
                        <Form.Label>Nombre de la tarea</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre de la tarea" />
                    </Form.Group>
                    <Form.Group controlId="formPriority">
                        <Form.Label>Prioridad</Form.Label>
                        <Form.Control as="select">
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDifficulty">
                        <Form.Label>Dificultad</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese la dificultad" />
                    </Form.Group>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="formEndDate">
                        <Form.Label>Fecha final</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el estado" />
                    </Form.Group>
                    <Form.Group controlId="formSupervisor">
                        <Form.Label>Supervisor</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre del supervisor" />
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
            systemName: 'Sistema A',
            country: 'Perú',
            programmer: 'Juan Pérez',
            specialty: 'back',
            taskName: 'Implementar API',
            priority: 'Alta',
            difficulty: 'Media',
            startDate: '2023-01-01',
            endDate: '2023-01-15',
            status: 'En progreso',
            supervisor: 'Ana Gómez'
        },
        {
            id: 2,
            systemName: 'Sistema B',
            country: 'Chile',
            programmer: 'María López',
            specialty: 'front',
            taskName: 'Diseñar UI',
            priority: 'Media',
            difficulty: 'Alta',
            startDate: '2023-02-01',
            endDate: '2023-02-20',
            status: 'Pendiente',
            supervisor: 'Carlos Ruiz'
        }
    ];

    const handleNewTask = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="card">
            <div className="card-header align-items-center">
                <h5 className="card-title flex-1 align-items-center">Asignación de Tareas</h5>
                <button className="btn btn-primary btn-sm" onClick={handleNewTask}>
                    Agregar Tarea
                </button>
            </div>
            <div className="card-body">
                <div className="table-responsive my-16">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nombre del sistema</th>
                                <th>País</th>
                                <th>Programador designado</th>
                                <th>Especialidad de la tarea</th>
                                <th>Nombre de la tarea</th>
                                <th>Prioridad</th>
                                <th>Dificultad</th>
                                <th>Fecha de inicio</th>
                                <th>Fecha final</th>
                                <th>Estado</th>
                                <th>Supervisor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksData.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.systemName}</td>
                                    <td>{task.country}</td>
                                    <td>{task.programmer}</td>
                                    <td>{task.specialty}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.difficulty}</td>
                                    <td>{task.startDate}</td>
                                    <td>{task.endDate}</td>
                                    <td>{task.status}</td>
                                    <td>{task.supervisor}</td>
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