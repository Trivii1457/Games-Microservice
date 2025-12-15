import React, { useState } from 'react';
import './PatternGame.css';

const PatternGame = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, finished
  const [currentPattern, setCurrentPattern] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [errors, setErrors] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [difficulty, setDifficulty] = useState('medio');
  const [message, setMessage] = useState('');
  const [questionsToComplete, setQuestionsToComplete] = useState(10);
  const [showHint, setShowHint] = useState(false);

  const patternTypes = [
    'arithmetic', // +n
    'multiply', // ×n
    'fibonacci', // suma de anteriores
    'square', // n²
    'doubling' // ×2
  ];

  const difficultySettings = {
    facil: { maxValue: 20, patternTypes: ['arithmetic', 'doubling'], sequenceLength: 4 },
    medio: { maxValue: 50, patternTypes: ['arithmetic', 'multiply', 'doubling'], sequenceLength: 5 },
    dificil: { maxValue: 100, patternTypes: patternTypes, sequenceLength: 6 }
  };

  const currentSettings = difficultySettings[difficulty];

  const generatePattern = () => {
    const types = currentSettings.patternTypes;
    const type = types[Math.floor(Math.random() * types.length)];
    let sequence = [];
    let answer;
    let hint = '';

    switch (type) {
      case 'arithmetic': {
        const start = Math.floor(Math.random() * 10) + 1;
        const step = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < currentSettings.sequenceLength; i++) {
          sequence.push(start + (step * i));
        }
        answer = start + (step * currentSettings.sequenceLength);
        hint = `Suma ${step} cada vez`;
        break;
      }
      case 'multiply': {
        const start = Math.floor(Math.random() * 3) + 2;
        const factor = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < currentSettings.sequenceLength; i++) {
          sequence.push(start * Math.pow(factor, i));
        }
        answer = start * Math.pow(factor, currentSettings.sequenceLength);
        hint = `Multiplica por ${factor}`;
        break;
      }
      case 'fibonacci': {
        sequence = [1, 1];
        for (let i = 2; i < currentSettings.sequenceLength; i++) {
          sequence.push(sequence[i-1] + sequence[i-2]);
        }
        answer = sequence[sequence.length-1] + sequence[sequence.length-2];
        hint = 'Suma los dos números anteriores';
        break;
      }
      case 'square': {
        const start = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < currentSettings.sequenceLength; i++) {
          sequence.push(Math.pow(start + i, 2));
        }
        answer = Math.pow(start + currentSettings.sequenceLength, 2);
        hint = 'Cuadrado de números consecutivos';
        break;
      }
      case 'doubling': {
        const start = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < currentSettings.sequenceLength; i++) {
          sequence.push(start * Math.pow(2, i));
        }
        answer = start * Math.pow(2, currentSettings.sequenceLength);
        hint = 'Duplica el número anterior';
        break;
      }
      default:
        sequence = [2, 4, 8];
        answer = 16;
        hint = 'Duplica el número';
    }

    return {
      sequence,
      answer,
      type,
      hint
    };
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCorrectAnswers(0);
    setErrors(0);
    setQuestionNumber(1);
    setUserAnswer('');
    setMessage('');
    setShowHint(false);
    setCurrentPattern(generatePattern());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === '') return;

    const isCorrect = parseInt(userAnswer) === currentPattern.answer;
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setMessage('✅ ¡Correcto!');
    } else {
      setErrors(errors + 1);
      setMessage(`❌ Incorrecto. La respuesta era ${currentPattern.answer}`);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (questionNumber >= questionsToComplete) {
      finishGame();
      return;
    }

    setQuestionNumber(questionNumber + 1);
    setUserAnswer('');
    setMessage('');
    setShowHint(false);
    setCurrentPattern(generatePattern());
  };

  const finishGame = () => {
    // Puntaje = (aciertos × 20) – errores × 5
    const finalScore = Math.max(0, (correctAnswers * 20) - (errors * 5));
    setScore(finalScore);
    setGameState('finished');
  };

  const restartGame = () => {
    setGameState('menu');
    setCurrentPattern(null);
    setUserAnswer('');
    setScore(0);
    setCorrectAnswers(0);
    setErrors(0);
    setQuestionNumber(1);
    setMessage('');
    setShowHint(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className="pattern-game-container">
      <div className="game-header">
        <h1 className="game-title">🔍 Patrón Oculto</h1>
        <p className="game-description">
          Identifica el patrón y descubre el siguiente número en la secuencia
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
                <small>Patrones simples • Secuencias cortas</small>
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'medio' ? 'active' : ''}`}
                onClick={() => setDifficulty('medio')}
              >
                😐 Medio<br/>
                <small>Patrones variados • Más elementos</small>
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'dificil' ? 'active' : ''}`}
                onClick={() => setDifficulty('dificil')}
              >
                😰 Difícil<br/>
                <small>Todos los patrones • Secuencias largas</small>
              </button>
            </div>

            <div className="question-count-selector">
              <label>Número de preguntas:</label>
              <select 
                value={questionsToComplete} 
                onChange={(e) => setQuestionsToComplete(parseInt(e.target.value))}
              >
                <option value={5}>5 preguntas</option>
                <option value={10}>10 preguntas</option>
                <option value={15}>15 preguntas</option>
                <option value={20}>20 preguntas</option>
              </select>
            </div>

            <button className="start-btn" onClick={startGame}>
              ▶️ Comenzar Juego
            </button>
            
            <div className="instructions">
              <h3>📋 Instrucciones</h3>
              <ul>
                <li>🔹 Observa la secuencia de números presentada</li>
                <li>🔹 Identifica el patrón matemático</li>
                <li>🔹 Calcula el siguiente número en la secuencia</li>
                <li>🔹 Puedes usar una pista si la necesitas (sin penalización)</li>
                <li>🔹 Puntaje = (aciertos × 20) − (errores × 5)</li>
              </ul>
            </div>
          </div>
        </div>
      ) : gameState === 'playing' ? (
        <div className="game-play-area">
          <div className="game-stats">
            <div className="stat-box">
              <span className="stat-label">Pregunta</span>
              <span className="stat-value">{questionNumber}/{questionsToComplete} 📝</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Correctas</span>
              <span className="stat-value">{correctAnswers} ✅</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Errores</span>
              <span className="stat-value">{errors} ❌</span>
            </div>
          </div>

          {message && (
            <div className={`game-message ${message.includes('✅') ? 'success' : 'error'}`}>
              <p>{message}</p>
            </div>
          )}

          <div className="pattern-container">
            <div className="sequence-display">
              <h3>Encuentra el patrón:</h3>
              <div className="sequence-numbers">
                {currentPattern?.sequence.map((num, idx) => (
                  <div key={idx} className="sequence-number">
                    {num}
                  </div>
                ))}
                <div className="sequence-number question-mark">
                  ?
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="answer-form">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="¿Cuál es el siguiente número?"
                className="answer-input"
                autoFocus
                disabled={message !== ''}
              />
              <button type="submit" className="submit-btn" disabled={message !== ''}>
                Responder ➡️
              </button>
            </form>

            <div className="hint-section">
              <button 
                className="hint-btn" 
                onClick={toggleHint}
                disabled={message !== ''}
              >
                {showHint ? '🔒 Ocultar Pista' : '💡 Ver Pista'}
              </button>
              {showHint && (
                <div className="hint-display">
                  <p>💡 {currentPattern?.hint}</p>
                </div>
              )}
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
                <span className="result-value">{correctAnswers} ✅</span>
              </div>
              <div className="result-item">
                <span className="result-label">Errores:</span>
                <span className="result-value">{errors} ❌</span>
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
            <div className="calculation-info">
              <p>Cálculo: ({correctAnswers} × 20) − ({errors} × 5) = {score}</p>
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

export default PatternGame;
