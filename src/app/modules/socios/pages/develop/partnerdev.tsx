import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Pagination = () => (
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

const initialData = [
    {
        id: 1,
        numero: '1',
        pais: 'México',
        nombre: 'Juan Pérez',
        celular: '1234567890',
        htMesAnterior: '160',
        mesActual: '170',
        horasAcumuladas: '330',
        utilidad: '0.5%',
        ingresoUtilidad: '500',
        nombreBco: 'Banco XYZ',
        numeroCuenta: '123456789',
        estado: 'Activo',
    },
];

const DeveloperTable = ({ data, setData }: { data: typeof initialData, setData: React.Dispatch<React.SetStateAction<typeof initialData>> }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleEditClick = (index: number, currentValue: string) => {
        setEditIndex(index);
        setEditValue(currentValue);
    };

    const handleSaveClick = (index: number) => {
        const updatedData = [...data];
        updatedData[index].utilidad = editValue;
        setData(updatedData);
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
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Ht/mes anterior</th>
                        <th>Mes actual (horas)</th>
                        <th>Horas acumuladas</th>
                        <th>Utilidad</th>
                        <th>Ingreso utilidad</th>
                        <th>Nombre Bco</th>
                        <th>Número de cuenta</th>
                        <th>Estado</th>
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
                                <td>{item.htMesAnterior}</td>
                                <td>{item.mesActual}</td>
                                <td>{item.horasAcumuladas}</td>
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
};

const exportToExcel = (data: typeof initialData) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Desarrolladores');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'historial_de_desarrolladores.xlsx');
};

export const PartnerDev = () => {
    const [developersData, setDevelopersData] = useState(initialData);

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-content">
                    <p>
                        El historial de desarrolladores permite a los usuarios almacenar y gestionar la información de los desarrolladores de manera segura y eficiente. Los datos registrados incluyen el número, país, nombre, celular, horas trabajadas el mes anterior, horas trabajadas el mes actual, horas acumuladas, utilidad, ingreso por utilidad, nombre del banco, número de cuenta y estado.
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <label htmlFor="percentageProgrammers" className="form-label">Colocar porcentaje de programadores:</label>
                        <input type="number" id="percentageProgrammers" className="form-control" placeholder="%" />
                        <button className="btn btn-primary ms-3">Guardar</button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <label htmlFor="accumulatedHours" className="form-label">Horas de trabajo acumuladas de los programadores:</label>
                        <input type="text" id="accumulatedHours" className="form-control" value="1000" disabled />
                    </div>
                </div>
                <DeveloperTable data={developersData} setData={setDevelopersData} />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={() => exportToExcel(developersData)}>Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
