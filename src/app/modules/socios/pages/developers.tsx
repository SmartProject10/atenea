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

            <li className="page-item "><a href="#" className="page-link">1</a></li>
            <li className="page-item active"><a href="#" className="page-link">2</a></li>
            <li className="page-item "><a href="#" className="page-link">3</a></li>
            <li className="page-item "><a href="#" className="page-link">4</a></li>
            <li className="page-item "><a href="#" className="page-link">5</a></li>
            <li className="page-item "><a href="#" className="page-link">6</a></li>

            <li className="page-item next">
                <a href="#" className="page-link">
                    <i className="next"></i>
                </a>
            </li>
        </ul>
    )
}

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
]

const initialNewApplicantsData = [
    {
        id: 1,
        numero: '1',
        pais: 'México',
        nombre: 'Ana Gómez',
        celular: '0987654321',
        fechaPostulacion: '2023-10-01',
        especialidad: 'Frontend',
        expBack: '2',
        expFront: '3',
        expMobile: '1',
        expOtra: '0',
        expTotal: '6',
        cv: 'cv_ana_gomez.pdf',
        aprobar: false,
        estado: 'Pendiente',
    },
]

function DeveloperTable({ data }: { data: typeof initialData }) {
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

    interface Developer {
        id: number;
        numero: string;
        pais: string;
        nombre: string;
        celular: string;
        htMesAnterior: string;
        mesActual: string;
        horasAcumuladas: string;
        utilidad: string;
        ingresoUtilidad: string;
        nombreBco: string;
        numeroCuenta: string;
        estado: string;
    }

    const filteredData = data.filter((item: Developer) =>
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
                        <th>Ht/mes anterior</th>
                        <th>Mes actual (horas)</th>
                        <th>Horas acumuladas</th>
                        <th>Utilidad</th>
                        <th>Ingreso utilidad</th>
                        <th>Nombre Bco</th>
                        <th>Número de cuenta</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((item: typeof initialData[0], index: number) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.numero}</td>
                                    <td>{item.pais}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.celular}</td>
                                    <td>{item.htMesAnterior}</td>
                                    <td>{item.mesActual}</td>
                                    <td>{item.horasAcumuladas}</td>
                                    <td>{item.ingresoUtilidad}</td>
                                    <td>{item.nombreBco}</td>
                                    <td>{item.numeroCuenta}</td>
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

interface DeveloperData {
    id: number;
    numero: string;
    pais: string;
    nombre: string;
    celular: string;
    htMesAnterior: string;
    mesActual: string;
    horasAcumuladas: string;
    utilidad: string;
    ingresoUtilidad: string;
    nombreBco: string;
    numeroCuenta: string;
    estado: string;
}

function exportToExcel(data: DeveloperData[]) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Desarrolladores')
    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob: Blob = new Blob([wbout], { type: 'application/octet-stream' })
    saveAs(blob, 'historial_de_desarrolladores.xlsx')
}

interface NewApplicant {
    id: number;
    numero: string;
    pais: string;
    nombre: string;
    celular: string;
    fechaPostulacion: string;
    especialidad: string;
    expBack: string;
    expFront: string;
    expMobile: string;
    expOtra: string;
    expTotal: string;
    cv: string;
    aprobar: boolean;
    estado: string;
}

function NewApplicantsTable({ newApplicantsData, setDevelopersData }: { newApplicantsData: NewApplicant[], setDevelopersData: React.Dispatch<React.SetStateAction<DeveloperData[]>> }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterApproved, setFilterApproved] = useState<'all' | 'approved' | 'notApproved'>('all')

    const handleApproveChange = (index: number) => {
        const updatedApplicants = [...newApplicantsData]
        updatedApplicants[index].aprobar = !updatedApplicants[index].aprobar
        if (updatedApplicants[index].aprobar) {
            const newDeveloper = {
                id: updatedApplicants[index].id,
                numero: updatedApplicants[index].numero,
                pais: updatedApplicants[index].pais,
                nombre: updatedApplicants[index].nombre,
                celular: updatedApplicants[index].celular,
                htMesAnterior: '0',
                mesActual: '0',
                horasAcumuladas: '0',
                utilidad: '0%',
                ingresoUtilidad: '0',
                nombreBco: '',
                numeroCuenta: '',
                estado: 'Activo',
            }
            setDevelopersData(prevData => [...prevData, newDeveloper])
        }
    }

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
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export function Developers() {
    const [developersData, setDevelopersData] = useState(initialData)
    const [newApplicantsData, setNewApplicantsData] = useState(initialNewApplicantsData)

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
                <DeveloperTable data={developersData} />
                <NewApplicantsTable newApplicantsData={newApplicantsData} setDevelopersData={setDevelopersData} />
                <div className="d-flex justify-content-end mt-16">
                    <div className="flex-1"></div>
                    <Pagination />
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={() => exportToExcel(developersData)}>Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}