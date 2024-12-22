import React, { useState } from 'react';
import './ListaEspera.scss';

const ListaEspera = () => {
  const [lista, setLista] = useState([
    { id: 1, nombre: 'Juan Pérez Sánchez' },
    { id: 2, nombre: 'Domingo Ruiz Pérez' },
    { id: 3, nombre: 'Laura López Martín' },
    { id: 4, nombre: 'Elena Rodríguez Bernal' },
    { id: 5, nombre: 'Manuel Bernal Bernal' },
    { id: 6, nombre: 'Pedro Suárez Jiménez' },
    { id: 7, nombre: 'Julio Martín Lama' },
    { id: 8, nombre: 'Ana García Fernández' },
    { id: 9, nombre: 'Raúl Gutiérrez Fernández' },
    { id: 10, nombre: 'Isabel González Campos' },
    { id: 11, nombre: 'Andrés Castillo Sánchez' },
    { id: 12, nombre: 'Marta Jiménez Gómez' },
    { id: 13, nombre: 'Carolina Santos Durán' },
    { id: 14, nombre: 'Luis Méndez Velasco' },
    { id: 15, nombre: 'Ricardo Morales Pérez' },
    { id: 16, nombre: 'Cristina Delgado Pardo' },
    { id: 17, nombre: 'Hugo Domínguez Soriano' },
    { id: 18, nombre: 'Silvia Peña Moya' },
    { id: 19, nombre: 'Fernando Robles Calderón' },
    { id: 20, nombre: 'Alba Ramos Gómez' },
    { id: 21, nombre: 'Esteban Navarro Crespo' },
    { id: 22, nombre: 'Clara Sanz Molina' },
    { id: 23, nombre: 'Francisco Ortiz Herrera' },
    { id: 24, nombre: 'Paula Vargas Gálvez' },
    { id: 25, nombre: 'Nuria Rivas López' },
  ]);

  const [historial, setHistorial] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoAlumno, setNuevoAlumno] = useState('');

  const moverArriba = index => {
    if (index === 0) return;
    const nuevaLista = [...lista];
    [nuevaLista[index - 1], nuevaLista[index]] = [
      nuevaLista[index],
      nuevaLista[index - 1],
    ];
    registrarAccion(lista);
    setLista(nuevaLista);
  };

  const moverAbajo = index => {
    if (index === lista.length - 1) return;
    const nuevaLista = [...lista];
    [nuevaLista[index], nuevaLista[index + 1]] = [
      nuevaLista[index + 1],
      nuevaLista[index],
    ];
    registrarAccion(lista);
    setLista(nuevaLista);
  };

  const eliminarAlumno = index => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    registrarAccion(lista);
    setLista(nuevaLista);
  };

  const registrarAccion = estadoAnterior => {
    setHistorial([estadoAnterior, ...historial]);
  };

  const deshacer = () => {
    if (historial.length === 0) return;
    const estadoAnterior = historial[0];
    setHistorial(historial.slice(1));
    setLista(estadoAnterior);
  };

  const abrirModal = () => setModalVisible(true);

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevoAlumno('');
  };

  const añadirAlumno = () => {
    if (!nuevoAlumno.trim()) {
      alert('Por favor, ingrese un nombre válido.');
      return;
    }
    const nuevoId = lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;
    const nuevoAlumnoObj = { id: nuevoId, nombre: nuevoAlumno.trim() };
    registrarAccion(lista);
    setLista([...lista, nuevoAlumnoObj]);
    cerrarModal();
  };

  return (
    <div className="lista-espera">
      <h2>Lista de Espera</h2>
      <div className="botones-fijos">
        <button
          className="deshacer-boton"
          onClick={deshacer}
          disabled={historial.length === 0}
        >
          Deshacer
        </button>
        <button className="añadir-boton" onClick={abrirModal}>
          Añadir Alumno
        </button>
      </div>
      <table className="lista-espera-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Alumno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((alumno, index) => (
            <tr key={alumno.id} className="fila-lista">
              <td>{index + 1}</td>
              <td>{alumno.nombre}</td>
              <td>
                <div className="botones-accion">
                  <button
                    onClick={() => moverArriba(index)}
                    disabled={index === 0}
                    className="accion-boton subir"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moverAbajo(index)}
                    disabled={index === lista.length - 1}
                    className="accion-boton bajar"
                  >
                    ▼
                  </button>
                  <button
                    onClick={() => eliminarAlumno(index)}
                    className="accion-boton eliminar"
                  >
                    ✖
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>Añadir Nuevo Alumno</h3>
            <input
              type="text"
              value={nuevoAlumno}
              onChange={e => setNuevoAlumno(e.target.value)}
              placeholder="Nombre del alumno"
            />
            <div className="modal-botones">
              <button onClick={añadirAlumno}>Añadir</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaEspera;
