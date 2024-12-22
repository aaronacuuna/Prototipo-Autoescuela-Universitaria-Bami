import React, { useEffect } from 'react';

export default function Waitlist() {
  const mockPosition = 4; // Tu posición actual en la lista (1 es el primero).
  const totalPositions = 10; // Total de personas en la lista.

  // Cálculo del porcentaje de progreso en la barra
  const progressPercentage =
    ((totalPositions - mockPosition + 1) / totalPositions) * 100;

  useEffect(() => {
    // Desactivar la barra de desplazamiento en el cuerpo y html
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Limpiar al desmontar el componente
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Asegúrate de que el contenedor ocupe todo el alto
        padding: '20px',
        overflow: 'hidden', // Asegura que no haya desbordamiento dentro del contenedor
      }}
    >
      {/* Título */}
      <h1
        style={{
          color: '#01458e',
          fontSize: '2em',
          marginBottom: '20px',
        }}
      >
        LISTA DE ESPERA
      </h1>

      {/* Posición en la lista */}
      <div
        style={{
          color: '#01458e',
          fontSize: '6em',
          fontWeight: 'bold',
        }}
      >
        {mockPosition - 1}
      </div>

      {/* Texto adicional */}
      <p
        style={{
          fontSize: '1.2em',
          color: '#01458e',
          textAlign: 'center',
          margin: '10px 0',
        }}
      >
        PERSONAS POR DELANTE
      </p>

      {/* Barra de progreso */}
      <div
        style={{
          position: 'relative',
          width: '80%',
          maxWidth: '600px',
          height: '20px',
          borderRadius: '10px',
          backgroundColor: '#e8e8e8', // Fondo blanco de la barra
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        {/* Progreso */}
        <div
          style={{
            height: '100%',
            width: `${progressPercentage}%`,
            backgroundColor: '#01458e', // Color azul del progreso
            transition: 'width 0.3s ease',
          }}
        ></div>
      </div>
    </div>
  );
}
