import React, { useState } from 'react';
import './scraper.scss';

const ScraperNotaComponent: React.FC = () => {
  const [dni, setDni] = useState<string>('');
  const [fechaNacimiento, setFechaNacimiento] = useState<string>('');
  const [fechaExamen, setFechaExamen] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    errores: number;
    apto: boolean;
    tipoExamen: string;
    fechaExamen: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleScrape = () => {
    if (!dni || !fechaNacimiento || !fechaExamen) {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    // Simulación de los resultados
    setTimeout(() => {
      const errores = Math.floor(Math.random() * 7); // Número aleatorio de errores (0-6)
      const apto = errores <= 3; // Si los errores son 3 o menos, el resultado es "Apto"
      const tipoExamen = Math.random() > 0.5 ? 'Teórico' : 'Práctico'; // Aleatorio entre Teórico y Práctico

      setResult({
        errores,
        apto,
        tipoExamen,
        fechaExamen, // Mantenemos la fecha de examen ingresada
      });

      setLoading(false);

      // Mostrar notificación por 3 segundos
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 1000); // Simulamos un tiempo de espera de 1 segundo
  };

  return (
    <div className="scraper-container">
      <h2>Resultados del Examen</h2>
      <div className="input-container">
        <label htmlFor="dni">DNI del alumno</label>
        <input
          id="dni"
          type="text"
          value={dni}
          onChange={e => setDni(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="fecha-examen">Fecha del examen</label>
        <input
          id="fecha-examen"
          type="date"
          value={fechaExamen}
          onChange={e => setFechaExamen(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="fecha-nacimiento">Fecha de nacimiento</label>
        <input
          id="fecha-nacimiento"
          type="date"
          value={fechaNacimiento}
          onChange={e => setFechaNacimiento(e.target.value)}
        />
      </div>
      <button onClick={handleScrape} disabled={loading}>
        {loading ? 'Cargando...' : 'ENVIAR'}
      </button>

      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
      {result && (
        <div className="result-message">
          <h3>Resultado</h3>
          <div className={`resultado ${result.apto ? 'apto' : 'no-apto'}`}>
            <p>
              <strong>Errores:</strong> {result.errores}
            </p>
            <p>
              <strong>Estado:</strong> {result.apto ? 'Apto' : 'No Apto'}
            </p>
            <p>
              <strong>Tipo de examen:</strong> {result.tipoExamen}
            </p>
            <p>
              <strong>Fecha del examen:</strong> {result.fechaExamen}
            </p>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="notification">
          <p>Resultado enviado al alumno</p>
        </div>
      )}
    </div>
  );
};

export default ScraperNotaComponent;
