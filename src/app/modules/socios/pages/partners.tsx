import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

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
    )
}

const data = [
    {
        id: 1,
        numero: '1',
        pais: 'México',
        nombre: 'Juan Pérez',
        celular: '1234567890',
        tipoSocio: 'Abogado',
        fechaIngreso: '2023-01-01',
        fechaSalida: '2023-12-31',
        utilidad: '0.5%',
        ingresoUtilidad: '500',
        nombreBco: 'Banco XYZ',
        numeroCuenta: '123456789',
        estado: 'Activo',
        idiomas: 'Español, Inglés',
    },
]

function DeveloperTable() {
    const [searchTerm, setSearchTerm] = useState('')
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editValue, setEditValue] = useState('')

    const handleEditClick = (index: number, currentValue: string) => {
        setEditIndex(index)
        setEditValue(currentValue)
    }

    const handleSaveClick = (index: number) => {
        data[index].utilidad = editValue
        setEditIndex(null)
    }

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

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
                        filteredData.map((item, index) => {
                            return (
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
                                                <FontAwesomeIcon icon={faSave} /> Guardar
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(index, item.utilidad)}>
                                                <FontAwesomeIcon icon={faPencilAlt} /> Editar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Socios')
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    saveAs(blob, 'historial_de_socios.xlsx')
}

const newApplicantsData = [
    {
        id: 1,
        numero: '1',
        pais: 'México',
        nombre: 'Ana Gómez',
        celular: '0987654321',
        fechaPostulacion: '2023-10-01',
        tipoProfesion: 'Abogado',
        anosExperiencia: '5',
        cv: 'cv_ana_gomez.pdf',
        aprobar: false,
        estado: 'Pendiente',
        idiomas: 'Español, Inglés',
    },
]

function NewApplicantsTable() {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterApproved, setFilterApproved] = useState<'all' | 'approved' | 'notApproved'>('all')

    const filteredData = newApplicantsData.filter(item => {
        const matchesSearchTerm = Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
        const matchesFilter = filterApproved === 'all' ||
            (filterApproved === 'approved' && item.aprobar) ||
            (filterApproved === 'notApproved' && !item.aprobar)
        return matchesSearchTerm && matchesFilter
    })

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
    )
}

export function Partners() {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-content">
                    <p>
                        El historial de socios permite a los usuarios almacenar y gestionar la información de los socios de manera segura y eficiente. Los datos registrados incluyen el número, país, nombre, celular, tipo de socio, fecha de ingreso, fecha de salida, utilidad, ingreso por utilidad, nombre del banco, número de cuenta y estado.
                    </p>
                </div>
                <DeveloperTable />
                <NewApplicantsTable />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={exportToExcel}>Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}