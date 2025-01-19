import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import TareasPendientesPage from './pages/pendientes/index';
import TareasListaPage from './pages/lista/index';
import TareasAsignar from './pages/asignar/tareaspage';


const TareasRoutes: RouteObject[] = [
    {
        path: 'pendientes',
        element: (
            <Suspense fallback={null}>
                <TareasPendientesPage />
            </Suspense>
        ),
    },
    {
        path: 'asignar',
        element: (
            <Suspense fallback={null}>
                <TareasAsignar />
            </Suspense>
        ),
    },
    {
        path: 'lista',
        element: (
            <Suspense fallback={null}>
                <TareasListaPage />
            </Suspense>
        ),
    },
];

export default TareasRoutes;