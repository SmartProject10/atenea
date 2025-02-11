import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Upload, Button, Row, Col, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { Option } = Select;

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

interface TaskModalProps {
    isVisible: boolean;
    editingTask: Task | null;
    task: Task;
    show: boolean;
    handleClose: () => void;
    onSubmit: (newTask: Task) => void;
    onOk: () => void;
    onCancel: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (value: string | string[], field: string) => void;
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
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (isVisible) {
            form.setFieldsValue({
                ...task,
                lastDate: task.lastDate ? dayjs(task.lastDate) : null,
                dueDate: task.dueDate ? dayjs(task.dueDate) : null,
                assignmentDate: task.assignmentDate ? dayjs(task.assignmentDate) : null
            });
        }
    }, [isVisible, task, form]);

    const handleUpload = (info: any) => {
        let fileList = [...info.fileList];
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        setFileList(fileList);
        onSelectChange(fileList.map(file => file.name), 'materials');
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onOk();
            notification.success({
                message: 'La tarea ha sido actualizada exitosamente'
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Por favor complete todos los campos requeridos'
            });
        }
    };

    return (
        <Modal 
            title={editingTask ? "Editar Tarea" : "Agregar Nueva Tarea"} 
            open={isVisible} 
            onOk={handleSubmit} 
            onCancel={onCancel}
            width={800}
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            name="state"
                            label="Estado"
                            rules={[{ required: true, message: 'Por favor seleccione un estado' }]}
                        >
                            <Select 
                                onChange={(value) => onSelectChange(value, 'state')}
                            >
                                <Option value="completada">Completada</Option>
                                <Option value="en proceso">En Proceso</Option>
                                <Option value="pendiente">Pendiente</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            name="comments"
                            label="Comentarios"
                            rules={[{ required: true, message: 'Por favor ingrese los comentarios' }]}
                        >
                            <Input.TextArea name="comments" onChange={onChange} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* ...rest of your form fields... */}

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            name="materials"
                            label="Materiales"
                        >
                            <Upload
                                fileList={fileList}
                                onChange={handleUpload}
                                multiple
                            >
                                <Button icon={<UploadOutlined />}>Seleccionar Archivos</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            name="requiredTechnologies"
                            label="Tecnologías Requeridas"
                            rules={[{ required: true, message: 'Por favor seleccione al menos una tecnología' }]}
                        >
                            <Select
                                mode="multiple"
                                onChange={(value) => onSelectChange(value, 'requiredTechnologies')}
                            >
                                <Option value="Back">Back</Option>
                                <Option value="Front">Front</Option>
                                <Option value="Mobile">Mobile</Option>
                                <Option value="IA">IA</Option>
                                <Option value="Data">Data</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default TaskModal;
