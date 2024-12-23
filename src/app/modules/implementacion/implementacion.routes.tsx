import { Route, Routes } from 'react-router-dom'
import { Implementacion } from './pages/implementaciontabla'

export const ImplementacionRoutes = () => (
    <Routes>
        <Route
            path="implementacion"
            element={<Implementacion />}
        />
        <Route
            index
            element={<Implementacion />}
        />
    </Routes>
)