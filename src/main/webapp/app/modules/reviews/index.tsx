import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export default function Reviews() {
  const isAuthenticated = useAppSelector(
    state => state.authentication.isAuthenticated,
  );
  const isAdmin = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ]),
  );

  const [mockData, setMockData] = useState(() => {
    const cachedReviews = localStorage.getItem('reviews');
    return cachedReviews
      ? JSON.parse(cachedReviews)
      : [
          {
            rating: 5,
            message:
              'El instructor fue muy paciente y explicó todo con mucha claridad. ¡Recomendaría esta autoescuela a cualquiera!',
            user: 'AnaLópez21',
          },
          {
            rating: 4,
            message:
              'Me gustó la flexibilidad de horarios y las clases teóricas en línea. Aunque algunas clases prácticas fueron un poco cortas.',
            user: 'CarlosRamirez85',
          },
          {
            rating: 3,
            message:
              'La autoescuela está bien, pero creo que podrían mejorar el sistema de reservas para las prácticas.',
            user: 'LauraFernandez34',
          },
          {
            rating: 5,
            message:
              '¡Pasé a la primera! El equipo es muy profesional y se aseguran de que estés listo para el examen.',
            user: 'JorgeMartinez12',
          },
          {
            rating: 4,
            message:
              'Buena experiencia en general, aunque en algunos momentos había demasiada gente en la lista de espera.',
            user: 'MartaGomez77',
          },
          {
            rating: 2,
            message:
              'El instructor llegó tarde a varias clases y sentí que no aproveché el tiempo como esperaba.',
            user: 'LuisTorres90',
          },
        ];
  });

  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(mockData));
  }, [mockData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating > 0 && message.trim() !== '') {
      setMockData(
        (prev: { rating: number; message: string; user: string }[]) => [
          ...prev,
          { rating, message, user: 'ManolitoGafotas33' },
        ],
      );
      setRating(1);
      setMessage('');
      setIsModalOpen(false);
    }
  };

  const renderStars = (stars: number) => {
    return (
      <span
        style={{ color: '#FFD700', fontSize: '1.5rem', marginLeft: '10px' }}
      >
        {'★'.repeat(stars)}
        {'☆'.repeat(5 - stars)}
      </span>
    );
  };

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  return (
    <div
      style={{
        height: '60vh',
        overflowY: 'inherit',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px 20px 50px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '20px',
            marginTop: '2vh',
          }}
        >
          {mockData.map(
            (
              review: { rating: number; message: string; user: string },
              index: number,
            ) => (
              <div
                key={index}
                style={{
                  border: 'none',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#e8e8e8',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <h3
                  style={{
                    color: '#01458e',
                    marginBottom: '5px',
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                  }}
                >
                  {review.user}
                  {renderStars(review.rating)}
                </h3>
                <p style={{ color: '#555', marginTop: '10px' }}>
                  {review.message}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      {isAuthenticated && !isAdmin && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#01458e',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          >
            + Añadir Reseña
          </button>

          {isModalOpen && (
            <div
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  width: '90%',
                  maxWidth: '400px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <h2 style={{ color: '#01458e', marginBottom: '20px' }}>
                  Añadir Reseña
                </h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '15px' }}>
                    <label
                      htmlFor="rating"
                      style={{ color: '#01458e', fontWeight: 'bold' }}
                    >
                      Valoración:
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '5px',
                        marginTop: '10px',
                      }}
                    >
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          onClick={() => handleStarClick(star)}
                          style={{
                            cursor: 'pointer',
                            fontSize: '2rem',
                            color: star <= rating ? '#FFD700' : '#ccc',
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label
                      htmlFor="message"
                      style={{ color: '#01458e', fontWeight: 'bold' }}
                    >
                      Tu Reseña:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginTop: '10px',
                      }}
                    ></textarea>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px',
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        backgroundColor: '#01458e',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Enviar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      style={{
                        backgroundColor: '#ccc',
                        color: '#333',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
