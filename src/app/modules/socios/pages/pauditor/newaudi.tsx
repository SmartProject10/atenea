import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <ul className="pagination">
            <li className={`page-item previous ${currentPage === 1 ? 'disabled' : ''}`}>
                <a 
                    href="#" 
                    className="page-link"
                    onClick={(e) => handleClick(e, currentPage - 1)}
                >
                    <i className="previous"></i>
                </a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
                <li 
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    <a 
                        href="#" 
                        className="page-link"
                        onClick={(e) => handleClick(e, index + 1)}
                    >
                        {index + 1}
                    </a>
                </li>
            ))}
            <li className={`page-item next ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a 
                    href="#" 
                    className="page-link"
                    onClick={(e) => handleClick(e, currentPage + 1)}
                >
                    <i className="next"></i>
                </a>
            </li>
        </ul>
    );
};

function NewApplicantsTable({ newApplicantsData, setAuditorsData }: { newApplicantsData: any[], setAuditorsData: React.Dispatch<React.SetStateAction<any[]>> }) {
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
                                            <span>Ver archivo</span>
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

function exportToExcel(data: any[]) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Auditores');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'auditores.xlsx');
}

export function NewPartner() {
    const [auditorsData, setAuditorsData] = useState<any[]>([]);
    const [newApplicantsData, setNewApplicantsData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 6; // Or calculate based on data length

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-content">
                    <p>
                        La tabla de auditores permite a los usuarios almacenar y gestionar la información de los auditores de manera segura y eficiente. Los datos registrados incluyen el número, país, nombres, celular, SG Digital, país del sistema, utilidad, ingreso por utilidad, nombre del banco, número de cuenta, estado y material.
                    </p>
                </div>
                <NewApplicantsTable 
                    newApplicantsData={newApplicantsData} 
                    setAuditorsData={setAuditorsData} 
                />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    <div className="card-footer">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => exportToExcel(auditorsData)}
                        >
                            Exportar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPartner;
