import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, notification, Table, Tag, DatePicker, Upload } from 'antd';
import { BellOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './tareaspage.scss';
import moment from 'moment';

const { Option } = Select;

const TareasPage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState<{ id: number; title: string; description: string; stage: string; status: string; sendDate?: string; dueDate?: string; priority?: string; supervisor?: string; documents?: any[] }[]>([
        {
            id: 1,
            title: 'Tarea 1',
            description: 'Descripción de la tarea 1',
            stage: 'asignada',
            status: 'incompleta',
            sendDate: '2025-01-01',
            dueDate: '2025-01-10',
            priority: 'alta',
            supervisor: 'Supervisor 1',
            documents: []
        },
        {
            id: 2,
            title: 'Tarea 2',
            description: 'Descripción de la tarea 2',
            stage: 'en progreso',
            status: 'en proceso',
            sendDate: '2025-01-02',
            dueDate: '2025-01-15',
            priority: 'media',
            supervisor: 'Supervisor 2',
            documents: []
        },
        {
            id: 3,
            title: 'Tarea 3',
            description: 'Descripción de la tarea 3',
            stage: 'terminada - en revisión',
            status: 'enviada',
            sendDate: '2025-01-03',
            dueDate: '2025-01-20',
            priority: 'baja',
            supervisor: 'Supervisor 3',
            documents: []
        }
    ]);
    const [newTask, setNewTask] = useState<{ id: number; title: string; description: string; stage: string; status: string; sendDate?: string; dueDate?: string; priority?: string; supervisor?: string; documents: any[] }>({ id: tasks.length + 1, title: '', description: '', stage: 'asignada', status: 'incompleta', sendDate: '', dueDate: '', priority: '', supervisor: '', documents: [] });
    const [editingTask, setEditingTask] = useState<{ id: number; title: string; description: string; stage: string; status: string; sendDate?: string; dueDate?: string; priority?: string; supervisor?: string; documents?: any[] } | null>(null);

    const showModal: () => void = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (editingTask) {
            setTasks(tasks.map(task => (task.id === editingTask.id ? newTask : task)));
            setEditingTask(null);
        } else {
            setTasks([...tasks, newTask]);
        }
        setIsModalVisible(false);
        setNewTask({ id: tasks.length + 1, title: '', description: '', stage: 'asignada', status: 'incompleta', sendDate: '', dueDate: '', priority: '', supervisor: '', documents: [] });
        notification.success({ message: 'Tarea agregada exitosamente' });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingTask(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string, field: string) => {
        setNewTask({ ...newTask, [field]: value });
    };

    const handleDateChange = (_date: any, dateString: string | string[], field: string) => {
        if (Array.isArray(dateString)) {
            dateString = dateString[0];
        }
        setNewTask({ ...newTask, [field]: dateString });
    };

    const handleEdit = (task: { id: number; title: string; description: string; stage: string; status: string; sendDate?: string; dueDate?: string; priority?: string; supervisor?: string; documents?: any[] }) => {
        setNewTask({ ...task, documents: task.documents || [] });
        setEditingTask(task);
        setIsModalVisible(true);
    };

    const handleDelete = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
        notification.success({ message: 'Tarea eliminada exitosamente' });
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.stage = result.destination.droppableId;
        updatedTasks.splice(result.destination.index, 0, movedTask);
        setTasks(updatedTasks);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (keys: React.Key[]) => void; selectedKeys: React.Key[]; confirm: () => void; clearFilters: () => void }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Buscar título"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={confirm}
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
            onFilter: (value: string, record: { title: string }) => record.title.toString().toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
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
            onFilter: (value: string, record: { status: string }) => record.status.includes(value),
            render: (status: string) => {
                let color = 'green';
                if (status === 'incompleta') {
                    color = 'red';
                } else if (status === 'en proceso') {
                    color = 'yellow';
                }
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Fecha de Envío',
            dataIndex: 'sendDate',
            key: 'sendDate',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (keys: React.Key[]) => void; selectedKeys: React.Key[]; confirm: () => void; clearFilters: () => void }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(date, dateString) => setSelectedKeys(dateString ? [dateString as string] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={confirm}
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
            onFilter: (value: string, record: { sendDate?: string }) => record.sendDate?.includes(value),
            sorter: (a: { sendDate?: string }, b: { sendDate?: string }) => moment(a.sendDate).unix() - moment(b.sendDate).unix(),
        },
        {
            title: 'Fecha de Vencimiento',
            dataIndex: 'dueDate',
            key: 'dueDate',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (keys: React.Key[]) => void; selectedKeys: React.Key[]; confirm: () => void; clearFilters: () => void }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(date, dateString) => setSelectedKeys(dateString ? [dateString as string] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={confirm}
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
            onFilter: (value: string, record: { dueDate?: string }) => record.dueDate?.includes(value),
            sorter: (a: { dueDate?: string }, b: { dueDate?: string }) => moment(a.dueDate).unix() - moment(b.dueDate).unix(),
        },
        {
            title: 'Prioridad',
            dataIndex: 'priority',
            key: 'priority',
            filters: [
                { text: 'Alta', value: 'alta' },
                { text: 'Media', value: 'media' },
                { text: 'Baja', value: 'baja' },
            ],
            onFilter: (value: string, record: { priority?: string }) => record.priority?.includes(value),
        },
        {
            title: 'Supervisor',
            dataIndex: 'supervisor',
            key: 'supervisor',
        },
        {
            title: 'Documentos',
            dataIndex: 'documents',
            key: 'documents',
            render: (documents: any[]) => documents.length,
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_text: string, record: { id: number; title: string; description: string; stage: string; status: string }) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </span>
            ),
        }
    ];

    return (
        <div className="tareas-page">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" className="send-progress-button">
                    Enviar Avances
                </Button>
            </div>
            <div className="header">
                <h1>Historial de Tareas</h1>
                <Button type="default" icon={<BellOutlined />}>
                    Avisos
                </Button>
            </div>
            <div className="new-tasks">
                <h2>Tareas</h2>
                <Table dataSource={tasks.filter(task => task.stage === 'asignada')} columns={columns as any} rowKey={(record) => record.id.toString()} />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="tasks-board">
                    {['asignada', 'en progreso', 'terminada - en revisión', 'implementación'].map(stage => (
                        <Droppable key={stage} droppableId={stage}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="task-column"
                                >
                                    <h2>{stage}</h2>
                                    {tasks.filter(task => task.stage === stage).map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="task-card"
                                                >
                                                    <h3>{task.title}</h3>
                                                    <p>{task.description}</p>
                                                    <Button icon={<EditOutlined />} onClick={() => handleEdit(task)} />
                                                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(task.id)} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <Modal title={editingTask ? "Editar Tarea" : "Agregar Nueva Tarea"} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Form layout="vertical">
                        <Form.Item label="Estado">
                            <Select value={newTask.status} onChange={(value) => handleSelectChange(value, 'status')} dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}>
                                <Option value="enviada">Enviada</Option>
                                <Option value="incompleta">Incompleta</Option>
                                <Option value="en proceso">En Proceso</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Observaciones">
                            <Input.TextArea name="description" value={newTask.description} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Adjuntar Archivo">
                            <Upload>
                                <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default TareasPage;
