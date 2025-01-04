import { FC } from 'react'
import { Content } from '../../../_zeus/layout/components/content'
import { ToolbarWrapper } from '../../../_zeus/layout/components/toolbar'
import { PageTitle } from '../../../_zeus/layout/core'
import { Bar, Line } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import './DashboardWrapper.scss'

const DashboardWrapper: FC = () => {
  const navigate = useNavigate()

  const monthlyIncomeData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        label: 'Ingresos Mensuales',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  }

  const clientsData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        label: 'Clientes',
        backgroundColor: 'rgba(153,102,255,1)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.4)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: [12, 19, 3, 5, 2, 3, 9],
      },
    ],
  }

  const programmedHoursData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        label: 'Horas Programadas',
        backgroundColor: 'rgba(255,159,64,1)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,159,64,0.4)',
        hoverBorderColor: 'rgba(255,159,64,1)',
        data: [30, 45, 60, 70, 90, 100, 110],
      },
    ],
  }

  const usersData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        label: 'Usuarios',
        backgroundColor: 'rgba(54,162,235,1)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54,162,235,0.4)',
        hoverBorderColor: 'rgba(54,162,235,1)',
        data: [200, 300, 400, 500, 600, 700, 800],
      },
    ],
  }

  const rankingCountriesData = {
    labels: ['Perú', 'Colombia', 'Argentina', 'Ecuador', 'Alemania'],
    datasets: [
      {
        label: 'Ranking',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [12, 19, 3, 5, 2],
      },
    ],
  }

  const rankingProgrammersData = {
    labels: ['Cristian', 'Max', 'Airton', 'Maria', 'Patricia'],
    datasets: [
      {
        label: 'Horas trabajadas',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [100, 90, 55, 20, 10],
      },
    ],
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Dashboard'}</PageTitle>
      <Content>
        <div className="dashboard-wrapper">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ingresos Mensuales</h3>
              <Line data={monthlyIncomeData} />
              <p>Utilidad Total: $100,000</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking por País</h3>
              <Bar data={rankingCountriesData} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Clientes</h3>
              <Line data={clientsData} />
              <p>Total de Clientes: 100</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking por País</h3>
              <Bar data={rankingCountriesData} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Horas Trabajadas</h3>
              <Line data={programmedHoursData} />
              <p>Total de Programadores: 50</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Top Programadores con más horas</h3>
              <Bar data={rankingProgrammersData} options={{ indexAxis: 'y' }} />
              <button className="custom-button" onClick={() => navigate('/ranking')}>Ver todo el ranking</button>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Usuarios</h3>
              <Line data={usersData} />
              <p>Total de Usuarios: 800</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking por País</h3>
              <Bar data={rankingCountriesData} options={{ indexAxis: 'y' }} />
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export { DashboardWrapper }
