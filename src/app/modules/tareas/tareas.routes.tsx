import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { TasksPage } from './pages/taks/index';
import { ProcessPage } from './pages/process/index';
import BossPage from './pages/boss/index';


const TareasRoutes: RouteObject[] = [
    {
        path: 'taks',
        element: (
            <Suspense fallback={null}>
                <TasksPage/>
            </Suspense>
        ),
    },
    {
        path: 'process',
        element: (
            <Suspense fallback={null}>
                <ProcessPage />
            </Suspense>
        ),
    },
    {
        path: 'boss',
        element: (
            <Suspense fallback={null}>
                <BossPage />
            </Suspense>
        ),
    },
];

export default TareasRoutes;