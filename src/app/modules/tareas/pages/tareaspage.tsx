import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import './tareaspage.scss';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';
import AssignModal from '../components/AssignModal';
import { Task } from '../components/TaskTable';

const TareasPage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Tarea 1',
            description: 'Descripción de la tarea 1',
            stage: 'asignada',
            status: 'incompleta',
            sendDate: '2025-01-01',
            dueDate: '2025-01-10',
            priority: 'alta',
            supervisor: 'Supervisor 1',
            documents: [],
            comments: 'corregir el endpoint',
            progress: 50,
            difficulty: 'facil',
            link: ''
        },
        {
            id: 2,
            title: 'Tarea 2',
            description: 'Descripción de la tarea 2',
            stage: 'en proceso',
            status: 'completa',
            sendDate: '2025-01-02',
            dueDate: '2025-01-12',
            priority: 'media',
            supervisor: 'Supervisor 2',
            documents: [],
            comments: 'crear los componentes',
            progress: 75,
            difficulty: 'media',
            link: ''
        },
        {
            id: 3,
            title: 'Tarea 3',
            description: 'Descripción de la tarea 3',
            stage: 'en proceso',
            status: 'en proceso',
            sendDate: '2025-01-03',
            dueDate: '2025-01-13',
            priority: 'baja',
            supervisor: 'Supervisor 3',
            documents: [],
            comments: 'modificar el diseño',
            progress: 100,
            difficulty: 'dificil',
            link: ''
        }
    ]);

    const [newTask, setNewTask] = useState<Task>({
        id: tasks.length + 1,
        title: '',
        description: '',
        stage: 'asignada',
        status: 'incompleta',
        sendDate: '',
        dueDate: '',
        priority: '',
        supervisor: '',
        documents: [],
        comments: '',
        progress: 0,
        difficulty: '',
        assignedTo: '',
        link: ''
    });
    
    const [editingTask, setEditingTask] = useState<Task | null>(null);

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
            ['ID', 'Título', 'Descripción', 'Estado', 'Fecha de Envío', 'Fecha de Vencimiento', 'Prioridad', 'Supervisor', 'Comentarios', 'Progreso'],
            ...tasks.map(task => [
                task.id,
                task.title,
                task.description,
                task.status,
                task.sendDate,
                task.dueDate,
                task.priority,
                task.supervisor,
                task.comments,
                task.progress
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'tareas.csv');
    };

    return (
        <div className="tareas-page">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <Button type="primary" onClick={() => setIsAssignModalVisible(true)} style={{ marginRight: '8px' }}>
                    Asignar Tarea
                </Button>
                <Button icon={<DownloadOutlined />} onClick={exportToCSV}>
                    Exportar CSV
                </Button>
            </div>

            <TaskTable
                tasks={tasks}
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

export default TareasPage;