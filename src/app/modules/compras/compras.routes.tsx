import { Route, Routes } from 'react-router-dom'
import Compras from './pages/comprastable'

export const ComprasRoutes = () => (
    <Routes>
        <Route
            path="compras"
            element={<Compras />}
        />
        <Route
            index
            element={<Compras />}
        />
    </Routes>
)
