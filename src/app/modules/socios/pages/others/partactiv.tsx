import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

function ActivePartnersTable({ data }: { data: PartnerData[] }) {
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
        item.estado === 'Activo' &&
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
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Tipo de Socio</th>
                        <th>Fecha Ingreso</th>
                        <th>Fecha Salida</th>
                        <th>Utilidad</th>
                        <th>Ingreso Utilidad</th>
                        <th>Nombre Bco</th>
                        <th>Número de cuenta</th>
                        <th>Estado</th>
                        <th>Idiomas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.numero}</td>
                                <td>{item.pais}</td>
                                <td>{item.nombre}</td>
                                <td>{item.celular}</td>
                                <td>{item.tipoSocio}</td>
                                <td>{item.fechaIngreso}</td>
                                <td>{item.fechaSalida}</td>
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
                                <td>{item.idiomas}</td>
                                <td>
                                    {editIndex === index ? (
                                        <button className="btn btn-success btn-sm" onClick={() => handleSaveClick(index)}>
                                            <FontAwesomeIcon icon={faSave as IconProp} /> Guardar
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(index, item.utilidad)}>
                                            <FontAwesomeIcon icon={faPencilAlt as IconProp} /> Editar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

function exportToExcel(data: any) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Socios');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'historial_de_socios.xlsx');
}

interface PartnerData {
    id: number;
    numero: string;
    pais: string;
    nombre: string;
    celular: string;
    tipoSocio: string;
    fechaIngreso: string;
    fechaSalida: string;
    utilidad: string;
    ingresoUtilidad: string;
    nombreBco: string;
    numeroCuenta: string;
    estado: string;
    idiomas: string;
}

export function PartActiv({ data }: { data: PartnerData[] }) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-content">
                    <p>
                        El historial de socios permite a los usuarios almacenar y gestionar la información de los socios de manera segura y eficiente. Los datos registrados incluyen el número, país, nombre, celular, tipo de socio, fecha de ingreso, fecha de salida, utilidad, ingreso por utilidad, nombre del banco, número de cuenta y estado.
                    </p>
                </div>
                <ActivePartnersTable data={data} />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={() => exportToExcel(data)}>Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
