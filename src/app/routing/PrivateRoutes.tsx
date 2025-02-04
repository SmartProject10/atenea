import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_zeus/layout/MasterLayout'
import { FichaUsuarioRoutes } from '../modules/fichausuario/fichaUsuario.routes.tsx'
import { ComisionesRoutes } from '../modules/comisiones/comisiones.routes.tsx'
import { HomeRoutes } from '../modules/home/home.routes.tsx'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { Ranking } from '../modules/ranking/ranking.routes'; 
import { TareasRoutes } from '../modules/tareas/tareas.routes.tsx'
import { MenuTestPage } from '../pages/MenuTestPage'

const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage').then((module) => ({ default: module.WizardsPage })))
const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage').then((module) => ({ default: module.WidgetsPage })))
const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
const HumanResourcesPage = lazy(() => import('../modules/human-resources/HumanResourcesPage'))

export const PrivateRoutes = () => {
	const RedirectTo = () => <Navigate to="/select-company" />
	return (
		<Routes>
			<Route element={<MasterLayout />}>
				<Route index element={<RedirectTo />} />
				<Route path="auth/*" element={<RedirectTo />} />

				{/* Pages */}
				<Route path="home/*" element={<HomeRoutes />} />
				<Route path="dashboard" element={<DashboardWrapper />} />
				<Route path="menu-test" element={<MenuTestPage />} />
				<Route path="ficha-usuario/*" element={<FichaUsuarioRoutes />} />
				<Route path="comisiones/*" element={<ComisionesRoutes />} />
				<Route path="ranking/*" element={<Ranking />} />
				<Route path="tareas/*" element={<TareasRoutes />} />

				{/* ISO SOFTWARE MODULES */}
				<Route path="sgrrhh/*" element={<HumanResourcesPage />} />

				{/* Lazy Modules */}
				<Route path="crafted/pages/wizards/*" element={<WizardsPage />} />
				<Route path="crafted/widgets/*" element={<WidgetsPage />} />
				<Route path="crafted/account/*" element={<AccountPage />} />
				<Route path="apps/chat/*" element={<ChatPage />} />
				<Route path="apps/user-management/*" element={<UsersPage />} />

				{/* Page Not Found */}
				<Route path="/*" element={<Navigate to="/error/404" />} />
			</Route>
		</Routes>
	)
}
