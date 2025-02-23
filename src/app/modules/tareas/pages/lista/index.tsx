import React, { useState, useEffect } from 'react';
import { Table, Select, Button, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    const [programadores, setProgramadores] = useState<Programador[]>([]);

    useEffect(() => {
        const fetchProgramadores = async () => {
            const response = await axios.get('/api/programadores');
            setProgramadores(response.data);
        };
        fetchProgramadores();
    }, []);

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

    const programadoresFiltrados = programadoresConRango.filter(programador => {
        return filtroPais ? programador.pais === filtroPais : true;
    });

    const columns: ColumnsType<Programador> = [
        {
            title: 'N°',
            dataIndex: 'id',
            key: 'id',
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
            sorter: (a: any, b: any) => moment(a.fechaIngreso).unix() - moment(b.fechaIngreso).unix(),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(_, dateString) => setSelectedKeys(dateString ? [dateString as React.Key] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button type="primary" onClick={() => confirm({ closeDropdown: true })} size="small" style={{ width: 90, marginRight: 8 }}>
                        Buscar
                    </Button>
                    <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                        Resetear
                    </Button>
                </div>
            ),
        },
        {
            title: 'Rango',
            dataIndex: 'rango',
            key: 'rango',
        },
    ];

    return (
        <div>
            <h1>Programadores Activos</h1>
            <Select
                placeholder="Selecciona un país"
                onChange={value => setFiltroPais(value)}
                style={{ width: 200, marginBottom: 20, marginRight: 20 }}
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
