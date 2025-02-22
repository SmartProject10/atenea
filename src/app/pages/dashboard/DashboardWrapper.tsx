import { FC } from 'react'
import { Content } from '../../../_zeus/layout/components/content'
import { ToolbarWrapper } from '../../../_zeus/layout/components/toolbar'
import { PageTitle } from '../../../_zeus/layout/core'
import { Bar, Line } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import './DashboardWrapper.scss'

const DashboardWrapper: FC = () => {
  const navigate = useNavigate()

  // Example data removed, to be fetched from backend
  const fetchData = async () => {
    // Fetch data from backend
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Dashboard'}</PageTitle>
      <Content>
        <div className="dashboard-wrapper">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ingresos Mensuales</h3>
              <Line data={{ datasets: [] }} />
              <p>Utilidad Total:</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking de Ingresos por País</h3>
              <Bar data={{ datasets: [] }} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Clientes</h3>
              <Line data={{ datasets: [] }} />
              <p>Total de Clientes:</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking de Clientes</h3>
              <Bar data={{ datasets: [] }} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Usuarios</h3>
              <Line data={{ datasets: [] }} />
              <p>Total de Usuarios:</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking de Usuarios</h3>
              <Bar data={{ datasets: [] }} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Horas Trabajadas</h3>
              <Line data={{ datasets: [] }} />
              <p>Total de Programadores:</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Programadores con más horas trabajadas</h3>
              <Bar data={{ datasets: [] }} options={{ indexAxis: 'y' }} />
              <button className="custom-button" onClick={() => navigate('/ranking')}>Ver todo el ranking</button>
            </div>  
          </div>
        </div>
      </Content>
    </>
  )
}

export { DashboardWrapper }
