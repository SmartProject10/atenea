import React, { useState } from 'react';
import { Table, Tag, DatePicker, Button, Modal, Upload, Input } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { UploadOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const TareasListaPage: React.FC = () => {
    const [data, setData] = useState<Array<{ numero: number; pais: string; sistema: string; nombreTarea: string; descripcion: string; dependencia: string; tecnologias: string; fechaAsignacion: string; fechaVencimiento: string; ultimaFecha: string; estado: string; asignadoA: string; comentarios: string; materiales: string; }>>([]);
    const [filteredData, setFilteredData] = useState(data);
    const [selectedPais, setSelectedPais] = useState<string | undefined>(undefined);
    const [selectedSistema, setSelectedSistema] = useState<string | undefined>(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);

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

    const showModal = (record: any) => {
        setCurrentRecord(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns: Array<ColumnType<{ numero: number; pais: string; sistema: string; nombreTarea: string; descripcion: string; dependencia: string; tecnologias: string; fechaAsignacion: string; fechaVencimiento: string; ultimaFecha: string; estado: string; asignadoA: string; comentarios: string; materiales: string; }>> = [
        {
            title: 'N°',
            dataIndex: 'numero',
            key: 'numero',
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
            filters: [],
            onFilter: (value, record) => record.pais === value,
        },
        {
            title: 'Nombre del sistema',
            dataIndex: 'sistema',
            key: 'sistema',
            filters: [],
            onFilter: (value, record) => record.sistema === value,
        },
        {
            title: 'Nombre de la tarea',
            dataIndex: 'nombreTarea',
            key: 'nombreTarea',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Buscar tarea"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Buscar
                    </Button>
                    <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                        Resetear
                    </Button>
                </div>
            ),
            filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.nombreTarea.toLowerCase().includes(String(value).toLowerCase()),
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Dependencia',
            dataIndex: 'dependencia',
            key: 'dependencia',
        },
        {
            title: 'Tecnologías requeridas',
            dataIndex: 'tecnologias',
            key: 'tecnologias',
        },
        {
            title: 'Fecha de asignación',
            dataIndex: 'fechaAsignacion',
            key: 'fechaAsignacion',
            sorter: (a: any, b: any) => moment(a.fechaAsignacion).unix() - moment(b.fechaAsignacion).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(_, dateString) => setSelectedKeys(dateString ? [dateString as React.Key] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90, marginRight: 8 }}>
                        Buscar
                    </Button>
                    <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                        Resetear
                    </Button>
                </div>
            ),
        },
        {
            title: 'Fecha de vencimiento',
            dataIndex: 'fechaVencimiento',
            key: 'fechaVencimiento',
            sorter: (a: any, b: any) => moment(a.fechaVencimiento).unix() - moment(b.fechaVencimiento).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
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
            title: 'Última fecha',
            dataIndex: 'ultimaFecha',
            key: 'ultimaFecha',
            sorter: (a: any, b: any) => moment(a.ultimaFecha).unix() - moment(b.ultimaFecha).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
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
            filters: [],
            onFilter: (value, record) => record.estado.includes(String(value)),
            render: (estado: string) => {
                let color = estado === 'Pendiente' ? 'red' : 'green';
                return <Tag color={color}>{estado.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Asignado a',
            dataIndex: 'asignadoA',
            key: 'asignadoA',
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
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    Subir Evidencias
                </Button>
            ),
        }
    ];

    return (
        <div>
            <h1>Tareas del líder para asignar</h1>
            <br />
            <div style={{ overflowX: 'auto' }}>
                <Table dataSource={filteredData} columns={columns} rowKey="numero" />
            </div>
            <Modal title="Subir Evidencias" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Upload accept=".pdf" beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Seleccionar Archivo PDF</Button>
                </Upload>
            </Modal>
        </div>
    );
};

export default TareasListaPage;
