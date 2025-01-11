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
                <Modal.Title>Asignar Líder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTaskName">
                        <Form.Label>Nombre de la tarea</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre de la tarea" />
                    </Form.Group>
                    <Form.Group controlId="formProgrammerType">
                        <Form.Label>Título de programador</Form.Label>
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
                    <Form.Group controlId="formAssignmentDate">
                        <Form.Label>Fecha de asignación</Form.Label>
                        <Form.Control type="date" defaultValue={new Date().toISOString().split('T')[0]} readOnly />
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