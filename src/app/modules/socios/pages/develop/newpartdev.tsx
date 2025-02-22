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

function NewApplicantsTable({ newApplicantsData, setDevelopersData }: { newApplicantsData: any[], setDevelopersData: React.Dispatch<React.SetStateAction<any[]>> }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterApproved, setFilterApproved] = useState<'all' | 'approved' | 'notApproved'>('all');

    const handleApproveChange = (index: number) => {
        const updatedApplicants = [...newApplicantsData];
        updatedApplicants[index].aprobar = !updatedApplicants[index].aprobar;
        if (updatedApplicants[index].aprobar) {
            const newDeveloper = {
                ...updatedApplicants[index],
                estado: 'Activo',
            };
            setDevelopersData(prevData => [...prevData, newDeveloper]);
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
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Fecha de postulación</th>
                        <th>Especialidad</th>
                        <th>Años de exp back</th>
                        <th>Años de exp front</th>
                        <th>Años de exp mobile</th>
                        <th>Años de exp en otra especialidad</th>
                        <th>Años de exp totales</th>
                        <th>CV</th>
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
                                    <td>{item.nombre}</td>
                                    <td>{item.celular}</td>
                                    <td>{item.fechaPostulacion}</td>
                                    <td>{item.especialidad}</td>
                                    <td>{item.expBack}</td>
                                    <td>{item.expFront}</td>
                                    <td>{item.expMobile}</td>
                                    <td>{item.expOtra}</td>
                                    <td>{item.expTotal}</td>
                                    <td>
                                        <a href={item.cv} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="cv-icon" style={{ marginRight: '8px' }}></i>
                                            <span>Descargar CV</span>
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
    XLSX.utils.book_append_sheet(wb, ws, 'Desarrolladores');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'desarrolladores.xlsx');
}

export function NewPartDev() {
    const [developersData, setDevelopersData] = useState<any[]>([]);
    const [newApplicantsData, setNewApplicantsData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 6; // Or calculate based on data length

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="card">
            <div className="card-body">
            <p>En esta sección podrás ver los nuevos postulantes en desarrolladores de todo tipo</p>
                <NewApplicantsTable newApplicantsData={newApplicantsData} setDevelopersData={setDevelopersData} />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    </div>
                    <div className="card-footer">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => exportToExcel(developersData)}
                        >
                            Exportar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPartDev;
