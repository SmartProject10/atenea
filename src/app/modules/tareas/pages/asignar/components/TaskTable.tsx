import React from 'react';
import { Table, Tag, Progress, Button, Input, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment, { MomentInput } from 'moment';
import { ColumnsType } from 'antd/es/table';

export interface Task {
    id: number;
    title: string;
    country: string;
    system: string;
    estimatedHours: number; // Add this line
    description: string;
    status: string;
    sendDate: string;
    dueDate: string;
    lastDate: MomentInput;
    priority: string;
    programmingType?: string;
    supervisor: string;
    documents: any[];
    comments: string;
    progress: number;
    difficulty: string;
    assignedTo?: string;
    link: string;
}

interface TaskTableProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
    const columns: ColumnsType<Task> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'País',
            dataIndex: 'country',
            key: 'country',
            filters: [
                { text: 'USA', value: 'USA' },
                { text: 'Mexico', value: 'Mexico' },
                { text: 'Canada', value: 'Canada' },
            ],
            onFilter: (value, record) => record.country === value,
        },
        {
            title: 'Sistema',
            dataIndex: 'system',
            key: 'system',
            filters: [
                { text: 'Sistema A', value: 'Sistema A' },
                { text: 'Sistema B', value: 'Sistema B' },
            ],
            onFilter: (value, record) => record.system === value,
        },
        {
            title: 'Nombre de tarea',
            dataIndex: 'title',
            key: 'title',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Buscar título"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm({ closeDropdown: true })}
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
            onFilter: (value, record) => record.title.toLowerCase().includes(String(value).toLowerCase()),
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Horas estimadas', // Add this column
            dataIndex: 'estimatedHours',
            key: 'estimatedHours',
            sorter: (a, b) => a.estimatedHours - b.estimatedHours,
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Incompleta', value: 'incompleta' },
                { text: 'En Proceso', value: 'en proceso' },
                { text: 'Enviada', value: 'enviada' },
            ],
            onFilter: (value, record) => record.status.includes(String(value)),
            render: (status: string) => {
                let color = status === 'incompleta' ? 'red' : status === 'en proceso' ? 'yellow' : 'green';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Fecha asignada',
            dataIndex: 'sendDate',
            key: 'sendDate',
            sorter: (a, b) => moment(a.sendDate).unix() - moment(b.sendDate).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
            title: 'Fecha de Vencimiento',
            dataIndex: 'dueDate',
            key: 'dueDate',
            sorter: (a, b) => moment(a.dueDate).unix() - moment(b.dueDate).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
            title: 'Última Fecha',
            dataIndex: 'lastDate',
            key: 'lastDate',
            sorter: (a, b) => moment(a.lastDate).unix() - moment(b.lastDate).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
            title: 'Dependiencia',
            dataIndex: 'priority',
            key: 'priority',
            filters: [
                { text: 'Alta', value: 'alta' },
                { text: 'Media', value: 'media' },
                { text: 'Baja', value: 'baja' },
            ],
            onFilter: (value, record) => record.priority === value,
        },
        {
            title: 'Tipo programación',
            dataIndex: 'programmingType',
            key: 'programmingType',
            filters: [
                { text: 'Back', value: 'back' },
                { text: 'Front', value: 'front' },
                { text: 'Mobile', value: 'mobile' },
            ],
            onFilter: (value, record) => record.programmingType === value,
        },
        {
            title: 'Sublider asignado',
            dataIndex: 'supervisor',
            key: 'supervisor',
        },
        {
            title: 'Materiales',
            dataIndex: 'documents',
            key: 'documents',
            render: (documents: any[]) => (
                <span>
                    {documents.map((doc, index) => (
                        <a key={index} href={doc.url} target="_blank" rel="noopener noreferrer"> descargar
                            {doc.name}
                        </a>
                    ))}
                </span>
            ),
        },
        {
            title: 'Comentarios',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'Progreso',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress: number) => <Progress percent={progress} />,
        },
        {
            title: 'Dificultad',
            dataIndex: 'difficulty',
            key: 'difficulty',
            filters: [
                { text: 'Fácil', value: 'facil' },
                { text: 'Medio', value: 'medio' },
                { text: 'Difícil', value: 'dificil' },
                { text: 'Complejo', value: 'complejo' },
            ],
            onFilter: (value, record) => record.difficulty === value,
        },
        {
            title: 'Asignado a',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
        },
        {
            title: 'Apoyos',
            dataIndex: 'support',
            key: 'support',
            render: (support: string) => <span>{support}</span>,
        },
        {
            title: 'Enlace',
            dataIndex: 'link',
            key: 'link',
            render: (link: string) => <a href={link} target="_blank" rel="noopener noreferrer">Abrir</a>,
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
                </span>
            ),
        },
    ];

    return <Table dataSource={tasks} columns={columns} rowKey={record => record.id.toString()} />;
};

export default TaskTable;
