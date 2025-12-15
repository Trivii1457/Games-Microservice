import React, { useState, useEffect } from 'react';
import { scoreService, userService, gameService } from '../services/dataService';
import './Common.css';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    gameId: '',
    score: '',
    duration: '',
  });
  const [selectedGame, setSelectedGame] = useState('');

  useEffect(() => {
    loadScores();
    loadUsers();
    loadGames();
  }, []);

  const loadScores = async () => {
    try {
      const response = await scoreService.getAllScores();
      setScores(response.data);
    } catch (error) {
      console.error('Error cargando puntajes:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const loadGames = async () => {
    try {
      const response = await gameService.getAllGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error cargando juegos:', error);
    }
  };

  const loadRanking = async () => {
    if (!selectedGame) return;
    try {
      const response = await scoreService.getRankingByGame(selectedGame);
      setScores(response.data);
    } catch (error) {
      console.error('Error cargando ranking:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scoreService.createScore({
        ...formData,
        userId: parseInt(formData.userId),
        gameId: parseInt(formData.gameId),
        score: parseInt(formData.score),
        duration: parseInt(formData.duration),
      });
      setFormData({ userId: '', gameId: '', score: '', duration: '' });
      loadScores();
    } catch (error) {
      console.error('Error guardando puntaje:', error);
      alert('Error al guardar puntaje');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este puntaje?')) {
      try {
        await scoreService.deleteScore(id);
        loadScores();
      } catch (error) {
        console.error('Error eliminando puntaje:', error);
      }
    }
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : 'Desconocido';
  };

  const getGameName = (gameId) => {
    const game = games.find((g) => g.id === gameId);
    return game ? game.nombre : 'Desconocido';
  };

  return (
    <div className="container">
      <h1 className="page-title">🏆 Gestión de Puntajes</h1>

      <div className="form-card">
        <h2>Nuevo Puntaje</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario:</label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              required
            >
              <option value="">Seleccionar usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Juego:</label>
            <select
              value={formData.gameId}
              onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
              required
            >
              <option value="">Seleccionar juego</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Puntaje:</label>
            <input
              type="number"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Duración (segundos):</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              min="0"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Registrar Puntaje
            </button>
          </div>
        </form>
      </div>

      <div className="filter-card">
        <h3>Ver Ranking por Juego</h3>
        <div className="filter-group">
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="">Todos los puntajes</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.nombre}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={loadRanking}>
            Ver Ranking
          </button>
          <button className="btn btn-secondary" onClick={() => { setSelectedGame(''); loadScores(); }}>
            Ver Todos
          </button>
        </div>
      </div>

      <div className="table-card">
        <h2>Lista de Puntajes</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Usuario</th>
                <th>Juego</th>
                <th>Puntaje</th>
                <th>Duración</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score.id}>
                  <td><span className="position">{index + 1}</span></td>
                  <td>{getUserName(score.userId)}</td>
                  <td>{getGameName(score.gameId)}</td>
                  <td><strong>{score.score}</strong></td>
                  <td>{score.duration}s</td>
                  <td>{new Date(score.fecha).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(score.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {scores.length === 0 && (
            <p className="empty-message">No hay puntajes registrados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scores;

