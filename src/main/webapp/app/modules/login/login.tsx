import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { login } from 'app/shared/reducers/authentication';
import './Login.css';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    state => state.authentication.isAuthenticated,
  );
  const loginError = useAppSelector(state => state.authentication.loginError);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const pageLocation = useLocation();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogin = (username, password, rememberMe = false) =>
    dispatch(login(username, password, rememberMe));

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  const { from } = pageLocation.state || {
    from: { pathname: '/', search: pageLocation.search },
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="login-container">
      <div className="login-modal">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h1 className="login-title">Inicia Sesión</h1>
        <p className="login-subtitle">Accede a tu cuenta</p>
        <form
          className="login-form"
          onSubmit={e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const username = (
              form.elements.namedItem('username') as HTMLInputElement
            ).value;
            const password = (
              form.elements.namedItem('password') as HTMLInputElement
            ).value;
            const rememberMe = (
              form.elements.namedItem('rememberMe') as HTMLInputElement
            ).checked;
            handleLogin(username, password, rememberMe);
          }}
        >
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="input-group remember-me">
            <label htmlFor="rememberMe" className="checkbox-container">
              <input id="rememberMe" name="rememberMe" type="checkbox" />
              <span className="checkbox-custom"></span>
              <span className="remember-me-text">Recuérdame</span>
            </label>
          </div>
          {loginError && (
            <p className="error-message">Usuario o contraseña incorrectos</p>
          )}
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
