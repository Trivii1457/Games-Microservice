import React, { useState, useEffect, useRef } from 'react';
import './FindDifferent.css';

const FindDifferent = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, finished
  const [items, setItems] = useState([]);
  const [differentIndex, setDifferentIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [difficulty, setDifficulty] = useState('medio');
  const [message, setMessage] = useState('');
  const [questionsToComplete, setQuestionsToComplete] = useState(10);
  const [currentType, setCurrentType] = useState('emoji');
  
  const timerRef = useRef(null);

  // Different types of items to display
  const itemSets = {
    emoji: {
      sets: [
        { normal: '😀', different: '😎' },
        { normal: '🐶', different: '🐱' },
        { normal: '⭐', different: '🌟' },
        { normal: '🍎', different: '🍊' },
        { normal: '🚗', different: '🚕' },
        { normal: '❤️', different: '💚' },
        { normal: '🎵', different: '🎶' },
        { normal: '🌙', different: '☀️' },
        { normal: '⚽', different: '🏀' },
        { normal: '🎨', different: '🖌️' }
      ]
    },
    numbers: {
      sets: [
        { normal: '8', different: '6' },
        { normal: '5', different: '2' },
        { normal: '0', different: 'O' },
        { normal: '1', different: 'l' },
        { normal: '9', different: '6' }
      ]
    },
    letters: {
      sets: [
        { normal: 'O', different: '0' },
        { normal: 'I', different: 'l' },
        { normal: 'S', different: '5' },
        { normal: 'B', different: '8' },
        { normal: 'Z', different: '2' }
      ]
    },
    shapes: {
      sets: [
        { normal: '●', different: '○' },
        { normal: '■', different: '□' },
        { normal: '▲', different: '△' },
        { normal: '♦', different: '◊' },
        { normal: '★', different: '☆' }
      ]
    }
  };

  const difficultySettings = {
    facil: { itemCount: 6, types: ['emoji'] },
    medio: { itemCount: 9, types: ['emoji', 'shapes'] },
    dificil: { itemCount: 12, types: ['emoji', 'numbers', 'letters', 'shapes'] }
  };

  const currentSettings = difficultySettings[difficulty];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const generateItems = () => {
    const types = currentSettings.types;
    const selectedType = types[Math.floor(Math.random() * types.length)];
    const sets = itemSets[selectedType].sets;
    const selectedSet = sets[Math.floor(Math.random() * sets.length)];
    
    const itemCount = currentSettings.itemCount;
    const differentIdx = Math.floor(Math.random() * itemCount);
    
    const newItems = Array(itemCount).fill(selectedSet.normal);
    newItems[differentIdx] = selectedSet.different;
    
    setItems(newItems);
    setDifferentIndex(differentIdx);
    setCurrentType(selectedType);
    setStartTime(Date.now());
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCorrectAnswers(0);
    setQuestionNumber(1);
    setTotalTime(0);
    setMessage('');
    generateItems();
  };

  const handleItemClick = (index) => {
    if (message !== '') return; // Prevent clicking during message display
    
    const timeElapsed = (Date.now() - startTime) / 1000; // in seconds
    const newTotalTime = totalTime + timeElapsed;
    setTotalTime(newTotalTime);
    
    if (index === differentIndex) {
      // Correct answer
      setCorrectAnswers(correctAnswers + 1);
      // Puntaje = 100 – tiempo_en_segundos × 3
      const questionScore = Math.max(0, Math.round(100 - (timeElapsed * 3)));
      setScore(score + questionScore);
      setMessage(`✅ ¡Correcto! +${questionScore} puntos (${timeElapsed.toFixed(2)}s)`);
    } else {
      // Wrong answer
      setMessage('❌ ¡Incorrecto! Ese no era el diferente');
    }

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (questionNumber >= questionsToComplete) {
      finishGame();
      return;
    }

    setQuestionNumber(questionNumber + 1);
    setMessage('');
    generateItems();
  };

  const finishGame = () => {
    setGameState('finished');
  };

  const restartGame = () => {
    setGameState('menu');
    setItems([]);
    setDifferentIndex(null);
    setScore(0);
    setCorrectAnswers(0);
    setQuestionNumber(1);
    setTotalTime(0);
    setMessage('');
  };

  const getGridClass = () => {
    const count = currentSettings.itemCount;
    if (count === 6) return 'grid-3x2';
    if (count === 9) return 'grid-3x3';
    if (count === 12) return 'grid-4x3';
    return 'grid-3x3';
  };

  return (
    <div className="find-different-container">
      <div className="game-header">
        <h1 className="game-title">👁️ Encuentra el Diferente</h1>
        <p className="game-description">
          Detecta el elemento diferente en el conjunto lo más rápido posible
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
                😊 Fácil<br/>
                <small>6 elementos • Emojis</small>
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'medio' ? 'active' : ''}`}
                onClick={() => setDifficulty('medio')}
              >
                😐 Medio<br/>
                <small>9 elementos • Varios tipos</small>
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'dificil' ? 'active' : ''}`}
                onClick={() => setDifficulty('dificil')}
              >
                😰 Difícil<br/>
                <small>12 elementos • Todos los tipos</small>
              </button>
            </div>

            <div className="question-count-selector">
              <label>Número de rondas:</label>
              <select 
                value={questionsToComplete} 
                onChange={(e) => setQuestionsToComplete(parseInt(e.target.value))}
              >
                <option value={5}>5 rondas</option>
                <option value={10}>10 rondas</option>
                <option value={15}>15 rondas</option>
                <option value={20}>20 rondas</option>
              </select>
            </div>

            <button className="start-btn" onClick={startGame}>
              ▶️ Comenzar Juego
            </button>
            
            <div className="instructions">
              <h3>📋 Instrucciones</h3>
              <ul>
                <li>🔹 Observa todos los elementos presentados</li>
                <li>🔹 Uno de ellos es diferente a los demás</li>
                <li>🔹 Haz clic en el elemento diferente lo más rápido posible</li>
                <li>🔹 Puntaje por ronda = 100 − (tiempo_en_segundos × 3)</li>
                <li>🔹 ¡La velocidad es clave para obtener más puntos!</li>
              </ul>
            </div>
          </div>
        </div>
      ) : gameState === 'playing' ? (
        <div className="game-play-area">
          <div className="game-stats">
            <div className="stat-box">
              <span className="stat-label">Ronda</span>
              <span className="stat-value">{questionNumber}/{questionsToComplete} 🎯</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Puntaje</span>
              <span className="stat-value">{score} ⭐</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Correctas</span>
              <span className="stat-value">{correctAnswers} ✅</span>
            </div>
          </div>

          {message && (
            <div className={`game-message ${message.includes('✅') ? 'success' : 'error'}`}>
              <p>{message}</p>
            </div>
          )}

          <div className="items-container">
            <div className={`items-grid ${getGridClass()}`}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`item-box ${message !== '' ? 'disabled' : ''}`}
                  onClick={() => handleItemClick(index)}
                >
                  <span className="item-content">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="control-btn quit-btn" onClick={restartGame}>
            🏠 Salir
          </button>
        </div>
      ) : (
        <div className="game-finished">
          <div className="results-card">
            <h2>🏁 ¡Juego Terminado!</h2>
            <div className="results-stats">
              <div className="result-item">
                <span className="result-label">Respuestas Correctas:</span>
                <span className="result-value">{correctAnswers}/{questionsToComplete} ✅</span>
              </div>
              <div className="result-item">
                <span className="result-label">Tiempo Total:</span>
                <span className="result-value">{totalTime.toFixed(2)}s ⏱️</span>
              </div>
              <div className="result-item">
                <span className="result-label">Tiempo Promedio:</span>
                <span className="result-value">
                  {(totalTime / questionsToComplete).toFixed(2)}s por ronda 📊
                </span>
              </div>
              <div className="result-item">
                <span className="result-label">Precisión:</span>
                <span className="result-value">
                  {Math.round((correctAnswers / questionsToComplete) * 100)}% 🎯
                </span>
              </div>
              <div className="result-item final-score">
                <span className="result-label">Puntaje Final:</span>
                <span className="result-value">{score} ⭐</span>
              </div>
            </div>
            <button className="restart-btn" onClick={restartGame}>
              🔄 Jugar de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDifferent;
