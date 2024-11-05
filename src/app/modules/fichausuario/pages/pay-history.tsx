import React from 'react'

function Pagination() {
	return (
		<ul className="pagination">
			<li className="page-item previous disabled">
				<a href="#" className="page-link">
					<i className="previous"></i>
				</a>
			</li>

			<li className="page-item "><a href="#" className="page-link">1</a></li>
			<li className="page-item active"><a href="#" className="page-link">2</a></li>
			<li className="page-item "><a href="#" className="page-link">3</a></li>
			<li className="page-item "><a href="#" className="page-link">4</a></li>
			<li className="page-item "><a href="#" className="page-link">5</a></li>
			<li className="page-item "><a href="#" className="page-link">6</a></li>

			<li className="page-item next">
				<a href="#" className="page-link">
					<i className="next"></i>
				</a>
			</li>
		</ul>
	)
}

const data = [
	{
		id: 1,
		numero: '1',
		fechaPago: '2023-01-01',
		metodoPago: 'Transferencia',
		beneficiario: 'Juan Pérez',
		descripcion: 'Pago de servicios',
		numeroReferencia: '123456',
		estadoPago: 'Completado',
		porcentajeUtilidad: '0.5%',
		notasAdicionales: 'Ninguna',
	},
]

function PayHistoryTable() {
	return (
		<div className="table-response my-16">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Número</th>
						<th>Fecha del pago</th>
						<th>Método de pago</th>
						<th>Beneficiario</th>
						<th>Descripción</th>
						<th>Número de referencia</th>
						<th>Estado del pago</th>
						<th>Porcentaje de utilidad recibida</th>
						<th>Notas adicionales</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.numero}</td>
									<td>{item.fechaPago}</td>
									<td>{item.metodoPago}</td>
									<td>{item.beneficiario}</td>
									<td>{item.descripcion}</td>
									<td>{item.numeroReferencia}</td>
									<td>{item.estadoPago}</td>
									<td>{item.porcentajeUtilidad}</td>
									<td>{item.notasAdicionales}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export function PayHistory() {
	return (
		<div className="card">
			<div className="card-body">
				<div className="card-content">
					<p>
						El historial de pagos permite a los usuarios almacenar y gestionar la información de los pagos realizados a sus familiares de manera segura y eficiente. Los datos registrados incluyen el número de pago, la fecha, el método de pago, el beneficiario, la descripción, el número de referencia, el estado del pago, el porcentaje de utilidad recibida y notas adicionales.
					</p>
				</div>
				<PayHistoryTable />
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination />
				</div>
			</div>
			<div className="card-footer">
				<button className="btn btn-primary">Exportar</button>
			</div>
		</div>
	)
}
