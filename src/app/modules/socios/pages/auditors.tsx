import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Pagination() {
    return (
        <ul className="pagination">
            <li className="page-item previous disabled">
                <a href="#" className="page-link">
                    <i className="previous"></i>
                </a>
            </li>
            <li className="page-item"><a href="#" className="page-link">1</a></li>
            <li className="page-item active"><a href="#" className="page-link">2</a></li>
            <li className="page-item"><a href="#" className="page-link">3</a></li>
            <li className="page-item"><a href="#" className="page-link">4</a></li>
            <li className="page-item"><a href="#" className="page-link">5</a></li>
            <li className="page-item"><a href="#" className="page-link">6</a></li>
            <li className="page-item next">
                <a href="#" className="page-link">
                    <i className="next"></i>
                </a>
            </li>
        </ul>
    );
}

const data = [
    {
        id: 1,
        numero: '1',
        pais: 'México',
        nombres: 'Juan Pérez',
        celular: '1234567890',
        sgDigital: 'SG123',
        paisSistema: 'México',
        utilidad: '0.5%',
        ingresoUtilidad: '500',
        nombreBco: 'Banco XYZ',
        numeroCuenta: '123456789',
        estado: 'Activo',
    },
];

function AuditorTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleEditClick = (index: number, currentValue: string) => {
        setEditIndex(index);
        setEditValue(currentValue);
    };

    const handleSaveClick = (index: number) => {
        data[index].utilidad = editValue;
        setEditIndex(null);
    };

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="table-response my-16">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>País</th>
                        <th>Nombres</th>
                        <th>Celular</th>
                        <th>SG Digital</th>
                        <th>País Sistema</th>
                        <th>Utilidad</th>
                        <th>Ingreso Utilidad ($)</th>
                        <th>Nombre del Bco</th>
                        <th>N° de Cuenta</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.numero}</td>
                                    <td>{item.pais}</td>
                                    <td>{item.nombres}</td>
                                    <td>{item.celular}</td>
                                    <td>{item.sgDigital}</td>
                                    <td>{item.paisSistema}</td>
                                    <td>
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={e => setEditValue(e.target.value)}
                                            />
                                        ) : (
                                            item.utilidad
                                        )}
                                    </td>
                                    <td>{item.ingresoUtilidad}</td>
                                    <td>{item.nombreBco}</td>
                                    <td>{item.numeroCuenta}</td>
                                    <td>{item.estado}</td>
                                    <td>
                                        {editIndex === index ? (
                                            <button className="btn btn-success btn-sm" onClick={() => handleSaveClick(index)}>
                                                <FontAwesomeIcon icon={faSave} /> Guardar
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(index, item.utilidad)}>
                                                <FontAwesomeIcon icon={faPencilAlt} /> Editar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Auditores');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'auditores.xlsx');
}

export function Auditors() {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-content">
                    <p>
                        La tabla de auditores permite a los usuarios almacenar y gestionar la información de los auditores de manera segura y eficiente. Los datos registrados incluyen el número, país, nombres, celular, SG Digital, país del sistema, utilidad, ingreso por utilidad, nombre del banco, número de cuenta y estado.
                    </p>
                </div>
                <AuditorTable />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={exportToExcel}>Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}