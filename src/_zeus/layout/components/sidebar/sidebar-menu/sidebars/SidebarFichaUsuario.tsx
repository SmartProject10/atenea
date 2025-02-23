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

			<SidebarSubtitle label="empresa" />
			<SidebarMenuItem
				to="/dashboard"
				icon="minus-folder"
				title= "Ingresos"
				fontIcon="bi-currency-dollar"
			/>
			<SidebarMenuItem
				to="/comisiones"
				icon="abstract-1"
				title={intl.formatMessage({ id: "MENU.COMISIONES" })}
				fontIcon="bi-app-indicator"
			/>
			<SidebarMenuItem
				to="/implementacion"
				icon="gear"
				title={intl.formatMessage({ id: "MENU.IMPLEMENTACION" })}
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
