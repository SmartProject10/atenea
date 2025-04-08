import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, notification, Table, Tag, DatePicker, Upload, Progress } from 'antd';
import { BellOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { saveAs } from 'file-saver';
import './pais.scss';
import moment from 'moment';

const { Option } = Select;

const PaisPage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pais, setPais] = useState<{ id: number; name: string; code: string;}[]>([

    ]);
    const [newPais, setNewPais] = useState<{ id: number; name: string; code: string;}>({ id: pais.length + 1, name: '', code: '' });
    const [editingPais, setEditingPais] = useState<{ id: number; name: string; code: string; } | null>(null);

    const showModal: () => void = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (editingPais) {
            setPais(pais.map(pais => (pais.id === editingPais.id ? newPais : pais)));
            setEditingPais(null);
        } else {
            setPais([...pais, newPais]);
        }
        setIsModalVisible(false);
        setNewPais({ id: pais.length + 1, name: '', code: '' });
        notification.success({ message: 'Tarea agregada exitosamente' });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingPais(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPais({ ...newPais, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string, field: string) => {
        setNewPais({ ...newPais, [field]: value });
    };

    const handleDateChange = (_date: any, dateString: string | string[], field: string) => {
        if (Array.isArray(dateString)) {
            dateString = dateString[0];
        }
        setNewPais({ ...newPais, [field]: dateString });
    };

    const handleEdit = (pais: { id: number; name: string; code: string;}) => {
        setNewPais({ ...pais || [] });
        setEditingPais(pais);
        setIsModalVisible(true);
    };

    const handleDelete = (id: number) => {
        setPais(pais.filter(task => task.id !== id));
        notification.success({ message: 'Tarea eliminada exitosamente' });
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        const updatedPais = Array.from(pais);
        const [movedPais] = updatedPais.splice(result.source.index, 1);
        updatedPais.splice(result.destination.index, 0, movedPais);
        setPais(updatedPais);
    };

    const exportToCSV = () => {
        const csvContent = [
            ['ID', 'Nombre', 'Código'],
            ...pais.map(pais => [
                pais.id,
                pais.name,
                pais.code
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'tareas.csv');
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
            title: 'Acciones',
            key: 'actions',
            render: (_text: string, record: { id: number; name: string; code: string;}) => (
                <span>
                    {/* <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)} /> */}
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
                <Button type="default" icon={<DownloadOutlined />} onClick={exportToCSV} style={{ marginLeft: 8 }}>
                    Exportar CSV
                </Button>
            </div>
            <div className="header">
                <h1>Historial de Tareas</h1>
                <Button type="default" icon={<BellOutlined />}>
                    Avisos
                </Button>
            </div>
            <div className="new-pais">
                <h2>Pais</h2>
                <Table dataSource={pais.filter(pais => pais.name != 'null')} columns={columns as any} rowKey={(record) => record.id.toString()} />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="pais-board">
                    {['asignada', 'en progreso', 'terminada - en revisión', 'implementación'].map(stage => (
                        <Droppable key={stage} droppableId={stage}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="task-column"
                                >
                                    <h2>{stage}</h2>
                                    {pais.filter(pais => pais.name !== 'null').map((pais, index) => (
                                        <Draggable key={pais.id} draggableId={pais.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="task-card"
                                                >
                                                    <h3>{pais.name}</h3>
                                                    <p>{pais.code}</p>
                                                    {/* <Progress percent={task.progress} /> */}
                                                    <Button icon={<EditOutlined />} onClick={() => handleEdit(pais)} />
                                                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(pais.id)} />
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
            <Modal title={editingPais ? "Editar Pais" : "Agregar Nuevo Pais"} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Form layout="vertical">
                        <Form.Item label="name">
                            <Input.TextArea name="name" value={newPais.name} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="code">
                            <Input.TextArea name="code" value={newPais.code} onChange={handleChange} />
                        </Form.Item>
                       
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default PaisPage;
