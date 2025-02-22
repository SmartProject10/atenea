import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnType } from 'antd/es/table';

interface SystemData {
    country: string;
    systemName: string;
    user: string;
    status: string;
    auditorPercentage: number;
    programmerPercentage: number;
    frontTasks: number;
    backTasks: number;
    mobileTasks: number;
    rvTasks: number;
    iaTasks: number;
    projectEndDate: string;
    projectStatus: string;
}

export function ProcessPage() {
    const [filteredData, setFilteredData] = useState<SystemData[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

    const handleFilterChange = () => {
        // This function will be used to filter data based on selectedCountry and selectedStatus
    };

    const columns: Array<ColumnType<SystemData>> = [
        {
            title: 'N°',
            dataIndex: 'index',
            key: 'index',
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'País',
            dataIndex: 'country',
            key: 'country',
            filters: [
                { text: 'Peru', value: 'Peru' },
                { text: 'Chile', value: 'Chile' },
                { text: 'Argentina', value: 'Argentina' },
            ],
            onFilter: (value, record) => record.country === value,
        },
        {
            title: 'Nombre del sistema',
            dataIndex: 'systemName',
            key: 'systemName',
        },
        {
            title: 'Líder',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Terminado', value: 'terminado' },
                { text: 'En Proceso', value: 'proceso' },
            ],
            onFilter: (value, record) => record.status.includes(String(value)),
            render: (status: string) => {
                let color = status === 'En proceso' ? 'blue' : 'green';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Porcentaje auditor',
            dataIndex: 'auditorPercentage',
            key: 'auditorPercentage',
            render: (text: number) => `${text}%`,
        },
        {
            title: 'Porcentaje Programador',
            dataIndex: 'programmerPercentage',
            key: 'programmerPercentage',
            render: (text: number) => `${text}%`,
        },
        {
            title: 'Front (%)',
            dataIndex: 'frontTasks',
            key: 'frontTasks',
            render: (text: number) => `${text}%`,
        },
        {
            title: 'Back (%)',
            dataIndex: 'backTasks',
            key: 'backTasks',
            render: (text: number) => `${text}%`,
        },
        {
            title: 'Mobile (%)',
            dataIndex: 'mobileTasks',
            key: 'mobileTasks',
            render: (text: number) => `${text}%`,
        },
        {
            title: 'Data (%)',
            dataIndex: 'rvTasks',
            key: 'rvTasks',
            render: (text: number) => `${text}%`,
        },
        {
            title: 'IA (%)',
            dataIndex: 'iaTasks',
            key: 'iaTasks',
            render: (text: number) => `${text}%`,
        },
        {
            title: 'Fecha final proyecto',
            dataIndex: 'projectEndDate',
            key: 'projectEndDate',
        },
        {
            title: 'Estado Proyecto',
            dataIndex: 'projectStatus',
            key: 'projectStatus',
        },
    ];

    return (
        <div>
            <h1>Sistemas en proceso</h1>
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="systemName"
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
}

export default ProcessPage;
