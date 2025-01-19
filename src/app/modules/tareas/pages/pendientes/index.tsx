import React from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';

const TareasListaPage: React.FC = () => {
    const data = [
        {
            numero: 1,
            pais: 'USA',
            sistema: '27001',
            nombreTarea: 'Actualizar Sistema',
            fechaEnvio: '2023-10-01',
            estado: 'Pendiente',
            tecnologias: 'mobile, ia',
            comentarios: 'Actualizar a la última versión',
        },
        // Agrega más datos aquí
    ];

    const columns = [
        {
            title: 'N°',
            dataIndex: 'numero',
            key: 'numero',
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
        },
        {
            title: 'Sistema',
            dataIndex: 'sistema',
            key: 'sistema',
        },
        {
            title: 'Nombre de la Tarea',
            dataIndex: 'nombreTarea',
            key: 'nombreTarea',
        },
        {
            title: 'Fecha de Envío',
            dataIndex: 'fechaEnvio',
            key: 'fechaEnvio',
            sorter: (a: any, b: any) => moment(a.fechaEnvio).unix() - moment(b.fechaEnvio).unix(),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado: string) => {
                let color = estado === 'Pendiente' ? 'red' : 'green';
                return <Tag color={color}>{estado.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Tecnologías',
            dataIndex: 'tecnologias',
            key: 'tecnologias',
        },
        {
            title: 'Comentarios',
            dataIndex: 'comentarios',
            key: 'comentarios',
        },
    ];

    return (
        <div>
            <h1>Tareas pendientes para asignar</h1>
            <Table dataSource={data} columns={columns} rowKey="numero" />
        </div>
    );
};

export default TareasListaPage;