import React from 'react'

const commissionsData = [
	{ id: 1, name: 'Comisión 1', amount: 100, date: '2023-01-01' },
	{ id: 2, name: 'Comisión 2', amount: 200, date: '2023-02-01' },
	{ id: 3, name: 'Comisión 3', amount: 300, date: '2023-03-01' },
]

export function Comisiones() {
	return (
		<div className="table-responsive">
			<table className="table table-hover table-rounded table-striped border gy-7 gs-7">
				<thead>
					<tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
						<th className="min-w-200px">#</th>
						<th className="min-w-400px">Nombre</th>
						<th className="min-w-100px">Monto</th>
						<th className="min-w-200px">Fecha</th>
					</tr>
				</thead>
				<tbody>
					{commissionsData.map((commission) => (
						<tr key={commission.id}>
							<td>{commission.id}</td>
							<td>{commission.name}</td>
							<td>{commission.amount}</td>
							<td>{commission.date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
