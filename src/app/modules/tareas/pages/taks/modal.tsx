import React, { useState } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';

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
                            {/* Add options dynamically */}
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
                            {/* Add options dynamically */}
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
                    <Form.Group controlId="formDueDate">
                        <Form.Label>Fecha de vencimiento</Form.Label>
                        <Form.Control type="date" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese la fecha de vencimiento.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formLastDate">
                        <Form.Label>Última fecha</Form.Label>
                        <Form.Control type="date" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese la última fecha.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formPriority">
                        <Form.Label>Dependencia</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">Seleccione la dependencia</option>
                            {/* Add options dynamically 
                            ALTA, MEDIA, BAJA
                            */}
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

export default AddTaskModal;
