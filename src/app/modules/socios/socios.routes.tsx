import { Route, Routes } from 'react-router-dom'
import { Socios } from './pages/sociosdash'

export const SociosRoutes = () => (
    <Routes>
        <Route
            path="socios"
            element={<Socios />}
        />
        <Route
            index
            element={<Socios />}
        />
    </Routes>
)
