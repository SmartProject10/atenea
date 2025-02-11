import { lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_zeus/layout/MasterLayout'
import { FichaUsuarioRoutes } from '../modules/fichausuario/fichaUsuario.routes.tsx'
import TareasRoutes from '../modules/tareas/tareas.routes.tsx'
import { SociosRoutes } from '../modules/socios/socios.routes.tsx'
import { ComprasRoutes } from '../modules/compras/compras.routes.tsx'
import { HomeRoutes } from '../modules/home/home.routes.tsx'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { ProfileView } from '../modules/ProfileView';


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
				<Route path="tareas/*" element={<Outlet />} />
				<Route path="socios/*" element={<SociosRoutes />} />
				<Route path="compras/*" element={<ComprasRoutes />} />
				<Route path='/tareas/*' element={<Outlet />}>
                {TareasRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            	</Route>
				<Route path="profile/:id" element={<ProfileView />} />


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
