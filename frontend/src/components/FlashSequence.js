import React, { useState } from 'react';
import './FlashSequence.css';

const FlashSequence = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, userTurn, success, failure
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [flashingIndex, setFlashingIndex] = useState(null);
  const [showingSequence, setShowingSequence] = useState(false);
  const [difficulty, setDifficulty] = useState('medio');
  const [message, setMessage] = useState('');
  
  const gridSize = 9; // 3x3 grid
  const boxes = Array.from({ length: gridSize }, (_, i) => i);

  // Difficulty settings
  const difficultySettings = {
    facil: { flashTime: 800, gapTime: 300, sequenceLength: 3 },
    medio: { flashTime: 600, gapTime: 200, sequenceLength: 4 },
    dificil: { flashTime: 400, gapTime: 150, sequenceLength: 5 }
  };

  const currentSettings = difficultySettings[difficulty];

  const startGame = () => {
    setGameState('playing');
    setLevel(1);
    setScore(0);
    setMessage('¡Memoriza la secuencia! 👀');
    generateNewSequence(1);
  };

  const generateNewSequence = (currentLevel) => {
    const sequenceLength = currentSettings.sequenceLength + currentLevel - 1;
    const newSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(Math.floor(Math.random() * gridSize));
    }
    setSequence(newSequence);
    setUserSequence([]);
    setTimeout(() => {
      playSequence(newSequence);
    }, 1000);
  };

  const playSequence = async (seq) => {
    setShowingSequence(true);
    setGameState('playing');
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => {
        setTimeout(() => {
          setFlashingIndex(seq[i]);
          resolve();
        }, currentSettings.gapTime);
      });
      
      await new Promise(resolve => {
        setTimeout(() => {
          setFlashingIndex(null);
          resolve();
        }, currentSettings.flashTime);
      });
    }
    
    setShowingSequence(false);
    setGameState('userTurn');
    setMessage('¡Tu turno! Repite la secuencia 🎯');
  };

  const handleBoxClick = (index) => {
    if (gameState !== 'userTurn' || showingSequence) return;
    
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);
    
    // Flash the clicked box
    setFlashingIndex(index);
    setTimeout(() => setFlashingIndex(null), 200);
    
    // Check if the click is correct
    const currentStep = newUserSequence.length - 1;
    if (newUserSequence[currentStep] !== sequence[currentStep]) {
      // Wrong answer
      setGameState('failure');
      setMessage('❌ ¡Incorrecto! Juego terminado');
      return;
    }
    
    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      // Correct sequence!
      const levelScore = sequence.length * 10;
      setScore(score + levelScore);
      setGameState('success');
      setMessage(`✅ ¡Correcto! +${levelScore} puntos`);
      
      setTimeout(() => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        setMessage(`Nivel ${nextLevel} - ¡Prepárate! 🚀`);
        setTimeout(() => {
          generateNewSequence(nextLevel);
        }, 1500);
      }, 1500);
    }
  };

  const restartGame = () => {
    setGameState('menu');
    setSequence([]);
    setUserSequence([]);
    setLevel(1);
    setScore(0);
    setFlashingIndex(null);
    setMessage('');
  };

  return (
    <div className="flash-sequence-container">
      <div className="game-header">
        <h1 className="game-title">🧠 Secuencia Flash</h1>
        <p className="game-description">
          Memoriza la secuencia de cuadros iluminados y repítela en el orden correcto
        </p>
      </div>

      {gameState === 'menu' ? (
        <div className="game-menu">
          <div className="menu-card">
            <h2>Selecciona la Dificultad</h2>
            <div className="difficulty-selector">
              <button
                className={`difficulty-btn ${difficulty === 'facil' ? 'active' : ''}`}
                onClick={() => setDifficulty('facil')}
              >
                😊 Fácil
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'medio' ? 'active' : ''}`}
                onClick={() => setDifficulty('medio')}
              >
                😐 Medio
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'dificil' ? 'active' : ''}`}
                onClick={() => setDifficulty('dificil')}
              >
                😰 Difícil
              </button>
            </div>
            <button className="start-btn" onClick={startGame}>
              ▶️ Comenzar Juego
            </button>
            
            <div className="instructions">
              <h3>📋 Instrucciones</h3>
              <ul>
                <li>🔹 Observa la secuencia de cuadros que se iluminan</li>
                <li>🔹 Memoriza el orden en que aparecen</li>
                <li>🔹 Repite la secuencia haciendo clic en los cuadros</li>
                <li>🔹 Cada nivel aumenta la longitud de la secuencia</li>
                <li>🔹 ¡Intenta llegar lo más lejos posible!</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="game-play-area">
          <div className="game-stats">
            <div className="stat-box">
              <span className="stat-label">Nivel</span>
              <span className="stat-value">{level} 📊</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Puntaje</span>
              <span className="stat-value">{score} ⭐</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Progreso</span>
              <span className="stat-value">{userSequence.length}/{sequence.length} 🎯</span>
            </div>
          </div>

          <div className="game-message">
            <p>{message}</p>
          </div>

          <div className="game-grid">
            {boxes.map((box) => (
              <div
                key={box}
                className={`game-box ${flashingIndex === box ? 'flashing' : ''} ${
                  gameState === 'userTurn' ? 'clickable' : ''
                }`}
                onClick={() => handleBoxClick(box)}
              >
                <span className="box-number">{box + 1}</span>
              </div>
            ))}
          </div>

          <div className="game-controls">
            {gameState === 'failure' && (
              <>
                <div className="final-score">
                  <h2>🏁 Juego Terminado</h2>
                  <p>Puntaje Final: <strong>{score}</strong></p>
                  <p>Nivel Alcanzado: <strong>{level}</strong></p>
                </div>
                <button className="control-btn restart-btn" onClick={restartGame}>
                  🔄 Volver al Menú
                </button>
              </>
            )}
            {(gameState === 'playing' || gameState === 'userTurn' || gameState === 'success') && (
              <button className="control-btn quit-btn" onClick={restartGame}>
                🏠 Salir
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashSequence;
