import React, { useState } from 'react';
import { Table, Tag, DatePicker, Button, Input, notification, Modal } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AddTaskModal from './modal';
import TaskModal from './taskmodal';

interface Task {
    id: number;
    country: string;
    namesystem: string;
    taskName: string;
    taskDescription: string;
    dependency: string;
    requiredTechnologies: string[];
    assignmentDate: string;
    dueDate: string;
    lastDate: string;
    state: string;
    assignedTo: string;
    comments: string;
    materials: string[];
}

export function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAddTask = (newTask: Task) => {
        setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
        setShowAddModal(false);
    };

    const handleEditTask = (updatedTask: Task) => {
        setTasks(tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        ));
        setShowEditModal(false);
        setEditingTask(null);
    };

    const handleDeleteTask = (id: number) => {
        Modal.confirm({
            title: '¿Está seguro de eliminar esta tarea?',
            content: 'Esta acción no se puede deshacer',
            okText: 'Sí',
            cancelText: 'No',
            onOk: () => {
                setTasks(tasks.filter(task => task.id !== id));
                notification.success({
                    message: 'Tarea eliminada',
                    description: 'La tarea ha sido eliminada exitosamente'
                });
            }
        });
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(tasks);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Tareas');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'tareas.xlsx');
    };

    const onEdit = (task: Task) => {
        setEditingTask(task);
        setShowEditModal(true);
    };

    const onDelete = (id: number) => {
        handleDeleteTask(id);
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
            render: (technologies: string[]) => technologies.join(', '),
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
            render: (materials: any[]) => materials.join(', '),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, record: Task) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
                </span>
            ),
        }
    ];

    return (
        <div className="card">
            <div className="card-header border-0 pt-6">
                <div className="card-title">
                    <div className="d-flex align-items-center position-relative my-1">
                        <h3 className="card-label">Asignación de Tareas</h3>
                    </div>
                </div>
                <div className="card-toolbar">
                    <Button 
                        type="primary" 
                        onClick={() => setShowAddModal(true)}
                        className="me-2"
                    >
                        Agregar Tarea
                    </Button>
                    <Button 
                        onClick={exportToExcel}
                    >
                        Exportar Excel
                    </Button>
                </div>
            </div>
            <div className="card-body py-4">
                <Table 
                    dataSource={tasks} 
                    columns={columns} 
                    rowKey="id"
                    scroll={{ x: true }} 
                />
            </div>

            {editingTask && (
                <TaskModal
                    show={showEditModal}
                    handleClose={() => {
                        setShowEditModal(false);
                        setEditingTask(null);
                    }}
                    onSubmit={handleEditTask}
                    onSelectChange={(value: string | string[], field: string) => {
                        setEditingTask(prev => prev ? { ...prev, [field]: value } : null);
                    }}
                    isVisible={showEditModal}
                    editingTask={editingTask}
                    task={editingTask}
                    onOk={() => handleEditTask(editingTask)}
                    onCancel={() => {
                        setShowEditModal(false);
                        setEditingTask(null);
                    }}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setEditingTask(prev => prev ? { ...prev, [name]: value } : null);
                    }}
                    onDateChange={(date: any, dateString: string, field: string) => {
                        setEditingTask(prev => prev ? { ...prev, [field]: dateString } : null);
                    }}
                />
            )}

            <AddTaskModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
            />
        </div>
    );
}

export default TasksPage;
