import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface AddTaskModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedProgrammer: (programmer: Programmer) => void;
}

interface Programmer {
    id: number;
    name: string;
    country: string;
    system: string;
    rank: string;
    status: string;
    totalHours: number;
}

function BossPage() {
    const [showModal, setShowModal] = useState(false);
    const [programmers, setProgrammers] = useState<Programmer[]>([]);
    const [selectedProgrammer, setSelectedProgrammer] = useState<Programmer | null>(null);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSave = () => {
        if (selectedProgrammer) {
            setProgrammers([...programmers, selectedProgrammer]);
            setSelectedProgrammer(null);
            handleCloseModal();
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShowModal}>
                Asignar Líder
            </Button>
            <AddTaskModal
                show={showModal}
                handleClose={handleCloseModal}
                setSelectedProgrammer={setSelectedProgrammer}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>País</th>
                        <th>Sistema</th>
                        <th>Rango</th>
                        <th>Estado</th>
                        <th>Horas totales trabajadas</th>
                        <th>Ver Perfil</th>
                    </tr>
                </thead>
                <tbody>
                    {programmers.map((programmer, index) => (
                        <tr key={index}>
                            <td>{programmer.name}</td>
                            <td>{programmer.country}</td>
                            <td>{programmer.system}</td>
                            <td>{programmer.rank}</td>
                            <td>{programmer.status}</td>
                            <td>{programmer.totalHours}</td>
                            <td>
                                <Link to={`/profile/${programmer.id}`}>
                                    <Button variant="info">Ver Perfil</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AddTaskModal({ show, handleClose, setSelectedProgrammer }: AddTaskModalProps) {
    const [id, setId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [system, setSystem] = useState('');
    const [experience, setExperience] = useState<number | null>(null);
    const [rank, setRank] = useState('');
    const [status, setStatus] = useState('');
    const [totalHours, setTotalHours] = useState<number | null>(null);

    const [validated, setValidated] = useState(false);

    const handleSearchProgrammer = () => {
        // This function should be implemented to search for a programmer from a real data source
    };

    const handleSave = () => {
        if (id !== null && experience !== null && totalHours !== null && name && country && system && rank && status) {
            setSelectedProgrammer({
                id,
                name,
                country,
                system,
                rank,
                status,
                totalHours,
            });
            handleClose();
        } else {
            setValidated(true);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Asignar Líder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated}>
                    <h5>País y sistema a asignar como líder</h5>
                    <Form.Group controlId="formCountry">
                        <Form.Label>País</Form.Label>
                        <Form.Control as="select" value={country} onChange={(e) => setCountry(e.target.value)} required>
                            <option value="">Seleccione el país</option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione un país.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formSystem">
                        <Form.Label>Sistema</Form.Label>
                        <Form.Control as="select" value={system} onChange={(e) => setSystem(e.target.value)} required>
                            <option value="">Seleccione el sistema</option>
                            <option value="Sistema A">Sistema A</option>
                            <option value="Sistema B">Sistema B</option>
                            <option value="Sistema C">Sistema C</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione un sistema.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <h5>Programador a asignar</h5>
                    <Form.Group controlId="formProgrammerSearch">
                        <Form.Label>Buscar Programador</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre del programador"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <InputGroup.Text>
                                <Button variant="outline-secondary" onClick={handleSearchProgrammer}>
                                    <FaSearch />
                                </Button>
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                Por favor ingrese el nombre del programador.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formRank">
                        <Form.Label>Rango</Form.Label>
                        <Form.Control as="select" value={rank} onChange={(e) => setRank(e.target.value)} disabled={!experience} required>
                            <option value="">Aquí carga el rango</option>
                            <option value="plata">Plata</option>
                            <option value="oro">Oro</option>
                            <option value="diamante">Diamante</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione un rango.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formStatus">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} disabled={!experience} required>
                            <option value="">Aquí se ve el estado</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione un estado.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formTotalHours">
                        <Form.Label>Horas totales trabajadas</Form.Label>
                        <Form.Control type="number" value={totalHours ?? ''} onChange={(e) => setTotalHours(Number(e.target.value))} disabled required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese las horas totales trabajadas.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BossPage;
