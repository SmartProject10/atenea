import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

interface HoursData {
    id: number;
    programmer: string;
    module: string;
    country: string;
    supervisor: string;
    entryDate: string;
    lastMonthHours: number;
    totalHours: number;
}

interface RankingTableProps {

    hoursData: HoursData[];

    onRowClick: (data: HoursData) => void;

}

export const RankingTable: React.FC<RankingTableProps> = ({ hoursData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = hoursData.filter(item =>
        item.programmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supervisor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ranking');
        XLSX.writeFile(workbook, 'ranking.xlsx');
    };

    return (
        <>
            <div className="filters mb-3">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="form-control form-control-sm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col">
                        <select className="form-control form-control-sm">
                            <option value="">Más horas trabajadas</option>
                            <option value="lastMonthHours">Último Mes</option>
                            <option value="totalHours">Acumuladas</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="date" className="form-control form-control-sm" placeholder="Fecha desde" />
                    </div>
                    <div className="col">
                        <button className="btn btn-secondary btn-sm" onClick={handleExport}>Exportar</button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                            <th className="min-w-50px">N°</th>
                            <th className="min-w-100px">Programador</th>
                            <th className="min-w-150px">Sistema de Gestión</th>
                            <th className="min-w-100px">País</th>
                            <th className="min-w-150px">Supervisor</th>
                            <th className="min-w-150px">Fecha de Ingreso</th>
                            <th className="min-w-150px">Horas Último Mes</th>
                            <th className="min-w-150px">Horas Acumuladas</th>
                            <th className="min-w-50px">Perfil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.programmer}</td>
                                <td>{item.module}</td>
                                <td>{item.country}</td>
                                <td>{item.supervisor}</td>
                                <td>{item.entryDate}</td>
                                <td>{item.lastMonthHours}</td>
                                <td>{item.totalHours}</td>
                                <td>
                                    <Link 
                                        to={`/profile/${item.id}`} 
                                        className="btn btn-sm btn-icon"
                                        title="Ver perfil del programador"
                                    >
                                        <i className="fas fa-eye"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};