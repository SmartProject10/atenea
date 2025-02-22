import React, { useState } from 'react';

function NewApplicantsTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterApproved, setFilterApproved] = useState<'all' | 'approved' | 'notApproved'>('all');
    interface Applicant {
        id: number;
        numero: number;
        pais: string;
        nombre: string;
        celular: string;
        fechaPostulacion: string;
        tipoProfesion: string;
        anosExperiencia: number;
        cv: string;
        idiomas: string;
        aprobar: boolean;
        estado: string;
    }

    const [newApplicantsData, setNewApplicantsData] = useState<Applicant[]>([]);

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
                        <th>Tipo de Profesión</th>
                        <th>Años de Experiencia</th>
                        <th>CV</th>
                        <th>Idiomas</th>
                        <th>Aprobar</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.numero}</td>
                                    <td>{item.pais}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.celular}</td>
                                    <td>{item.fechaPostulacion}</td>
                                    <td>{item.tipoProfesion}</td>
                                    <td>{item.anosExperiencia}</td>
                                    <td>
                                        <a href={item.cv} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="cv-icon" style={{ marginRight: '8px' }}></i>
                                            <span>Descargar CV</span>
                                        </a>
                                    </td>
                                    <td>{item.idiomas}</td>
                                    <td>
                                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                                            <input type="checkbox" checked={item.aprobar} onChange={() => { item.aprobar = !item.aprobar }} style={{ opacity: 0, width: 0, height: 0 }} />
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
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export function NewPart() {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-content">
                    <p>
                        El historial de socios permite a los usuarios almacenar y gestionar la información de los socios de manera segura y eficiente. Los datos registrados incluyen el número, país, nombre, celular, tipo de socio, fecha de ingreso, fecha de salida, utilidad, ingreso por utilidad, nombre del banco, número de cuenta y estado.
                    </p>
                </div>
                <NewApplicantsTable />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPart;
