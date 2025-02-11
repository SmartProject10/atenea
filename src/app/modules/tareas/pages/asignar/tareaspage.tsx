import React, { useState } from 'react';
import { Button, notification, Select } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import './tareaspage.scss';
import TaskTable from './components/TaskTable';
import TaskModal from './components/TaskModal';
import AssignModal from './components/AssignModal';
import { Task } from './components/TaskTable';

const { Option } = Select;

const TareasAsignar: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'asdads',
            country: 'USA',
            system: 'Sistema A',
            estimatedHours: 10,
            description: 'Descripción de la tarea 1',
            status: 'incompleta',
            sendDate: '2025-01-01',
            dueDate: '2025-01-10',
            lastDate: '2025-01-05',
            priority: 'alta',
            programmingType: 'front',
            supervisor: 'Supervisor 1',
            documents: [],
            comments: 'corregir el endpoint',
            progress: 50,
            difficulty: 'facil',
            assignedTo: 'Developer 1',
            link: '',
        },
        {
            id: 2,
            title: 'Tarea 2',
            country: 'Mexico',
            system: 'Sistema B',
            estimatedHours: 20,
            description: 'Descripción de la tarea 2',
            status: 'completa',
            sendDate: '2025-01-02',
            dueDate: '2025-01-12',
            lastDate: '2025-01-07',
            priority: 'media',
            programmingType: 'front',
            supervisor: 'Supervisor 2',
            documents: [],
            comments: 'crear los componentes',
            progress: 75,
            difficulty: 'media',
            assignedTo: 'Developer 1',
            link: '',
        },
        {
            id: 3,
            title: 'Tarea 3',
            country: 'Canada',
            system: 'Sistema A',
            estimatedHours: 15,
            description: 'Descripción de la tarea 3',
            status: 'en proceso',
            sendDate: '2025-01-03',
            dueDate: '2025-01-13',
            lastDate: '2025-01-08',
            priority: 'baja',
            programmingType: 'back',
            supervisor: 'Supervisor 3',
            documents: [],
            comments: 'modificar el diseño',
            progress: 100,
            difficulty: 'dificil',
            assignedTo: 'Developer 2',
            link: '',
        }
    ]);

    const [newTask, setNewTask] = useState<Task>({
        id: tasks.length + 1,
        title: '',
        country: '',
        system: '',
        estimatedHours: 0,
        description: '',
        status: 'incompleta',
        sendDate: '',
        dueDate: '',
        lastDate: '',
        priority: '',
        programmingType: '',
        supervisor: '',
        documents: [],
        comments: '',
        progress: 0,
        difficulty: '',
        assignedTo: '',
        link: '',
    });

    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [countryFilter, setCountryFilter] = useState<string | null>(null);
    const [systemFilter, setSystemFilter] = useState<string | null>(null);

    const handleEdit = (task: Task) => {
        setNewTask({ ...task, documents: task.documents || [] });
        setEditingTask(task);
        setIsModalVisible(true);
    };

    const handleDelete = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
        notification.success({ message: 'Tarea eliminada exitosamente' });
    };

    const handleModalOk = () => {
        if (editingTask) {
            setTasks(tasks.map(task => task.id === editingTask.id ? newTask : task));
            setEditingTask(null);
        } else {
            setTasks([...tasks, newTask]);
        }
        setIsModalVisible(false);
        setNewTask({ ...newTask, id: tasks.length + 2 });
        notification.success({ message: 'Tarea guardada exitosamente' });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingTask(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string, field: string) => {
        setNewTask({ ...newTask, [field]: value });
    };

    const handleDateChange = (date: any, dateString: string, field: string) => {
        setNewTask({ ...newTask, [field]: dateString });
    };

    const exportToCSV = () => {
        const csvContent = [
            ['ID', 'Título', 'País', 'Sistema', 'Horas Estimadas', 'Descripción', 'Estado', 'Fecha de Envío', 'Fecha de Vencimiento', 'Última Fecha', 'Prioridad', 'Tipo de Programación', 'Supervisor', 'Comentarios', 'Progreso', 'Dificultad', 'Asignado a', 'Enlace'],
            ...tasks.map(task => [
                task.id,
                task.title,
                task.country,
                task.system,
                task.estimatedHours,
                task.description,
                task.status,
                task.sendDate,
                task.dueDate,
                task.lastDate,
                task.priority,
                task.programmingType || '',
                task.supervisor,
                task.comments,
                task.progress,
                task.difficulty,
                task.assignedTo || '',
                task.link,
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'tareas.csv');
    };

    const filteredTasks = tasks.filter(task => {
        return (!countryFilter || task.country === countryFilter) && (!systemFilter || task.system === systemFilter);
    });

    return (
        <div className="tareas-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                    <Button type="primary" onClick={() => setIsAssignModalVisible(true)} style={{ marginRight: '8px' }}>
                        Asignar Tarea
                    </Button>
                    <Button icon={<DownloadOutlined />} onClick={exportToCSV}>
                        Exportar CSV
                    </Button>
                </div>
            </div>

            <TaskTable
                tasks={filteredTasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <TaskModal
                isVisible={isModalVisible}
                editingTask={editingTask}
                task={newTask}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onDateChange={handleDateChange}
            />

            <AssignModal
                isVisible={isAssignModalVisible}
                onOk={() => {
                    setIsAssignModalVisible(false);
                    notification.success({ message: 'Tarea asignada exitosamente' });
                }}
                onCancel={() => setIsAssignModalVisible(false)}
            />
        </div>
    );
};

export default TareasAsignar;