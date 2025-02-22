import { FC } from 'react'
import { Content } from '../../../_zeus/layout/components/content'
import { PageTitle } from '../../../_zeus/layout/core'
import { Bar, Line } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'

const DashboardWrapper: FC = () => {
  const navigate = useNavigate()

  // Data placeholders to be replaced with backend data
  const monthlyIncomeData = {
    labels: [],
    datasets: [
      {
        label: 'Ingresos Mensuales',
        backgroundColor: [],
        borderColor: '',
        borderWidth: 1,
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: [],
      },
    ],
  }

  const clientsData = {
    labels: [],
    datasets: [
      {
        label: 'Clientes',
        backgroundColor: [],
        borderColor: '',
        borderWidth: 1,
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: [],
      },
    ],
  }

  const usersData = {
    labels: [],
    datasets: [
      {
        label: 'Usuarios',
        backgroundColor: [],
        borderColor: '',
        borderWidth: 1,
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: [],
      },
    ],
  }
  
  const programmedHoursData = {
    labels: [],
    datasets: [
      {
        label: 'Horas Programadas',
        backgroundColor: [],
        borderColor: '',
        borderWidth: 1,
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: [],
      },
    ],
  }

  const rankingCountriesData = {
    labels: [],
    datasets: [
      {
        label: 'Ranking',
        backgroundColor: [],
        borderColor: '',
        borderWidth: 1,
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: [],
      },
    ],
  }

  const rankingProgrammersData = {
    labels: [],
    datasets: [
      {
        label: 'Horas trabajadas',
        backgroundColor: [],
        borderColor: '',
        borderWidth: 1,
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: [],
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
              <p>Utilidad Total: $0</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking de Ingresos por País</h3>
              <Bar data={rankingCountriesData} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Clientes</h3>
              <Line data={clientsData} />
              <p>Total de Clientes: 0</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking de Clientes</h3>
              <Bar data={rankingCountriesData} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Usuarios</h3>
              <Line data={usersData} />
              <p>Total de Usuarios: 0</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking de Usuarios</h3>
              <Bar data={rankingCountriesData} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Horas Trabajadas</h3>
              <Line data={programmedHoursData} />
              <p>Total de Programadores: 0</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Programadores con más horas trabajadas</h3>
              <Bar data={rankingProgrammersData} options={{ indexAxis: 'y' }} />
            </div>  
          </div>
        </div>
      </Content>
    </>
  )
}

export { DashboardWrapper }
