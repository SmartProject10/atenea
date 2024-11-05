import { Route, Routes } from 'react-router-dom'
import { Comisiones } from './pages/comisonestabla'

export const ComisionesRoutes = () => (
	<Routes>
		<Route
			path="comisiones"
			element={<Comisiones />}
		/>
		<Route
			index
			element={<Comisiones />}
		/>
	</Routes>
)
