import { useIntl } from "react-intl";
import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";
import { SidebarSubtitle } from "../components/SidebarSubtitle";

export const SidebarFichaUsuario = () => {
	const intl = useIntl();

	return (
		<>
			<SidebarMenuItem
				to="/home"
				icon="home"
				title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
				fontIcon="bi-app-indicator"
			/>
			<SidebarSubtitle label="Empresa" />
			<SidebarMenuItem
				to="/dashboard"
				icon="chart"
				title="Estadísticas"
				fontIcon="bi-app-indicator"
			/>

			<SidebarMenuItemWithSub
				to="/tareas"
				icon="check-circle"
				title={intl.formatMessage({ id: "MENU.TAREAS" })}
				fontIcon="bi-app-indicator"
			>
				<SidebarMenuItem
					to="/tareas/asignar"
					icon="calendar"
					title="Asignar"
					fontIcon="bi-app-indicator"
				/>

				<SidebarMenuItem
					to="/tareas/asig"
					icon="notification-bing"
					title="Sistemas en Proceso"
					fontIcon="bi-app-indicator"
				/>
				
				<SidebarMenuItem
					to="/tareas/lista"
					icon="profile-user"
					title="Líderes"
					fontIcon="bi-app-indicator"
				/>
			</SidebarMenuItemWithSub>

			<SidebarMenuItem
                to="/socios"
                icon="people"
                title={intl.formatMessage({ id: "MENU.SOCIOS" })}
                fontIcon="bi-app-indicator"
            />

			<SidebarMenuItem
				to="/compras"
				icon="shop"
				title={intl.formatMessage({ id: "MENU.COMPRAS" })}
				fontIcon="bi-app-indicator"
			/>
			<SidebarSubtitle label="soporte y ayuda" />
			<SidebarMenuItem
				to="/mesa-ayuda"
				icon="question-2"
				title="Ayuda"
				fontIcon="bi-app-indicator"
			/>
		</>
	);
};
