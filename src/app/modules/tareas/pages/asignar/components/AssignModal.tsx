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

    // Watch for changes in programmingType
    Form.useWatch('programmingType', form);

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                form.resetFields();
                onOk();
                // Aquí puedes agregar la lógica para enviar los datos al backend
                console.log('Valores del formulario:', values);
            })
            .catch(info => {
                console.log('Validación fallida:', info);
            });
    };

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
                                {/* Opciones de países */}
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
                                {/* Opciones de sistemas */}
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
                                {/* Opciones de tareas */}
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
                                {/* Opciones de prioridad */}
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
                                {/* Opciones de dificultad */}
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
                                    ((option as any)?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    // Opciones de supervisores
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
                                    ((option as any)?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    // Opciones de programadores
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
                                        {/* Opciones de países */}
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder="Seleccione el sistema"
                                        onChange={value => setSelectedSystem(value)}
                                        disabled={!selectedCountry}
                                    >
                                        {/* Opciones de sistemas */}
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder="Seleccione la tarea"
                                        onChange={value => setSelectedTask(value)}
                                        disabled={!selectedSystem}
                                    >
                                        {/* Opciones de tareas */}
                                    </Select>
                                </Col>
                            </Row>
                            {selectedTask && (
                                <Table
                                    columns={columns}
                                    dataSource={[]}
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
