import React, { useState, useEffect } from 'react';
import { scoreService, gameService } from '../services/dataService';
import './Common.css';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');

  useEffect(() => {
    loadScores();
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

  const loadGames = async () => {
    try {
      const response = await gameService.getAllGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error cargando juegos:', error);
    }
  };

  const loadRanking = async () => {
    if (!selectedGame) {
      loadScores();
      return;
    }
    try {
      const response = await scoreService.getRankingByGame(selectedGame);
      setScores(response.data);
    } catch (error) {
      console.error('Error cargando ranking:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">🏆 Puntajes Globales</h1>

      <div className="filter-card">
        <h3>Filtrar por Juego</h3>
        <div className="filter-group">
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="">Todos los juegos</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.nombre}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={loadRanking}>
            Filtrar
          </button>
        </div>
      </div>

      <div className="table-card">
        <h2>Ranking de Puntajes</h2>
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
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score.id}>
                  <td><span className="position">{index + 1}</span></td>
                  <td><strong>{score.username || 'Desconocido'}</strong></td>
                  <td>{score.gameName || 'Desconocido'}</td>
                  <td><strong className="score-value">{score.score}</strong></td>
                  <td>{score.duration}s</td>
                  <td>{new Date(score.fecha).toLocaleDateString()}</td>
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

