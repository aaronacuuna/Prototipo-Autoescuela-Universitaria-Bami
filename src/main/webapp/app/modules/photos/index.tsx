import React, { useState } from 'react';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export default function Photos() {
  const [mockData, setMockData] = useState([
    {
      admin: 'Marta Maldonado',
      description:
        'Enhorabuena a Guillermo por sacarse el carnet de conducir, eres un crack',
      url: 'content/images/happy_photo_1.jpg',
      student: 'Guillermo Martínez',
    },
    {
      admin: 'Franciso Millán',
      description:
        'Felicidades a Antonio, ya eres un peligro más en la carretera',
      url: 'content/images/happy_photo_2.jpeg',
      student: 'Antonio López',
    },
    {
      admin: 'Marta Maldonado',
      description:
        'Enhorabuena Luis, ya puedes ir a recoger a tus hijos al cole',
      url: 'content/images/happy_photo_3.jpeg',
      student: 'Luis Fernández',
    },
    {
      admin: 'Francisco Millán',
      description:
        'Muchas felicidades a Julia por sacarse el carnet de conducir',
      url: 'content/images/happy_photo_4.jpeg',
      student: 'Julia Gómez',
    },
  ]);

  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ]),
  );

  // Lista de alumnos con permiso de foto
  const studentList = [
    { name: 'Guillermo Martínez', hasPermission: true },
    { name: 'Antonio López', hasPermission: false },
    { name: 'Luis Fernández', hasPermission: true },
    { name: 'Julia Gómez', hasPermission: true },
    { name: 'Sofía Rodríguez', hasPermission: false },
    { name: 'Pedro Sánchez', hasPermission: true },
  ];

  const handleCreatePost = () => {
    if (!newImage || !selectedStudent) {
      alert('Por favor, selecciona una imagen y un alumno.');
      return;
    }

    const selectedStudentObj = studentList.find(
      student => student.name === selectedStudent,
    );

    if (!selectedStudentObj || !selectedStudentObj.hasPermission) {
      alert(
        `El alumno seleccionado, ${selectedStudent}, no tiene permiso para aparecer en fotos.`,
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newPost = {
        admin: 'Admin User',
        description: newDescription,
        url: reader.result as string,
        student: selectedStudent,
      };
      setMockData([...mockData, newPost]);
      setNewDescription('');
      setNewImage(null);
      setSelectedStudent('');
      setIsModalOpen(false);
    };
    reader.readAsDataURL(newImage);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '12vh 5vw',
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        marginTop: '0',
      }}
    >
      {isAdmin && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '15px 20px',
              fontSize: '16px',
              backgroundColor: '#01458e',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}
          >
            Añadir publicación
          </button>

          {isModalOpen && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                zIndex: 1000,
                width: '90%',
                maxWidth: '500px',
              }}
            >
              <h3 style={{ marginBottom: '10px', color: '#01458e' }}>
                Crear nueva publicación
              </h3>
              <textarea
                placeholder="Escribe un pie de foto..."
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  marginBottom: '10px',
                  resize: 'none',
                }}
              />
              <select
                value={selectedStudent}
                onChange={e => setSelectedStudent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  marginBottom: '10px',
                }}
              >
                <option value="" disabled>
                  Selecciona un alumno...
                </option>
                {studentList.map((student, index) => (
                  <option key={index} value={student.name}>
                    {student.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={e => setNewImage(e.target.files[0])}
                style={{
                  marginBottom: '10px',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#ccc',
                    color: '#000',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreatePost}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#01458e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Crear Publicación
                </button>
              </div>
            </div>
          )}
          {isModalOpen && (
            <div
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
            ></div>
          )}
        </>
      )}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flexGrow: 1,
        }}
      >
        {mockData.map((photo, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f9f9f9',
              marginBottom: index === mockData.length - 1 ? '50px' : '20px',
              textAlign: 'center',
            }}
          >
            <img
              src={photo.url}
              alt={`Foto de ${photo.student}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <div
              style={{
                padding: '15px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#01458e',
                    marginRight: '10px',
                  }}
                ></div>
                <strong style={{ fontSize: '1.2em', color: '#01458e' }}>
                  {photo.admin}
                </strong>
              </div>
              <p style={{ margin: '0', fontSize: '1em', color: '#555' }}>
                {photo.description}
              </p>
              <p style={{ margin: '0', fontSize: '0.9em', color: '#888' }}>
                Alumno: {photo.student}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
