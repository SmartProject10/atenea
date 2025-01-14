import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface RankingModalProps {
    show: boolean;
    onHide: () => void;
    data: {
        country: string;
        year: string;
        system: string;
        programmers: string[];
        totalHours: number;
    } | null;
}

export const RankingModal: React.FC<RankingModalProps> = ({ show, onHide, data }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Historial de Horas Trabajadas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data && (
                    <div>
                        <p><strong>País:</strong> {data.country}</p>
                        <p><strong>Año:</strong> {data.year}</p>
                        <p><strong>Sistema:</strong> {data.system}</p>
                        <p><strong>Programadores:</strong> {data.programmers.join(', ')}</p>
                        <p><strong>Horas Totales Trabajadas:</strong> {data.totalHours}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};