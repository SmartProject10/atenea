import { Route, Routes } from 'react-router-dom'
import PaisPage from '../pages/pais'

export const PaisRoutes = () => (
    <Routes>
        <Route
            path="pais"
            element={<PaisPage />}
        />
        <Route
            index
            element={<PaisPage />}
        />  
    </Routes>
)
