import React, { useEffect } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { FaCamera, FaUsers, FaList, FaStar, FaPhoneAlt } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { IoDocumentText, IoBook } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    state => state.authentication.isAuthenticated,
  );
  const isAdmin = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ]),
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="home-container">
        <Container>
          <h2 className="mb-4 sobre-nosotros">
            Bienvenido a Autoescuela Universitaria
          </h2>
          <Row className="justify-content-center align-items-center">
            <Col xs="12" md="6" className="text-center mb-4">
              <p className="mb-4">
                Contáctanos o inicia sesión para empezar tu camino hacia la
                independencia al volante.
              </p>
              <Button
                className="custom-button"
                color="primary"
                size="lg"
                tag={Link}
                to="/contact"
              >
                ¡Empieza ya!
              </Button>
            </Col>
            <Col xs="12" md="6" className="text-center">
              <img
                src="https://media.istockphoto.com/id/621601764/es/foto/conducir-coche-en-la-carretera.jpg?s=612x612&w=0&k=20&c=ydzbAPDnc4Xdd0iUpkHQM7Tf84bFrNAJ5vc7K6CgHew="
                alt="Autoescuela Universitaria"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="admin-container">
        <header className="admin-header">
          <h1>¡Bienvenido, Administrador!</h1>
        </header>
        <div className="button-container">
          <a href="/photos" className="button">
            <img
              src="content/images/foto.jpeg"
              alt="Fotos"
              className="button-image"
            />
            <FaCamera className="button-icon" />
            <span>Fotos</span>
          </a>
          <a
            href="/admin/user-management?page=1&sort=id,asc"
            className="button"
          >
            <img
              src="content/images/users.jpeg"
              alt="Usuarios"
              className="button-image"
            />
            <FaUsers className="button-icon" />
            <span>Usuarios</span>
          </a>
          <a href="/cobros" className="button">
            <img
              src="content/images/cobros.jpeg"
              alt="Cobros"
              className="button-image"
            />
            <MdAttachMoney className="button-icon" />
            <span>Cobros</span>
          </a>
          <a href="/examenes" className="button">
            <img
              src="content/images/exams.jpeg"
              alt="Exámenes"
              className="button-image"
            />
            <IoDocumentText className="button-icon" />
            <span>Exámenes</span>
          </a>
          <a href="/listaespera" className="button">
            <img
              src="content/images/waitlist.jpeg"
              alt="Lista de espera"
              className="button-image"
            />
            <FaList className="button-icon" />
            <span>Lista de espera</span>
          </a>
          <a href="/reviews" className="button">
            <img
              src="content/images/reviews.jpeg"
              alt="Reseñas"
              className="button-image"
            />
            <FaStar className="button-icon" />
            <span>Reseñas</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="admin-container">
        <header className="admin-header">
          <h1>¡Bienvenido de vuelta!</h1>
        </header>
        <div className="button-container">
          <a href="/photos" className="button">
            <img
              src="content/images/foto.jpeg"
              alt="Fotos"
              className="button-image"
            />
            <FaCamera className="button-icon" />
            <span>Fotos</span>
          </a>

          <a href="/exams" className="button">
            <img
              src="content/images/exams.jpeg"
              alt="Exámenes"
              className="button-image"
            />
            <IoDocumentText className="button-icon" />
            <span>Exámenes</span>
          </a>

          <a href="/waitlist" className="button">
            <img
              src="content/images/waitlist.jpeg"
              alt="Lista de espera"
              className="button-image"
            />
            <FaList className="button-icon" />
            <span>Lista de espera</span>
          </a>
          <a href="/reviews" className="button">
            <img
              src="content/images/reviews.jpeg"
              alt="Reseñas"
              className="button-image"
            />
            <FaStar className="button-icon" />
            <span>Reseñas</span>
          </a>
          <a href="/matferline" className="button">
            <img
              src="content/images/matferline-icon.png"
              alt="Reseñas"
              className="button-image"
            />
            <IoBook className="button-icon" />
            <span>Matferline</span>
          </a>
          <a href="/contact" className="button">
            <img
              src="content/images/contact.png"
              alt="Reseñas"
              className="button-image"
            />
            <FaPhoneAlt className="button-icon" />
            <span>Contáctanos</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
