import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Upload, Button, Row, Col, Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

interface AssignModalProps {
    isVisible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const AssignModal: React.FC<AssignModalProps> = ({ isVisible, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // Watch for changes in programmingType
    Form.useWatch('programmingType', form);

    const latinCountries = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela'];
    const systems = ['Sistema 1', 'Sistema 2', 'Sistema 3'];
    const availableTasks = ['Tarea A', 'Tarea B', 'Tarea C'];

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                form.resetFields();
                onOk();
                // Aquí puedes agregar la lógica para agregar los datos a la tabla
                console.log('Valores del formulario:', values);
            })
            .catch(info => {
                console.log('Validación fallida:', info);
            });
    };

    const taskData = [
        { key: '1', number: '1', taskName: 'Tarea A', programmers: 'Juan Pérez, Ana García' },
        { key: '2', number: '2', taskName: 'Tarea B', programmers: 'Carlos López, María Rodriguez' },
        { key: '3', number: '3', taskName: 'Tarea C', programmers: 'Pedro Martinez, Laura Sánchez' },
    ];

    const columns = [
        { title: 'N°', dataIndex: 'number', key: 'number' },
        { title: 'Nombre de Tarea', dataIndex: 'taskName', key: 'taskName' },
        { title: 'Nombres de Programadores', dataIndex: 'programmers', key: 'programmers' },
    ];

    return (
        <Modal title="Asignar Tarea" open={isVisible} onOk={handleOk} onCancel={onCancel} width={800}>
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="País"
                            name="country"
                            rules={[{ required: true, message: 'Por favor seleccione un país' }]}
                        >
                            <Select placeholder="Seleccione el país">
                                {latinCountries.map(country => (
                                    <Option key={country} value={country}>{country}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Sistema"
                            name="system"
                            rules={[{ required: true, message: 'Por favor seleccione un sistema' }]}
                        >
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
                        <Form.Item
                            label="Tareas Disponibles"
                            name="task"
                            rules={[{ required: true, message: 'Por favor escoja una tarea disponible' }]}
                        >
                            <Select placeholder="Escoja la tarea disponible">
                                {availableTasks.map(task => (
                                    <Option key={task} value={task}>{task}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Horas Estimadas"
                            name="estimatedHours"
                            rules={[
                                { required: true, message: 'Por favor ingrese las horas estimadas' },
                                { 
                                    validator: (_, value) => {
                                        if (!value || value < 1) {
                                            return Promise.reject('El valor debe ser mayor a 0');
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Ingrese las horas estimadas" min={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Estado"
                            name="status"
                        >
                            <Select defaultValue="incompleta" disabled>
                                <Option value="incompleta">Incompleta</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Fecha de Tarea"
                            name="taskDate"
                        >
                            <DatePicker defaultValue={moment()} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Fecha de Vencimiento"
                            name="dueDate"
                            rules={[{ required: true, message: 'Por favor seleccione la fecha de vencimiento' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Última Fecha"
                            name="lastDate"
                            rules={[{ required: true, message: 'Por favor seleccione la última fecha' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Dependencia"
                            name="priority"
                            rules={[{ required: true, message: 'Por favor seleccione la dependencia' }]}
                        >
                            <Select placeholder="Seleccione la prioridad">
                                <Option value="alta">Alta</Option>
                                <Option value="media">Media</Option>
                                <Option value="baja">Baja</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Descripción"
                            name="description"
                            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Dificultad"
                            name="difficulty"
                            rules={[{ required: true, message: 'Por favor seleccione la dificultad' }]}
                        >
                            <Select placeholder="Seleccione la dificultad">
                                <Option value="facil">Fácil</Option>
                                <Option value="medio">Medio</Option>
                                <Option value="dificil">Difícil</Option>
                                <Option value="complejo">Complejo</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Supervisor (Sublíder)"
                            name="supervisor"
                            rules={[{ required: true, message: 'Por favor busque un supervisor' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Buscar sublíder"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    { value: 'sup1', label: 'María Rodriguez' },
                                    { value: 'sup2', label: 'Pedro Martinez' },
                                    { value: 'sup3', label: 'Laura Sánchez' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Materiales"
                            name="materials"
                            rules={[{ required: true, message: 'Por favor seleccione un archivo' }]}
                        >
                            <Upload>
                                <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tipo de Programación"
                            name="programmingType"
                        >
                            <div>
                                    {['Back', 'Front', 'Mobile', 'IA', 'Data'].map(type => {
                                        const currentTypes = form.getFieldValue('programmingType') || [];
                                        const isSelected = currentTypes.includes(type);
                                        
                                        return !isSelected && (
                                            <Button
                                                key={type}
                                                onClick={() => {
                                                    const currentTypes = form.getFieldValue('programmingType') || [];
                                                    if (!currentTypes.includes(type)) {
                                                        form.setFieldsValue({ 
                                                            programmingType: [...currentTypes, type] 
                                                        });
                                                    }
                                                }}
                                                style={{ marginRight: 8, marginBottom: 8 }}
                                            >
                                                {type}
                                            </Button>
                                        );
                                    })}
                                </div>
                            <div style={{ marginTop: 8 }}>
                                {(form.getFieldValue('programmingType') || []).map((type: string) => (
                                    <Tag 
                                        key={type} 
                                        closable 
                                        onClose={() => {
                                            const currentTypes = form.getFieldValue('programmingType') || [];
                                            form.setFieldsValue({ 
                                                programmingType: currentTypes.filter((t: string) => t !== type) 
                                            });
                                        }}
                                    >
                                        {type}
                                    </Tag>
                                ))}
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Asignar a"
                            name="assignee"
                            rules={[{ required: true, message: 'Por favor seleccione un programador' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Buscar programador"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    { value: 'prog1', label: 'Juan Pérez' },
                                    { value: 'prog2', label: 'Ana García' },
                                    { value: 'prog3', label: 'Carlos López' },
                                    // Aquí puedes agregar más programadores
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Apoyo">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Select
                                        placeholder="Seleccione el país"
                                        onChange={value => setSelectedCountry(value)}
                                    >
                                        {latinCountries.map(country => (
                                            <Option key={country} value={country}>{country}</Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder="Seleccione el sistema"
                                        onChange={value => setSelectedSystem(value)}
                                        disabled={!selectedCountry}
                                    >
                                        {systems.map(system => (
                                            <Option key={system} value={system}>{system}</Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder="Seleccione la tarea"
                                        onChange={value => setSelectedTask(value)}
                                        disabled={!selectedSystem}
                                    >
                                        {availableTasks.map(task => (
                                            <Option key={task} value={task}>{task}</Option>
                                        ))}
                                    </Select>
                                </Col>
                            </Row>
                            {selectedTask && (
                                <Table
                                    columns={columns}
                                    dataSource={taskData}
                                    rowSelection={{ type: 'checkbox' }}
                                    style={{ marginTop: 16 }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AssignModal;