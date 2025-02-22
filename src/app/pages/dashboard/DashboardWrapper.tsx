import { FC } from 'react'
import { Content } from '../../../_zeus/layout/components/content'
import { ToolbarWrapper } from '../../../_zeus/layout/components/toolbar'
import { PageTitle } from '../../../_zeus/layout/core'
import { Bar, Line } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import './DashboardWrapper.scss'
import { useState, useEffect } from 'react';

const DashboardWrapper: FC = () => {
  const navigate = useNavigate()

  // Example data removed, replace with data fetched from backend
  const fetchData = async () => {
    // Fetch data from backend
  }

  const [stats, setStats] = useState({
    totalUtilidad: '',
    totalClientes: 0,
    totalProgramadores: 0,
    totalUsuarios: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from backend
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Dashboard'}</PageTitle>
      <Content>
        <div className="dashboard-wrapper">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ingresos Mensuales</h3>
              <Line data={{ datasets: [] }} />
              <p>Utilidad Total: {stats.totalUtilidad}</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Ranking por País</h3>
              <Bar data={{ datasets: [] }} options={{ indexAxis: 'y' }} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Clientes</h3>
              <Line data={{ datasets: [] }} />
              <p>Total de Clientes: {stats.totalClientes}</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Horas Trabajadas</h3>
              <Line data={{ datasets: [] }} />
              <p>Total de Programadores: {stats.totalProgramadores}</p>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Top Programadores con más horas</h3>
              <Bar data={{ datasets: [] }} options={{ indexAxis: 'y' }} />
              <button className="custom-button" onClick={() => navigate('/ranking')}>Ver todo el ranking</button>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
              <h3>Usuarios</h3>
              <Line data={{ datasets: [] }} />
              <p>Total de Usuarios: {stats.totalUsuarios}</p>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export { DashboardWrapper }

// The local useState function has been removed to avoid conflict with the imported useState from React.

