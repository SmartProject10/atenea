import { Route, Routes } from 'react-router-dom'
import Tareas from './pages/tareaspage'

export const TareasRoutes = () => (
    <Routes>
        <Route
            path="tareas"
            element={<Tareas />}
        />
        <Route
            index
            element={<Tareas />}
        />
    </Routes>
)
