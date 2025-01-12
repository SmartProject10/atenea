import React, { useState } from 'react';
import { Modal, Button, Table, Form, Input, Select, DatePicker, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ComprasTable: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<any[]>([]);

    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            setData([...data, { ...values, key: values.rucEmpresa }]);
            form.resetFields();
            setVisible(false);
        });
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const columns = [
        { title: 'País', dataIndex: 'pais', key: 'pais' },
        { title: 'Nombre del sistema', dataIndex: 'nombreSistema', key: 'nombreSistema' },
        { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
        { title: 'Nombre de la empresa', dataIndex: 'nombreEmpresa', key: 'nombreEmpresa' },
        { title: 'RUC empresa', dataIndex: 'rucEmpresa', key: 'rucEmpresa' },
        { title: 'Fecha adquirida', dataIndex: 'fechaAdquirida', key: 'fechaAdquirida' },
        { title: 'Fecha de vencimiento', dataIndex: 'fechaVencimiento', key: 'fechaVencimiento' },
        { title: 'Monto pagado', dataIndex: 'montoPagado', key: 'montoPagado' },
        { title: 'Adjuntar facturas', dataIndex: 'adjuntarFacturas', key: 'adjuntarFacturas', render: (text: any) => <a href={text}>Ver archivo</a> },
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Agregar Compra
            </Button>
            <Modal
                title="Agregar Compra"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="pais" label="País" rules={[{ required: true, message: 'Por favor seleccione un país' }]}>
                        <Select placeholder="Seleccione un país">
                            <Option value="pais1">País 1</Option>
                            <Option value="pais2">País 2</Option>
                            <Option value="pais3">País 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="nombreSistema" label="Nombre del sistema" rules={[{ required: true, message: 'Por favor seleccione el nombre del sistema' }]}>
                        <Select placeholder="Seleccione un sistema">
                            <Option value="sistema1">Sistema 1</Option>
                            <Option value="sistema2">Sistema 2</Option>
                            <Option value="sistema3">Sistema 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="tipo" label="Tipo" rules={[{ required: true, message: 'Por favor seleccione un tipo' }]}>
                        <Select placeholder="Seleccione un tipo">
                            <Option value="venta">Venta</Option>
                            <Option value="alquiler">Alquiler</Option>
                            <Option value="compra">Compra</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="nombreEmpresa" label="Nombre de la empresa" rules={[{ required: true, message: 'Por favor ingrese el nombre de la empresa' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="rucEmpresa" label="RUC empresa" rules={[{ required: true, message: 'Por favor ingrese el RUC de la empresa' }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="fechaAdquirida" label="Fecha adquirida" rules={[{ required: true, message: 'Por favor seleccione la fecha adquirida' }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="fechaVencimiento" label="Fecha de vencimiento" rules={[{ required: true, message: 'Por favor seleccione la fecha de vencimiento' }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="montoPagado" label="Monto pagado" rules={[{ required: true, message: 'Por favor ingrese el monto pagado' }]}>
                        <InputNumber style={{ width: '100%' }} prefix="$" />
                    </Form.Item>
                    <Form.Item name="adjuntarFacturas" label="Adjuntar facturas" rules={[{ required: true, message: 'Por favor adjunte las facturas' }]}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Subir archivo</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={data} rowKey="rucEmpresa" />
        </div>
    );
};

export default ComprasTable;