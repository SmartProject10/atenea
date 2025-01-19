import React, { useState } from 'react';
import { Table, Tag, DatePicker, Button, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const TareasListaPage: React.FC = () => {
    const data = [
        {
            numero: 1,
            pais: 'USA',
            sistema: '27001',
            nombreTarea: 'Actualizar Sistema',
            fechaEnvio: '2023-10-01',
            estado: 'Pendiente',
            tecnologias: 'mobile, ia',
            comentarios: 'El auditor solicita actualizar el sistema',
        },
        // Agrega más datos aquí
    ];

    const [filteredData, setFilteredData] = useState(data);
    const [selectedPais, setSelectedPais] = useState<string | undefined>(undefined);
    const [selectedSistema, setSelectedSistema] = useState<string | undefined>(undefined);


    const handleFilterChange = () => {
        let filtered = data;
        if (selectedPais) {
            filtered = filtered.filter(item => item.pais === selectedPais);
        }
        if (selectedSistema) {
            filtered = filtered.filter(item => item.sistema === selectedSistema);
        }
        setFilteredData(filtered);
    };

    const columns = [
        {
            title: 'N°',
            dataIndex: 'numero',
            key: 'numero',
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
        },
        {
            title: 'Sistema',
            dataIndex: 'sistema',
            key: 'sistema',
        },
        {
            title: 'Nombre de la Tarea',
            dataIndex: 'nombreTarea',
            key: 'nombreTarea',
        },
        {
            title: 'Fecha de Envío',
            dataIndex: 'fechaEnvio',
            key: 'fechaEnvio',
            sorter: (a: any, b: any) => moment(a.fechaEnvio).unix() - moment(b.fechaEnvio).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(_, dateString) => setSelectedKeys(dateString ? [dateString as React.Key] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button type="primary" onClick={() => confirm({ closeDropdown: true })} size="small" style={{ width: 90, marginRight: 8 }}>
                        Buscar
                    </Button>
                    <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                        Resetear
                    </Button>
                </div>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado: string) => {
                let color = estado === 'Pendiente' ? 'red' : 'green';
                return <Tag color={color}>{estado.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Tecnologías requeridas',
            dataIndex: 'tecnologias',
            key: 'tecnologias',
        },
        {
            title: 'Comentarios',
            dataIndex: 'comentarios',
            key: 'comentarios',
        },
        {
            title: 'Materiales',
            dataIndex: 'materiales',
            key: 'materiales',
        }
    ];

    return (
        <div>
            <h1>Tareas pendientes para asignar</h1>
            <div style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Selecciona un país"
                    style={{ width: 200, marginRight: 8 }}
                    onChange={value => {
                        setSelectedPais(value);
                        handleFilterChange();
                    }}
                >
                    <Option value="USA">USA</Option>
                    <Option value="Mexico">Mexico</Option>
                    {/* Agrega más opciones de país aquí */}
                </Select>
                <Select
                    placeholder="Selecciona un sistema"
                    style={{ width: 200 }}
                    onChange={value => {
                        setSelectedSistema(value);
                        handleFilterChange();
                    }}
                >
                    <Option value="27001">27001</Option>
                    <Option value="9001">9001</Option>
                    {/* Agrega más opciones de sistema aquí */}
                </Select>
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="numero" />
        </div>
    );
};

export default TareasListaPage;