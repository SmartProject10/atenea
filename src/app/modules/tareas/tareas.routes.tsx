import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const TasksPage = lazy(() => import('./pages/taks'));
const ProcessPage = lazy(() => import('./pages/process'));
const BossPage = lazy(() => import('./pages/boss'));

const TareasRoutes: RouteObject[] = [
    {
        path: 'tasks',
        element: <TasksPage />,
    },
    {
        path: 'process',
        element: <ProcessPage />,
    },
    {
        path: 'boss',
        element: <BossPage />,
    },
];

export default TareasRoutes;