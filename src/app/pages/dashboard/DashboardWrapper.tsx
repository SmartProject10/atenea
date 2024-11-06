import { FC } from 'react'
import { Content } from '../../../_zeus/layout/components/content'
import { ToolbarWrapper } from '../../../_zeus/layout/components/toolbar'
import { PageTitle } from '../../../_zeus/layout/core'
import { Bar, Line } from 'react-chartjs-2'

const DashboardWrapper: FC = () => {
  const monthlyIncomeData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Income',
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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Clients',
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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Programmed Hours',
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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Users',
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
    labels: ['Country 1', 'Country 2', 'Country 3', 'Country 4', 'Country 5'],
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
    labels: ['Programmer 1', 'Programmer 2', 'Programmer 3', 'Programmer 4', 'Programmer 5'],
    datasets: [
      {
        label: 'Ranking',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [10, 20, 30, 40, 50],
      },
    ],
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Dashboard'}</PageTitle>
      <Content>
        <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Line data={monthlyIncomeData} />
            <p>Total Utility: $100,000</p>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Bar data={rankingCountriesData} />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Line data={clientsData} />
            <p>Total Clients: 100</p>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Bar data={rankingCountriesData} />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Line data={programmedHoursData} />
            <p>Total Programmers: 50</p>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Bar data={rankingProgrammersData} />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Line data={usersData} />
            <p>Total Users: 800</p>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <Bar data={rankingCountriesData} />
          </div>
        </div>
      </Content>
    </>
  )
}

export { DashboardWrapper }
