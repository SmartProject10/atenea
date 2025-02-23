import { useNavigate } from 'react-router-dom'
import './carousel.scss'
import { StatisticsWidget1 } from '../../../../_zeus/partials/widgets';
import { Home as HomePage } from '../pages/home';

import { useState } from 'react';

export function Home(): JSX.Element {
	const navigate = useNavigate()
	const [progress, setProgress] = useState<string>('0');
	const [earnings, setEarnings] = useState<string>('month'); // State to manage earnings filter
	const totalHours = 0; // Initialize totalHours with a default value

	const earningsData = {
		month: 5000,
		year: 60000,
		profitPercentage: 0.1
	};

	return (
		<div>
			<div className="d-flex flex-row justify-content-between">
				<div>
					<p className="fw-bold fs-1 mb-0">Inicio</p>
					<p className="text-muted fw-bold fs-7">Bienvenido, Socio Auditor</p>
				</div>

				<div>
					<button className="btn btn-secondary" onClick={() => navigate('/ficha-usuario')}>Ver mi perfil</button>
				</div>
			</div>

			<div id="kt_carousel_1_carousel" className="carousel carousel-custom slide" data-bs-ride="carousel" data-bs-interval="8000">
				<div className="d-flex align-items-center justify-content-between flex-wrap">
					<span className="fs-4 fw-bolder pe-2">Proyectos</span>
					<ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
						<li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="0" className="ms-1 active"></li>
						<li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="1" className="ms-1"></li>
						<li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="2" className="ms-1"></li>
					</ol>
				</div>

				<div className="carousel-inner pt-8">
					<div className="carousel-item active">
						<img src="/1.png" className="d-block w-100" alt="First slide" />
					</div>

					<div className="carousel-item">
						<img src="/2.png" className="d-block w-100" alt="Second slide" />
					</div>

					<div className="carousel-item">
						<img src="https://picsum.photos/600/200" className="d-block w-100" alt="Third slide" />
					</div>
				</div>
			</div>

			<div className="row mt-8">

				<div className="col-lg-4 col-md-6 col-xs-12">
					<StatisticsWidget1
						className="card-xl-stretch mb-xl-8"
						image="abstract-4.svg"
						title="Meeting Schedule"
						time="3:30PM - 4:20PM"
						description="Reunión para discutir los servicios<br/>y proyectos de ISO AND ISO"
					/>
				</div>
			</div>
		</div>
	)
}
