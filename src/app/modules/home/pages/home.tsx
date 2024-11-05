import { useNavigate } from 'react-router-dom'
import './carousel.scss'

export function Home(): JSX.Element {
	const navigate = useNavigate()

	return (
		<div>
			<div
				className="d-flex flex-row justify-content-between">
				<div>
					<p
						className="fw-bold fs-1 mb-0">Inicio</p>
					<p
						className="text-muted fw-bold fs-7">Bienvenido, Socio de Iso and Iso</p>
				</div>

				<div>
					<button
						className="btn btn-secondary"
						onClick={() => navigate('/ficha-usuario')}>Ver mi perfil</button>
				</div>
			</div>

			<div
				id="kt_carousel_1_carousel"
				className="carousel carousel-custom slide"
				data-bs-ride="carousel"
				data-bs-interval="8000"
			>
				<div className="d-flex align-items-center justify-content-between flex-wrap">
					<span className="fs-4 fw-bolder pe-2">Proyectos</span>
					<ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
						<li
							data-bs-target="#kt_carousel_1_carousel"
							data-bs-slide-to="0"
							className="ms-1 active"
						></li>
						<li
							data-bs-target="#kt_carousel_1_carousel"
							data-bs-slide-to="1"
							className="ms-1"
						></li>
						<li
							data-bs-target="#kt_carousel_1_carousel"
							data-bs-slide-to="2"
							className="ms-1"
						></li>
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
						<img src="/3.png" className="d-block w-100" alt="Third slide" />
					</div>
				</div>
			</div>

			<div
				className="row mt-8">

				<div
					className="col-lg-4 col-md-6 col-xs-12">
					<div
						className="g-col-6 g-col-md-4">
						<div
							className="card">
							<div
								className="card-body">
								<div
									className="card-title fw-bold fs-1">Mesa de ayuda</div>
								<p
									className="fw-bold mt-0 mb-12">¿Necesitas asistencia o guía?</p>

								<p
									className="fw-light fs-6">
									Para consultas sobre la plataforma, los servicios de ISO AND ISO y otros temas,
									comunícate con nuestros expertos.
									El horario de atención es de lunes a viernes en horario de oficina.
								</p>

								<div
									className="card bg-gray">
									<div
										className="card-body">
										<p
											className="m-0 mb-2">Horario de respuesta</p>
										<p
											className="m-0 fw-bold">8:00 AM - 8:00 PM</p>
									</div>
								</div>
							</div>

							<button
								className="btn btn-bg-light btn-color-info">Registrar ticket de ayuda</button>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}
