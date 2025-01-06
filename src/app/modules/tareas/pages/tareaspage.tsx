import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker, Upload, Progress, Row, Col, notification, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import './tareaspage.scss';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';

const { Option } = Select;

const TareasPage: React.FC = () => {
    const [isMeetingModalVisible, setIsMeetingModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([
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
            documents: [],
            comments: '',
            progress: 0,
            difficulty: 'facil'
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
            documents: [],
            progress: 50,
            difficulty: 'medio',
            comments: ''
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
            documents: [],
            progress: 100,
            difficulty: 'dificil',
            comments: ''
        }
    ]);
    interface Task {
        id: number;
        title: string;
        description: string;
        stage: string;
        status: string;
        sendDate: string;
        dueDate: string;
        priority: string;
        supervisor: string;
        documents: any[];
        comments: string;
        progress: number;
        difficulty: string;
        assignedTo?: string;
    }
    
    const [newTask, setNewTask] = useState<Task>({ id: tasks.length + 1, title: '', description: '', stage: 'asignada', status: 'incompleta', sendDate: '', dueDate: '', priority: '', supervisor: '', documents: [], comments: '', progress: 0, difficulty: '', assignedTo: '' });
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const showModal = () => {
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
        setNewTask({ id: tasks.length + 1, title: '', description: '', stage: 'asignada', status: 'incompleta', sendDate: '', dueDate: '', priority: '', supervisor: '', documents: [], comments: '', progress: 0, difficulty: '' });
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

    const handleDateChange = (_date: moment.Moment | null, dateString: string | [string, string], field: string) => {
        if (Array.isArray(dateString)) {
            dateString = dateString[0];
        }
        setNewTask({ ...newTask, [field]: dateString });
    };

    const handleEdit = (task: typeof newTask) => {
        setNewTask({ ...task, documents: task.documents || [] });
        setEditingTask(task);
        setIsModalVisible(true);
    };

    const handleDelete = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
        notification.success({ message: 'Tarea eliminada exitosamente' });
    };

    const exportToCSV = () => {
        const csvContent = [
            ['ID', 'Título', 'Descripción', 'Estado', 'Fecha de Envío', 'Fecha de Vencimiento', 'Prioridad', 'Supervisor', 'Comentarios', 'Progreso'],
            ...tasks.map(task => [
                task.id,
                task.title,
                task.description,
                task.status,
                task.sendDate,
                task.dueDate,
                task.priority,
                task.supervisor,
                task.comments,
                task.progress
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'tareas.csv');
    };

    const columns: ColumnsType<typeof newTask> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (keys: React.Key[]) => void, selectedKeys: React.Key[], confirm: () => void, clearFilters?: () => void }) => (
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
            onFilter: (value, record: typeof newTask) => record.title.toString().toLowerCase().includes((value as string | number | boolean).toString().toLowerCase()),
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Asignado a',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
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
            onFilter: (value, record: typeof newTask) => record.status.includes((value as string | number | boolean).toString()),
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
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (keys: React.Key[]) => void, selectedKeys: React.Key[], confirm: () => void, clearFilters?: () => void }) => (
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
            onFilter: (value, record: typeof newTask) => record.sendDate?.includes((value as string).toString()),
            sorter: (a: typeof newTask, b: typeof newTask) => moment(a.sendDate).unix() - moment(b.sendDate).unix(),
        },
        {
            title: 'Fecha de Vencimiento',
            dataIndex: 'dueDate',
            key: 'dueDate',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (keys: React.Key[]) => void, selectedKeys: React.Key[], confirm: () => void, clearFilters?: () => void }) => (
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
            onFilter: (value, record: typeof newTask) => record.dueDate?.includes((value as string).toString()),
            sorter: (a: typeof newTask, b: typeof newTask) => moment(a.dueDate).unix() - moment(b.dueDate).unix(),
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
            onFilter: (value, record: typeof newTask) => record.priority?.includes((value as string).toString()),
        },
        {
            title: 'Supervisor',
            dataIndex: 'supervisor',
            key: 'supervisor',
        },
        {
            title: 'Materiales',
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
            title: 'Dificultad',
            dataIndex: 'difficulty',
            key: 'difficulty',
            filters: [
                { text: 'Fácil', value: 'facil' },
                { text: 'Medio', value: 'medio' },
                { text: 'Difícil', value: 'dificil' },
            ],
            onFilter: (value, record) => record.difficulty.includes(value as string),
        },
        {
            title: 'Reunión',
            key: 'meeting',
            render: (_text, record) => (
                <Button onClick={() => showMeetingModal(record)}>Reunión</Button>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_text: any, record: typeof newTask) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </span>
            ),
        }
    ];

    const showMeetingModal = (task: Task) => {
        setSelectedTask(task);
        setIsMeetingModalVisible(true);
    };

    const showAssignModal = () => {
        setIsAssignModalVisible(true);
    };

    const handleAssignOk = () => {
        // Handle the task assignment logic here
        setIsAssignModalVisible(false);
    };

    const handleAssignCancel = () => {
        setIsAssignModalVisible(false);
    };

    const latinCountries = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela'];
    const systems = ['Sistema 1', 'Sistema 2', 'Sistema 3'];
    const availableTasks = ['Tarea A', 'Tarea B', 'Tarea C'];

    return (
        <div className="tareas-page">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={showAssignModal} style={{ marginLeft: 8 }}>
                    Asignar Tarea
                </Button>
                <Button type="default" icon={<DownloadOutlined />} onClick={exportToCSV} style={{ marginLeft: 8 }}>
                    Exportar CSV
                </Button>
            </div>
            <div className="header">
                <h1>Tareas</h1>
            </div>
            <div className="new-tasks">
                <Table dataSource={tasks} columns={columns} rowKey={(record) => record.id.toString()} />
            </div>
            <Modal title="Asignar Tarea" open={isAssignModalVisible} onOk={handleAssignOk} onCancel={handleAssignCancel}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="País">
                                <Select placeholder="Seleccione el país">
                                    {latinCountries.map(country => (
                                        <Option key={country} value={country}>{country}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Sistema">
                                <Select placeholder="Seleccione el sistema">
                                    {systems.map(system => (
                                        <Option key={system} value={system}>{system}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Tarea">
                                <Select placeholder="Escoja la tarea disponible">
                                    {availableTasks.map(task => (
                                        <Option key={task} value={task}>{task}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Descripción">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Estado">
                            <Select placeholder="Asigne el estado">
                                    <Option value="incompleta">Incompleta</Option>
                                    <Option value="completa">Completa</Option>
                                    <Option value="enviada">Enviada</Option>
                                    <Option value="revisada">Revisada</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Fecha de Tarea">
                                <DatePicker defaultValue={moment()} disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Fecha de Vencimiento">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Prioridad">
                                <Select placeholder="Seleccione la prioridad">
                                    <Option value="alta">Alta</Option>
                                    <Option value="media">Media</Option>
                                    <Option value="baja">Baja</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Dificultad">
                                <Select placeholder="Seleccione la dificultad">
                                    <Option value="facil">Fácil</Option>
                                    <Option value="medio">Medio</Option>
                                    <Option value="dificil">Difícil</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Supervisor">
                                <Input suffix={<SearchOutlined />} placeholder="Buscar supervisor" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Materiales">
                                <Upload>
                                    <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tipo de Programación">
                                <Select placeholder="Seleccione el tipo de programación">
                                    <Option value="back">Back</Option>
                                    <Option value="front">Front</Option>
                                    <Option value="mobile">Mobile</Option>
                                    <Option value="otro">Otro</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Asignar a">
                                <Input suffix={<SearchOutlined />} placeholder="Buscar programador" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
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
                        <Form.Item label="Comentarios">
                            <Input.TextArea name="comments" value={newTask.comments} onChange={handleChange} />
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

