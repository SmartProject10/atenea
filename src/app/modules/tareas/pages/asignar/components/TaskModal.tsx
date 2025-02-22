import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Upload, Button, Row, Col, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';

const { Option } = Select;

interface Task {
    id: number;
    status: string;
    comments: string;
    documents: any[];
    sendDate: string;
    link: string;
}

interface TaskModalProps {
    isVisible: boolean;
    editingTask: Task | null;
    task: Task;
    onOk: () => void;
    onCancel: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (value: string, field: string) => void;
    onDateChange: (date: Dayjs | null, dateString: string, field: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
    isVisible,
    editingTask,
    task,
    onOk,
    onCancel,
    onChange,
    onSelectChange,
    onDateChange
}) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);

    useEffect(() => {
        if (isVisible && !editingTask) {
            setSelectedCountry(null);
            setSelectedSystem(null);
            setSelectedTask(null);
        }
    }, [isVisible, editingTask]);

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        setSelectedSystem(null);
        setSelectedTask(null);
    };

    const handleSystemChange = (value: string) => {
        setSelectedSystem(value);
        setSelectedTask(null);
    };

    const handleTaskChange = (value: string) => {
        setSelectedTask(value);
    };

    const columns = [
        {
            title: 'N°',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Nombre de Tarea',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: 'Nombres de Programadores',
            dataIndex: 'programmers',
            key: 'programmers',
        },
    ];

    return (
        <Modal 
            title={editingTask ? "Editar Tarea" : "Agregar Nueva Tarea"} 
            open={isVisible} 
            onOk={onOk} 
            onCancel={onCancel}
            width={800}
        >
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Estado"
                            rules={[{ required: true, message: 'Por favor seleccione un estado' }]}
                        >
                            <Select 
                                value={task.status} 
                                onChange={(value) => onSelectChange(value, 'status')} 
                                dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                            >
                                {/* <Option value="enviada">Enviada</Option>
                                <Option value="incompleta">Incompleta</Option>
                                <Option value="en proceso">En Proceso</Option> */}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Comentarios"
                            rules={[{ required: true, message: 'Por favor ingrese comentarios' }]}
                        >
                            <Input.TextArea 
                                name="comments" 
                                value={task.comments} 
                                onChange={onChange} 
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Fecha de Vencimiento"
                            rules={[{ required: true, message: 'Por favor seleccione una fecha de vencimiento' }]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                                onChange={(date, dateString) => 
                                    onDateChange(date, dateString as string, 'dueDate')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Adjuntar Archivo"
                            rules={[{ required: true, message: 'Por favor adjunte un archivo' }]}
                        >
                            <Upload>
                                <Button icon={<UploadOutlined />}>
                                    Seleccionar Archivo
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Horario del Trabajador">
                            <Input 
                                value="Lunes a Viernes, 9:00 AM - 6:00 PM" 
                                disabled 
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <p><strong>Adjuntar meet</strong></p>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Fecha y Hora"
                            rules={[{ required: true, message: 'Por favor seleccione una fecha y hora' }]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={(date, dateString) => 
                                    onDateChange(date, dateString as string, 'sendDate')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Enlace meet"
                            rules={[{ required: true, message: 'Por favor ingrese el enlace' }]}
                        >
                            <Input 
                                name="link" 
                                value={task.link} 
                                onChange={onChange} 
                                placeholder="Ingrese el enlace" 
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <p><strong>Apoyo</strong></p>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item 
                            label="País"
                            rules={[{ required: true, message: 'Por favor seleccione un país' }]}
                        >
                            <Select 
                                value={selectedCountry} 
                                onChange={handleCountryChange}
                            >
                                {/* <Option value="pais1">País 1</Option>
                                <Option value="pais2">País 2</Option> */}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label="Sistema"
                            rules={[{ required: true, message: 'Por favor seleccione un sistema' }]}
                        >
                            <Select 
                                value={selectedSystem} 
                                onChange={handleSystemChange}
                                disabled={!selectedCountry}
                            >
                                {/* <Option value="sistema1">Sistema 1</Option>
                                <Option value="sistema2">Sistema 2</Option> */}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label="Lista de Tareas"
                            rules={[{ required: true, message: 'Por favor seleccione una tarea' }]}
                        >
                            <Select 
                                value={selectedTask} 
                                onChange={handleTaskChange}
                                disabled={!selectedSystem}
                            >
                                {/* <Option value="tarea1">Tarea 1</Option>
                                <Option value="tarea2">Tarea 2</Option> */}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {selectedTask && (
                    <Table 
                        columns={columns} 
                        dataSource={[]} 
                        rowSelection={{ type: 'checkbox' }} 
                    />
                )}
            </Form>
        </Modal>
    );
};

export default TaskModal;
