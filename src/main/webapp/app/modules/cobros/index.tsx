// Cobros.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLibros,
  createLibro,
  deleteLibro,
  updateLibro,
} from './cobrosSlice';
import { AppDispatch, RootState } from 'app/config/store';

import './libros.scss';

interface Libro {
  id: number;
  titulo: string;
  url: string;
}

const Cobros: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingLibroId, setEditingLibroId] = useState<number | null>(null);
  const [editTitulo, setEditTitulo] = useState<string>('');
  const [editUrl, setEditUrl] = useState<string>('');
  const [previousLibro, setPreviousLibro] = useState<Libro | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { libros, loading, errorMessage } = useSelector(
    (state: RootState) => state.libro,
  );

  const librosPerPage = 6;
  const totalPages = Math.ceil(libros.length / librosPerPage);

  const currentLibros = libros.slice(
    (currentPage - 1) * librosPerPage,
    currentPage * librosPerPage,
  );

  useEffect(() => {
    dispatch(fetchLibros());
  }, [dispatch]);

  const handleAddLibro = () => {
    if (titulo && url) {
      dispatch(createLibro({ titulo, url }));
      setTitulo('');
      setUrl('');
    } else {
      alert('Por favor completa ambos campos');
    }
  };

  const handleDeleteLibro = (id: number) => {
    const libroToDelete = libros.find(libro => libro.id === id);
    if (libroToDelete) {
      setPreviousLibro(libroToDelete);
      dispatch(deleteLibro(id));
    }
  };

  const handleUndoDelete = () => {
    if (previousLibro) {
      dispatch(createLibro(previousLibro));
      setPreviousLibro(null);
    }
  };

  const handleEditLibro = (libro: Libro) => {
    setIsEditing(true);
    setEditingLibroId(libro.id);
    setEditTitulo(libro.titulo);
    setEditUrl(libro.url);
  };

  const handleSaveEdit = () => {
    if (editTitulo && editUrl && editingLibroId !== null) {
      const libro = { id: editingLibroId, titulo: editTitulo, url: editUrl };
      dispatch(updateLibro(libro));
      setIsEditing(false);
      setEditingLibroId(null);
      setEditTitulo('');
      setEditUrl('');
    } else {
      alert('Por favor complete todos los campos de edición.');
    }
  };

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getFileTypeIcon = (fileUrl: string): string => {
    if (fileUrl.includes('document')) return 'content/images/word.png';
    if (fileUrl.includes('presentation'))
      return 'content/images/powerpoint.png';
    if (fileUrl.includes('spreadsheets')) return 'content/images/excel.png';
    if (fileUrl.includes('forms')) return 'content/images/form.png';
    return 'content/images/file.png';
  };

  return (
    <div className="libros-container">
      <h2>Gestión de Libros</h2>

      <div className="input-container">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <div className="buttons-container">
        <button
          onClick={handleAddLibro}
          disabled={loading}
          className="add-button"
        >
          {loading ? 'Cargando...' : 'Añadir Libro'}
        </button>
        {previousLibro && (
          <button className="undo-button" onClick={handleUndoDelete}>
            Deshacer
          </button>
        )}
      </div>

      <div className="libros-table">
        {loading && <p>Cargando libros...</p>}
        {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
        {!loading && !errorMessage && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Libro de cobros</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentLibros.map(libro => (
                  <tr key={libro.id}>
                    <td>
                      <img
                        src={getFileTypeIcon(libro.url)}
                        alt="File Type Icon"
                        className="file-type-icon"
                        style={{
                          width: '50px',
                          height: '60px',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    </td>
                    <td>
                      <a
                        href={libro.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="titulo-link"
                      >
                        {libro.titulo}
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteLibro(libro.id)}
                        className="delete-button"
                      >
                        Borrar
                      </button>
                      <button
                        onClick={() => handleEditLibro(libro)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Libro</h3>
            <div className="input-container">
              <label htmlFor="edit-titulo">Título</label>
              <input
                id="edit-titulo"
                type="text"
                value={editTitulo}
                onChange={e => setEditTitulo(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="edit-url">URL</label>
              <input
                id="edit-url"
                type="text"
                value={editUrl}
                onChange={e => setEditUrl(e.target.value)}
              />
            </div>
            <button onClick={handleSaveEdit} className="save-button">
              Guardar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cobros;
