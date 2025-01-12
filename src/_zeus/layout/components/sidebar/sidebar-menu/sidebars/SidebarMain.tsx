import { useIntl } from "react-intl";
import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";
import { SidebarSubtitle } from "../components/SidebarSubtitle";


export function SidebarMain(): JSX.Element {
    const intl = useIntl();

    return (
		<>
			<SidebarMenuItem
				to="/dashboard"
				icon="home"
				title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
				fontIcon="bi-app-indicator"
			/>
			<SidebarSubtitle label="información personal" />
			<SidebarMenuItem
				to="/ficha-usuario"
				icon="user"
				title={intl.formatMessage({ id: "MENU.USER_TAB" })}
				fontIcon="bi-app-indicator"
			/>

			<SidebarMenuItem
				to="/tareas"
				icon="check-circle"
				title={intl.formatMessage({ id: "MENU.TAREAS" })}
				fontIcon="bi-app-indicator"
			/>
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
