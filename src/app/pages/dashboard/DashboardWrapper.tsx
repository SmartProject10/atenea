import { FC, useState } from 'react'
import { Content } from '../../../_zeus/layout/components/content'
import { PageTitle } from '../../../_zeus/layout/core'
import { Line } from 'react-chartjs-2'
import { FaEdit, FaTrash } from 'react-icons/fa'

const DashboardWrapper: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  const monthlyIncomeData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Income',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [6500, 5900, 8000, 8100, 5600, 5500, 4000, 7000, 8500, 9000, 9500, 9800],
      },
    ],
  }

  const tableData = [
    { id: 1, number: 1, country: 'USA', ruc: '123456789', companyName: 'Company A', acquiredDate: '2023-01-01', amount: 10000, status: 'ACCEPTED' },
    { id: 2, number: 2, country: 'Canada', ruc: '987654321', companyName: 'Company B', acquiredDate: '2023-02-01', amount: 20000, status: 'PENDING' },
    { id: 3, number: 3, country: 'Mexico', ruc: '456789123', companyName: 'Company C', acquiredDate: '2023-03-01', amount: 15000, status: 'CANCELLED' },
    { id: 4, number: 4, country: 'Brazil', ruc: '789123456', companyName: 'Company D', acquiredDate: '2023-04-01', amount: 25000, status: 'REJECTED' },
  ]

  const filteredData = tableData.filter(item => {
    const matchesSearchTerm = item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ruc.includes(searchTerm) ||
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.acquiredDate.includes(searchTerm) ||
      item.amount.toString().includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus ? item.status.toLowerCase() === filterStatus.toLowerCase() : true
    const matchesDateFrom = filterDateFrom ? new Date(item.acquiredDate) >= new Date(filterDateFrom) : true
    const matchesDateTo = filterDateTo ? new Date(item.acquiredDate) <= new Date(filterDateTo) : true

    return matchesSearchTerm && matchesStatus && matchesDateFrom && matchesDateTo
  })

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting data...')
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Dashboard'}</PageTitle>
      <Content>
        <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
          <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-8 mb-md-5 mb-xl-10">
            <h3>INGRESOS</h3>
            <Line data={monthlyIncomeData} />
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-md-5 mb-xl-10">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">INFORMACIÓN</h5>
                <p><strong>Sección de clientes:</strong> 20 clientes</p>
                <p><strong>Número de usuarios:</strong> 4000</p>
                <p><strong>Ingreso acumulado:</strong> 80000</p>
                <p><strong>Ingreso promedio mensual:</strong> 9800</p>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive my-16">
          <div className="d-flex justify-content-between mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
            <select className="form-control form-control-sm mx-2" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Estado</option>
              <option value="ACCEPTED">Aceptado</option>
              <option value="PENDING">Pendiente</option>
              <option value="CANCELLED">Cancelado</option>
              <option value="REJECTED">Rechazado</option>
            </select>
            <input type="date" className="form-control form-control-sm mx-2" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} />
            <button className="btn btn-primary" onClick={handleExport}>
              Exportar
            </button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>N°</th>
                <th>País</th>
                <th>RUC</th>
                <th>NOMBRE EMPRESA</th>
                <th>FECHA ADQUIRIDA</th>
                <th>MONTO</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.number}</td>
                  <td>{item.country}</td>
                  <td>{item.ruc}</td>
                  <td>{item.companyName}</td>
                  <td>{item.acquiredDate}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </>
  )
}

export { DashboardWrapper }
