import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


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

const initialData = [
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
        material: 'material_juan_perez.pdf',
    },
];

const initialNewApplicantsData = [
    {
        id: 1,
        numero: '1',
        pais: 'México',
        namesystem: 'ISO 9001',
        nombre: 'Ana Gómez',
        celular: '0987654321',
        fechaPostulacion: '2023-10-01',
        especialidad: 'Consultoría',
        cv: 'cv_ana_gomez.pdf',
        aprobar: false,
        estado: 'Pendiente',
        material: 'material_ana_gomez.pdf',
    },
];

function NewApplicantsTable({ newApplicantsData, setAuditorsData }: { newApplicantsData: typeof initialNewApplicantsData, setAuditorsData: React.Dispatch<React.SetStateAction<typeof initialData>> }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterApproved, setFilterApproved] = useState<'all' | 'approved' | 'notApproved'>('all');

    const handleApproveChange = (index: number) => {
        const updatedApplicants = [...newApplicantsData];
        updatedApplicants[index].aprobar = !updatedApplicants[index].aprobar;
        if (updatedApplicants[index].aprobar) {
            const newAuditor = {
                id: updatedApplicants[index].id,
                numero: updatedApplicants[index].numero,
                pais: updatedApplicants[index].pais,
                nombres: updatedApplicants[index].nombre,
                celular: updatedApplicants[index].celular,
                sgDigital: '',
                paisSistema: updatedApplicants[index].pais,
                utilidad: '0%',
                ingresoUtilidad: '0',
                nombreBco: '',
                numeroCuenta: '',
                estado: 'Activo',
                material: updatedApplicants[index].material,
            };
            setAuditorsData(prevData => [...prevData, newAuditor]);
        }
    };

    const filteredData = newApplicantsData.filter(item => {
        const matchesSearchTerm = Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter = filterApproved === 'all' ||
            (filterApproved === 'approved' && item.aprobar) ||
            (filterApproved === 'notApproved' && !item.aprobar);
        return matchesSearchTerm && matchesFilter;
    });

    return (
        <div className="table-response my-16">
            <h2>Nuevos Postulantes</h2>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />
            <div className="mb-3">
                <label>Filtrar por aprobación:</label>
                <select
                    value={filterApproved}
                    onChange={e => setFilterApproved(e.target.value as 'all' | 'approved' | 'notApproved')}
                    className="form-control"
                >
                    <option value="all">Todos</option>
                    <option value="approved">Aprobados</option>
                    <option value="notApproved">No aprobados</option>
                </select>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>País</th>
                        <th>Nombre del Sistema</th>
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Fecha de postulación</th>
                        <th>Especialidad</th>
                        <th>CV</th>
                        <th>Material</th>
                        <th>Aprobar</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.numero}</td>
                                    <td>{item.pais}</td>
                                    <td>{item.namesystem}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.celular}</td>
                                    <td>{item.fechaPostulacion}</td>
                                    <td>{item.especialidad}</td>
                                    <td>
                                        <a href={item.cv} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="cv-icon" style={{ marginRight: '8px' }}></i>
                                            <span>Descargar CV</span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href={item.material} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="cv-icon" style={{ marginRight: '8px' }}></i>
                                            <span>Ver arhivo</span>
                                        </a>
                                    </td>
                                    <td>
                                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                                            <input type="checkbox" checked={item.aprobar} onChange={() => handleApproveChange(index)} style={{ opacity: 0, width: 0, height: 0 }} />
                                            <span className="slider round" style={{
                                                position: 'absolute',
                                                cursor: 'pointer',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: item.aprobar ? '#4caf50' : '#ccc',
                                                transition: '.4s',
                                                borderRadius: '20px'
                                            }}></span>
                                            <span style={{
                                                position: 'absolute',
                                                height: '16px',
                                                width: '16px',
                                                left: item.aprobar ? '22px' : '2px',
                                                bottom: '2px',
                                                backgroundColor: 'white',
                                                transition: '.4s',
                                                borderRadius: '50%'
                                            }}></span>
                                        </label>
                                    </td>
                                    <td>{item.estado}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

function exportToExcel(data: typeof initialData) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Auditores');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'auditores.xlsx');
}

export function NewPartner() {
    const [auditorsData, setAuditorsData] = useState(initialData);
    const [newApplicantsData, setNewApplicantsData] = useState(initialNewApplicantsData);

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-content">
                    <p>
                        La tabla de auditores permite a los usuarios almacenar y gestionar la información de los auditores de manera segura y eficiente. Los datos registrados incluyen el número, país, nombres, celular, SG Digital, país del sistema, utilidad, ingreso por utilidad, nombre del banco, número de cuenta, estado y material.
                    </p>
                </div>
                <NewApplicantsTable newApplicantsData={newApplicantsData} setAuditorsData={setAuditorsData} />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={() => exportToExcel(auditorsData)}>Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
