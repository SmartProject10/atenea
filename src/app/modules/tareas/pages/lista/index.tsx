import React, { useState } from 'react';
import { Table, Tag, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Option } = Select;

interface Programador {
    id: number;
    pais: string;
    nombre: string;
    tecnologias: string;
    fechaIngreso: string;
    rango?: string;
}

const ListaProgramadoresPage: React.FC = () => {
    const [filtroPais, setFiltroPais] = useState<string | undefined>(undefined);

    const programadores: Programador[] = [
        { id: 1, pais: 'Argentina', nombre: 'Juan Perez', tecnologias: 'React, Node.js', fechaIngreso: '2021-01-15' },
        { id: 2, pais: 'México', nombre: 'Ana Gomez', tecnologias: 'Angular, Java', fechaIngreso: '2020-06-23' },
        { id: 3, pais: 'España', nombre: 'Carlos Ruiz', tecnologias: 'Vue, Python', fechaIngreso: '2019-11-30' },
    ];

    const getRango = (fechaIngreso: string) => {
        const years = moment().diff(fechaIngreso, 'years');
        if (years >= 3) return 'Diamante';
        if (years >= 2) return 'Oro';
        if (years >= 1) return 'Plata';
        return 'Bronce';
    };

    const programadoresConRango = programadores.map(programador => ({
        ...programador,
        rango: getRango(programador.fechaIngreso),
    }));

    const programadoresFiltrados = filtroPais
        ? programadoresConRango.filter(programador => programador.pais === filtroPais)
        : programadoresConRango;

    const columns: ColumnsType<Programador> = [
        {
            title: 'N°',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Perfil Tecnológico',
            dataIndex: 'tecnologias',
            key: 'tecnologias',
        },
        {
            title: 'Fecha de Ingreso',
            dataIndex: 'fechaIngreso',
            key: 'fechaIngreso',
        },
        {
            title: 'Rango',
            dataIndex: 'rango',
            key: 'rango',
        },
        {
            title: 'Perfil',
            key: 'acciones',
            render: (text, record) => (
                <Link 
                    to={`/profile/${record.id}`} 
                    className="btn btn-sm btn-icon"
                    title="Ver perfil del programador"
                >
                    <i className="fas fa-eye"></i>
                </Link>
            ),
        },
    ];

    return (
        <div>
            <h1>Programadores Activos</h1>
            <Select
                placeholder="Selecciona un país"
                onChange={value => setFiltroPais(value)}
                style={{ width: 200, marginBottom: 20 }}
            >
                <Option value="Argentina">Argentina</Option>
                <Option value="México">México</Option>
                <Option value="España">España</Option>
            </Select>
            <Table dataSource={programadoresFiltrados} columns={columns} rowKey="id" />
        </div>
    );
};

export default ListaProgramadoresPage;