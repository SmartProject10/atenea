import { KTIcon } from '@zeus/_zeus/helpers'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

type Props = {
	toggleBtnClass?: string
	toggleBtnIconClass?: string
	menuPlacement?: string
	menuTrigger?: string
}

export const NavbarItemModules = ({
	toggleBtnClass = '',
	toggleBtnIconClass = 'fs-1',
	menuPlacement = 'bottom-end',
	menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {

	const MODULES = [
		{ module: 'ISO ⁠9001-20152', url: '#' },
		{ module: 'ISO 45001-20183', url: '#' },
	].filter(module => module.url !== window.location.pathname);

	return (
		<>
			{/* begin::Menu toggle */}
			<a
				href='#'
				className={clsx('btn btn-icon ', toggleBtnClass)}
				data-kt-menu-trigger={menuTrigger}
				title='ISOs Implementadas'
				data-kt-menu-attach='parent'
				data-kt-menu-placement={menuPlacement}
			>
				<KTIcon iconName='abstract-13' className={clsx('theme-dark-hide', toggleBtnIconClass)} />
			</a>
			{/* begin::Menu toggle */}

			<div
				className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
				data-kt-menu='true'
			>
				{MODULES.map((module, index) => (
					<div key={index} className='menu-item px-3 my-0'>
						<Link
							to={module.url}
							// className={clsx('menu-link px-3 py-2', { active: menuMode === 'system' })}
							className={clsx('menu-link px-3 py-2')}
						>
							<span className='menu-title'>{module.module}</span>
						</Link>
					</div>
				))}
			</div>
		</>
	)
}
