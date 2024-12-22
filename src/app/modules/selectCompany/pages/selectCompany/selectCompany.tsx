import { CompanyCard } from '@zeus/@components/companyCard'
import { KTIcon } from '@zeus/_zeus/helpers'
import { useEffect, useState } from 'react'
import './selectCompany.scss'
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx'

export function SelectCompany(): JSX.Element {
	const { currentUser } = useAuth()
	const roles = [
		{ id: '1', roleName: 'Programador', details: 'Back-end, Front-end-, Mobile, Full-stack, DB' },
		{ id: '2', roleName: 'Diseñador UX/UI', details: 'Diseñador UX/UI' },
		{ id: '3', roleName: 'Analista', details: 'Detalles del analista' },
		{ id: '4', roleName: 'Auditor', details: 'Auditor Socio representante de su país' },
		{ id: '5', roleName: 'Abogado', details: 'Detalles del abogado' },
		{ id: '6', roleName: 'Otros', details: 'Detalles de otros roles' }
	]

	return (
		<div className="select-company">
			<div className="container">
				<div className="welcome d-flex flex-row align-items-center gap-4 mb-4">
					<KTIcon iconName="user" className="user-icon" />
					<p className="fs-1 fw-bold m-0">
						Bienvenido Socio {currentUser?.first_name}
					</p>
				</div>

				<p className="fs-3 fw-bold">Escoje tu rol</p>

				<div className="company-grid">
					{roles.map((role, index) => (
						<CompanyCard
							key={index}
							companyName={role.roleName}
							companyDetails={role.details}
							companyId={role.id} />
					))}
				</div>
			</div>
		</div>
	)
}
