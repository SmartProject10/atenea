import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, notification, Table, Upload } from 'antd';
import { PlusOutlined, BellOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import './tareaspage.scss';

const { Option } = Select;

const TareasPage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState<{ title: string; description: string; stage: string; documents?: any[] }[]>([]);
    const [newTask, setNewTask] = useState<{ title: string; description: string; stage: string; documents: any[] }>({ title: '', description: '', stage: 'asignada', documents: [] });
    const [editingTask, setEditingTask] = useState<{ title: string; description: string; stage: string; documents?: any[] } | null>(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (editingTask) {
            setTasks(tasks.map(task => (task.title === editingTask.title ? newTask : task)));
            setEditingTask(null);
        } else {
            setTasks([...tasks, newTask]);
        }
        setIsModalVisible(false);
        setNewTask({ title: '', description: '', stage: 'asignada', documents: [] });
        notification.success({ message: 'Tarea agregada exitosamente' });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingTask(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setNewTask({ ...newTask, stage: value });
    };

    const handleEdit = (task: { title: string; description: string; stage: string; documents?: any[] }) => {
        setNewTask({ ...task, documents: task.documents || [] });
        setEditingTask(task);
        setIsModalVisible(true);
    };

    const handleDelete = (title: string) => {
        setTasks(tasks.filter(task => task.title !== title));
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

    const handleFileChange = (info: any) => {
        if (info.file.status === 'done') {
            setNewTask({ ...newTask, documents: [...newTask.documents, info.file] });
        }
    };

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Etapa',
            dataIndex: 'stage',
            key: 'stage',
        },
        {
            title: 'Documentos',
            key: 'documents',
            render: (text: string, record: { documents?: any[] }) => (
                <span>
                    {record.documents?.map((doc, index) => (
                        <a key={index} href={doc.url} target="_blank" rel="noopener noreferrer">
                            {doc.name}
                        </a>
                    ))}
                </span>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text: string, record: { title: string; description: string; stage: string }) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.title)} />
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
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Agregar Tarea
                </Button>
                <Button type="default" icon={<BellOutlined />}>
                    Avisos
                </Button>
            </div>
            <div className="new-tasks">
                <h2>Tareas Pendientes</h2>
                <Table dataSource={tasks.filter(task => task.stage === 'asignada')} columns={columns} rowKey={(record) => record.title} />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="tasks-board">
                    {['asignada', 'en progreso', 'terminada - en revisión', 'implementación'].map(stage => (
                        <Droppable key={stage} droppableId={stage}>
                            {(provided: DroppableProvided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="task-column"
                                >
                                    <h2>{stage}</h2>
                                    {tasks.filter(task => task.stage === stage).map((task, index) => (
                                        <Draggable key={task.title} draggableId={task.title} index={index}>
                                            {(provided: DraggableProvided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="task-card"
                                                >
                                                    <h3>{task.title}</h3>
                                                    <p>{task.description}</p>
                                                    <Button icon={<EditOutlined />} onClick={() => handleEdit(task)} />
                                                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(task.title)} />
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
            <Modal title={editingTask ? "Editar Tarea" : "Agregar Nueva Tarea"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Form layout="vertical">
                        <Form.Item label="Título">
                            <Input name="title" value={newTask.title} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Descripción">
                            <Input name="description" value={newTask.description} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Etapa">
                            <Select value={newTask.stage} onChange={handleSelectChange} dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}>
                                <Option value="asignada">Asignada</Option>
                                <Option value="en progreso">En Progreso</Option>
                                <Option value="terminada - en revisión">Terminada</Option>
                                <Option value="implementación">Implementación</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Documentos">
                            <Upload
                                name="documents"
                                multiple
                                action="/upload"
                                onChange={handleFileChange}
                                fileList={newTask.documents}
                            >
                                <Button icon={<UploadOutlined />}>Adjuntar Documentos</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div className="tasks-history">
                <h2>Tareas Enviadas</h2>
                <Table dataSource={tasks} columns={columns} rowKey={(record) => record.title} />
            </div>
        </div>
    );
};

export default TareasPage;