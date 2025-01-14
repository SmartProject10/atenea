import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Upload, Button, Row, Col } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

interface AssignModalProps {
    isVisible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const AssignModal: React.FC<AssignModalProps> = ({ isVisible, onOk, onCancel }) => {
    const [form] = Form.useForm();
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

    return (
        <Modal title="Asignar Tarea" open={isVisible} onOk={handleOk} onCancel={onCancel}>
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
                            label="Prioridad"
                            name="priority"
                            rules={[{ required: true, message: 'Por favor seleccione la prioridad' }]}
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
                            label="Supervisor"
                            name="supervisor"
                            rules={[{ required: true, message: 'Por favor busque un supervisor' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Buscar supervisor"
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
                            rules={[{ required: true, message: 'Por favor seleccione el tipo de programación' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Seleccione el tipo de programación"
                                optionFilterProp="children"
                            >
                                <Option value="back">Back</Option>
                                <Option value="front">Front</Option>
                                <Option value="mobile">Mobile</Option>
                                <Option value="fullstack">Fullstack</Option>
                                <Option value="devops">DevOps</Option>
                                <Option value="data">Data</Option>
                            </Select>
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
            </Form>
        </Modal>
    );
};

export default AssignModal;