import React, { useState, useEffect } from 'react';
import { gameService } from '../services/dataService';
import './Common.css';

const Games = () => {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    dificultad: '',
    descripcion: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const response = await gameService.getAllGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error cargando juegos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await gameService.updateGame(editingId, formData);
        setEditingId(null);
      } else {
        await gameService.createGame(formData);
      }
      setFormData({ nombre: '', tipo: '', dificultad: '', descripcion: '' });
      loadGames();
    } catch (error) {
      console.error('Error guardando juego:', error);
      alert('Error al guardar juego');
    }
  };

  const handleEdit = (game) => {
    setFormData({
      nombre: game.nombre,
      tipo: game.tipo,
      dificultad: game.dificultad,
      descripcion: game.descripcion,
    });
    setEditingId(game.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      try {
        await gameService.deleteGame(id);
        loadGames();
      } catch (error) {
        console.error('Error eliminando juego:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ nombre: '', tipo: '', dificultad: '', descripcion: '' });
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1 className="page-title">🎮 Gestión de Juegos</h1>

      <div className="form-card">
        <h2>{editingId ? 'Editar Juego' : 'Nuevo Juego'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Juego:</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo:</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              required
            >
              <option value="">Seleccionar tipo</option>
              <option value="MEMORIA">Memoria</option>
              <option value="LOGICA">Lógica</option>
              <option value="ATENCION">Atención</option>
              <option value="CALCULO">Cálculo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dificultad:</label>
            <select
              value={formData.dificultad}
              onChange={(e) => setFormData({ ...formData, dificultad: e.target.value })}
              required
            >
              <option value="">Seleccionar dificultad</option>
              <option value="FACIL">Fácil</option>
              <option value="MEDIO">Medio</option>
              <option value="DIFICIL">Difícil</option>
            </select>
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows="3"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-card">
        <h2>Lista de Juegos</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Dificultad</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{game.nombre}</td>
                  <td><span className="badge">{game.tipo}</span></td>
                  <td><span className="badge badge-difficulty">{game.dificultad}</span></td>
                  <td>{game.descripcion}</td>
                  <td>
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(game)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(game.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {games.length === 0 && (
            <p className="empty-message">No hay juegos registrados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Games;

