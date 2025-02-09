import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const TasksPage = lazy(() => import('./pages/taks'));
const ProcessPage = lazy(() => import('./pages/process'));
const BossPage = lazy(() => import('./pages/boss'));

export const TareasRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/tareas/pages" />} />
            <Route path="taks" element={<TasksPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="boss" element={<BossPage />} />
        </Routes>
    );
};

export default TareasRoutes;