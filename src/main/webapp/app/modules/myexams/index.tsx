import React from 'react';

export default function MyExams() {
  const mockData = [
    {
      teorico: true,
      fecha: '25/06/2024',
      aptitud: 'Apto',
      fallos: 0,
    },
    {
      teorico: false,
      fecha: '28/08/2024',
      aptitud: 'No apto',
      fallos: 4,
    },
    {
      teorico: false,
      fecha: '14/09/2024',
      aptitud: 'Apto',
      fallos: 0,
    },
    {
      teorico: false,
      fecha: '14/09/2024',
      aptitud: 'Apto',
      fallos: 0,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '10vh 2vw', // Espaciado alrededor del contenido
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* Título */}
      <h1 style={{ color: '#01458e', marginBottom: '3vh', fontSize: '4vh' }}>
        MIS EXÁMENES
      </h1>

      {/* Contenedor de exámenes */}
      <div
        style={{
          width: '100%',
          maxWidth: '50vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          maxHeight: 'calc(100vh - 12vh)', // Asegura que el contenedor no se salga de la vista
        }}
      >
        {mockData.map((exam, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '2vh',
              textAlign: 'center',
            }}
          >
            {/* Tipo de examen */}
            <h3
              style={{
                color: '#01458e',
                fontSize: '3vh',
                marginBottom: '2vh',
              }}
            >
              {exam.teorico ? 'Examen Teórico' : 'Examen Práctico'}
            </h3>

            {/* Detalles del examen */}
            <h5
              style={{
                marginBottom: '1vh',
                fontSize: '2.2vh',
                color: '#01458e',
              }}
            >
              <strong>Fecha:</strong> {exam.fecha}
            </h5>
            <h5
              style={{
                marginBottom: '1vh',
                fontSize: '2.2vh',
                color: '#01458e',
              }}
            >
              <strong>Aptitud:</strong>{' '}
              <span
                style={{
                  fontWeight: 'bold',
                  color: exam.aptitud === 'Apto' ? '#2ca02c' : '#d9534f',
                }}
              >
                {exam.aptitud}
              </span>
            </h5>
            <h5 style={{ fontSize: '2.2vh', color: '#01458e' }}>
              <strong>Fallos:</strong> {exam.fallos}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}
