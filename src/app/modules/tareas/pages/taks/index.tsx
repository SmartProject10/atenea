import React, { useState } from 'react';
import { Table, Tag, DatePicker, Button, Select, Modal, Upload, Input } from 'antd';
import { UploadOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AddTaskModal from './modal';

const { Option } = Select;

export function TasksPage() {
    const [showModal, setShowModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);

    const tasksData = [
        {
            id: 1,
            country: 'Perú',
            namesystem: 'ISO 45001',
            taskName: 'Implementar API',
            taskDescription: 'Desarrollar la API para el sistema',
            dependency: 'Alta',
            requiredTechnologies: 'Backend',
            assignmentDate: '2023-01-01',
            dueDate: '2023-01-15',
            lastDate: '2023-01-10',
            state: 'En proceso',
            assignedTo: 'Juan Pérez',
            comments: 'Intermedia',
            materials: 'api-docs.pdf'
        }
    ];

    const handleNewTask = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const exportToExcel = (data: any[], fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    };

    const showModalUpload = (record: any) => {
        setCurrentRecord(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onEdit = (record: any) => {
        // Implement edit functionality here
    };

    const onDelete = (id: number) => {
        // Implement delete functionality here
    };

    const columns = [
        {
            title: 'N°',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'País',
            dataIndex: 'country',
            key: 'country',
            filters: [
                { text: 'Perú', value: 'Perú' },
                { text: 'Chile', value: 'Chile' },
                { text: 'Argentina', value: 'Argentina' },
            ],
            onFilter: (value: any, record: any) => record.country === value,
        },
        {
            title: 'Nombre del sistema',
            dataIndex: 'namesystem',
            key: 'namesystem',
        },
        {
            title: 'Nombre de la tarea',
            dataIndex: 'taskName',
            key: 'taskName',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
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
            onFilter: (value: any, record: any) => record.taskName.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Descripción',
            dataIndex: 'taskDescription',
            key: 'taskDescription',
        },
        {
            title: 'Dependencia',
            dataIndex: 'dependency',
            key: 'dependency',
        },
        {
            title: 'Tecnologías requeridas',
            dataIndex: 'requiredTechnologies',
            key: 'requiredTechnologies',
        },
        {
            title: 'Fecha de asignación',
            dataIndex: 'assignmentDate',
            key: 'assignmentDate',
            sorter: (a: any, b: any) => moment(a.assignmentDate).unix() - moment(b.assignmentDate).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(_, dateString) => setSelectedKeys(dateString ? [dateString] : [])}
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
            dataIndex: 'dueDate',
            key: 'dueDate',
            sorter: (a: any, b: any) => moment(a.dueDate).unix() - moment(b.dueDate).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(_, dateString) => setSelectedKeys(dateString ? [dateString] : [])}
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
            dataIndex: 'lastDate',
            key: 'lastDate',
            sorter: (a: any, b: any) => moment(a.lastDate).unix() - moment(b.lastDate).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(_, dateString) => setSelectedKeys(dateString ? [dateString] : [])}
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
            dataIndex: 'state',
            key: 'state',
            filters: [
                { text: 'En proceso', value: 'En proceso' },
                { text: 'Completado', value: 'Completado' },
            ],
            onFilter: (value: any, record: any) => record.state.includes(value),
            render: (state: string) => {
                let color = state === 'En proceso' ? 'blue' : 'green';
                return <Tag color={color}>{state.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Asignado a',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
        },
        {
            title: 'Comentarios',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'Materiales',
            dataIndex: 'materials',
            key: 'materials',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, record: any) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
                </span>
            ),
        }
    ];

    return (
        <div>
            <div className="card-header align-items-center">
                <h5 className="card-title flex-1 align-items-center">Asignación de Tareas</h5>
                <br />
                <div>
                    <button className="btn btn-primary btn-sm me-2" onClick={handleNewTask}>
                        Agregar Tarea
                    </button>
                    <button className="btn btn-success btn-sm" onClick={() => exportToExcel(tasksData, 'tareas.xlsx')}>
                        Exportar
                    </button>
                </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <Table dataSource={tasksData} columns={columns} rowKey="id" />
            </div>
            <AddTaskModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default TasksPage;
