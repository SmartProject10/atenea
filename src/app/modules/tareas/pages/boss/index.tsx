import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface AddTaskModalProps {
    show: boolean;
    handleClose: () => void;
}

interface Programmer {
    name: string;
    country: string;
    system: string;
    experience: number;
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
                        <th>Años de experiencia</th>
                        <th>Rango</th>
                        <th>Estado</th>
                        <th>Horas totales trabajadas</th>
                    </tr>
                </thead>
                <tbody>
                    {programmers.map((programmer, index) => (
                        <tr key={index}>
                            <td>{programmer.name}</td>
                            <td>{programmer.country}</td>
                            <td>{programmer.system}</td>
                            <td>{programmer.experience}</td>
                            <td>{programmer.rank}</td>
                            <td>{programmer.status}</td>
                            <td>{programmer.totalHours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

interface AddTaskModalProps {
    show: boolean;
    handleClose: () => void;
    setSelectedProgrammer: (programmer: Programmer) => void;
}

function AddTaskModal({ show, handleClose, setSelectedProgrammer }: AddTaskModalProps) {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [system, setSystem] = useState('');
    const [experience, setExperience] = useState(0);
    const [rank, setRank] = useState('plata');
    const [status, setStatus] = useState('activo');
    const [totalHours, setTotalHours] = useState(0);

    const handleSearchProgrammer = () => {
        // Simulate searching and selecting a programmer
        const programmer = {
            name: 'John Doe',
            experience: 5,
            rank: 'oro',
            status: 'activo',
            totalHours: 2000,
        };
        setName(programmer.name);
        setExperience(programmer.experience);
        setRank(programmer.rank);
        setStatus(programmer.status);
        setTotalHours(programmer.totalHours);
    };

    const handleSave = () => {
        setSelectedProgrammer({
            name,
            country,
            system,
            experience,
            rank,
            status,
            totalHours,
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Asignar Líder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCountry">
                        <Form.Label>País</Form.Label>
                        <Form.Control as="select" value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="">Seleccione el país</option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formSystem">
                        <Form.Label>Sistema</Form.Label>
                        <Form.Control as="select" value={system} onChange={(e) => setSystem(e.target.value)}>
                            <option value="">Seleccione el sistema</option>
                            <option value="Sistema A">Sistema A</option>
                            <option value="Sistema B">Sistema B</option>
                            <option value="Sistema C">Sistema C</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formProgrammerSearch">
                        <Form.Label>Buscar Programador</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="Ingrese el nombre del programador" value={name} readOnly />
                            <InputGroup.Text>
                                <Button variant="outline-secondary" onClick={handleSearchProgrammer}>
                                    <FaSearch />
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formExperience">
                        <Form.Label>Años de experiencia</Form.Label>
                        <Form.Control type="number" value={experience} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formRank">
                        <Form.Label>Rango</Form.Label>
                        <Form.Control as="select" value={rank} onChange={(e) => setRank(e.target.value)}>
                            <option value="plata">Plata</option>
                            <option value="oro">Oro</option>
                            <option value="diamante">Diamante</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formTotalHours">
                        <Form.Label>Horas totales trabajadas</Form.Label>
                        <Form.Control type="number" value={totalHours} readOnly />
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