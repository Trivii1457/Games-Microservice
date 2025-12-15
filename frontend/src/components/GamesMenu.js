import React from 'react';
import { Link } from 'react-router-dom';
import './GamesMenu.css';

const GamesMenu = () => {
  const games = [
    {
      id: 1,
      name: 'Secuencia Flash',
      emoji: '🧠',
      description: 'Memoriza y repite secuencias de cuadros iluminados',
      category: 'Memoria Visual',
      difficulty: 'Medio',
      path: '/play/flash-sequence'
    },
    {
      id: 2,
      name: 'Math Rush',
      emoji: '🧮',
      description: 'Resuelve operaciones matemáticas contra el reloj',
      category: 'Cálculo Rápido',
      difficulty: 'Variable',
      path: '/play/math-rush'
    },
    {
      id: 3,
      name: 'Patrón Oculto',
      emoji: '🔍',
      description: 'Identifica patrones matemáticos en secuencias',
      category: 'Lógica',
      difficulty: 'Medio',
      path: '/play/pattern-game'
    },
    {
      id: 4,
      name: 'Encuentra el Diferente',
      emoji: '👁️',
      description: 'Detecta el elemento diferente lo más rápido posible',
      category: 'Atención',
      difficulty: 'Fácil',
      path: '/play/find-different'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'fácil':
        return '#4caf50';
      case 'medio':
        return '#ff9800';
      case 'difícil':
        return '#f44336';
      default:
        return '#667eea';
    }
  };

  return (
    <div className="games-menu-container">
      <div className="games-menu-header">
        <h1 className="games-menu-title">🎮 Juegos Mentales Interactivos</h1>
        <p className="games-menu-subtitle">
          Selecciona un juego para entrenar tu mente
        </p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <Link to={game.path} key={game.id} className="game-card-link">
            <div className="game-card">
              <div className="game-card-header">
                <span className="game-emoji">{game.emoji}</span>
                <span className="game-category">{game.category}</span>
              </div>
              <div className="game-card-body">
                <h3 className="game-name">{game.name}</h3>
                <p className="game-description">{game.description}</p>
              </div>
              <div className="game-card-footer">
                <span 
                  className="game-difficulty"
                  style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
                >
                  {game.difficulty}
                </span>
                <span className="play-button">
                  Jugar ▶️
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="features-section">
        <h2>✨ Características</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <h4>Múltiples Categorías</h4>
            <p>Memoria, Lógica, Cálculo y Atención</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <h4>Sistema de Puntajes</h4>
            <p>Compite y mejora tus resultados</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h4>Dificultad Ajustable</h4>
            <p>Elige el nivel que más te desafíe</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏆</span>
            <h4>Rankings</h4>
            <p>Ve tu progreso y compite con otros</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>📋 Cómo Jugar</h2>
        <div className="info-steps">
          <div className="info-step">
            <span className="step-number">1</span>
            <p>Selecciona un juego de la lista anterior</p>
          </div>
          <div className="info-step">
            <span className="step-number">2</span>
            <p>Elige tu nivel de dificultad</p>
          </div>
          <div className="info-step">
            <span className="step-number">3</span>
            <p>¡Juega y mejora tu puntaje!</p>
          </div>
          <div className="info-step">
            <span className="step-number">4</span>
            <p>Revisa tus estadísticas y rankings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesMenu;
