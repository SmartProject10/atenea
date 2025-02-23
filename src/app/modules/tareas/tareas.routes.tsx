import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import TareasPendientesPage from './pages/pendientes/index';
import TareasListaPage from './pages/lista/index';


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
        path: 'lista',
        element: (
            <Suspense fallback={null}>
                <TareasListaPage />
            </Suspense>
        ),
    },
];

export default TareasRoutes;