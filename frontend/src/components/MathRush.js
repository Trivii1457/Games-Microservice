import React, { useState, useEffect } from 'react';
import './MathRush.css';

const MathRush = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [totalTime, setTotalTime] = useState(0);
  const [difficulty, setDifficulty] = useState('medio');
  const [message, setMessage] = useState('');
  const [questionsToComplete, setQuestionsToComplete] = useState(10);

  const difficultySettings = {
    facil: { timePerQuestion: 15, maxNumber: 10, operations: ['+', '-'] },
    medio: { timePerQuestion: 10, maxNumber: 50, operations: ['+', '-', '×'] },
    dificil: { timePerQuestion: 7, maxNumber: 100, operations: ['+', '-', '×'] }
  };

  const currentSettings = difficultySettings[difficulty];

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTotalTime(totalTime + 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, totalTime]);

  const generateQuestion = () => {
    const operations = currentSettings.operations;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const maxNum = currentSettings.maxNumber;
    
    let num1 = Math.floor(Math.random() * maxNum) + 1;
    let num2 = Math.floor(Math.random() * maxNum) + 1;
    let answer;

    // For subtraction, ensure positive result
    if (operation === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '×':
        // Keep multiplication simpler
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      default:
        answer = num1 + num2;
    }

    return {
      num1,
      num2,
      operation,
      answer,
      display: `${num1} ${operation} ${num2}`
    };
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCorrectAnswers(0);
    setQuestionNumber(1);
    setTotalTime(0);
    setUserAnswer('');
    setMessage('');
    setTimeLeft(currentSettings.timePerQuestion);
    setCurrentQuestion(generateQuestion());
  };

  const handleTimeout = () => {
    setMessage('⏰ ¡Tiempo agotado!');
    setTimeout(() => {
      nextQuestion(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === '') return;

    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setMessage('✅ ¡Correcto!');
    } else {
      setMessage(`❌ Incorrecto. La respuesta era ${currentQuestion.answer}`);
    }

    setTimeout(() => {
      nextQuestion(isCorrect);
    }, 1000);
  };

  const nextQuestion = (wasCorrect) => {
    if (questionNumber >= questionsToComplete) {
      finishGame();
      return;
    }

    setQuestionNumber(questionNumber + 1);
    setUserAnswer('');
    setMessage('');
    setTimeLeft(currentSettings.timePerQuestion);
    setCurrentQuestion(generateQuestion());
  };

  const finishGame = () => {
    // Puntaje = respuestas_correctas × 15 – (tiempo_en_segundos × 2)
    const finalScore = Math.max(0, (correctAnswers * 15) - (totalTime * 2));
    setScore(finalScore);
    setGameState('finished');
  };

  const restartGame = () => {
    setGameState('menu');
    setCurrentQuestion(null);
    setUserAnswer('');
    setScore(0);
    setCorrectAnswers(0);
    setQuestionNumber(1);
    setTimeLeft(10);
    setTotalTime(0);
    setMessage('');
  };

  return (
    <div className="math-rush-container">
      <div className="game-header">
        <h1 className="game-title">🧮 Math Rush</h1>
        <p className="game-description">
          Resuelve las operaciones matemáticas lo más rápido que puedas
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
                <small>15s • Hasta 10 • +, −</small>
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'medio' ? 'active' : ''}`}
                onClick={() => setDifficulty('medio')}
              >
                😐 Medio<br/>
                <small>10s • Hasta 50 • +, −, ×</small>
              </button>
              <button
                className={`difficulty-btn ${difficulty === 'dificil' ? 'active' : ''}`}
                onClick={() => setDifficulty('dificil')}
              >
                😰 Difícil<br/>
                <small>7s • Hasta 100 • +, −, ×</small>
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
                <li>🔹 Resuelve cada operación matemática</li>
                <li>🔹 Tienes tiempo limitado por pregunta</li>
                <li>🔹 Escribe tu respuesta y presiona Enter</li>
                <li>🔹 Puntaje = respuestas_correctas × 15 − tiempo_total × 2</li>
                <li>🔹 ¡Sé rápido y preciso para maximizar tu puntaje!</li>
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
            <div className="stat-box timer">
              <span className="stat-label">Tiempo</span>
              <span className={`stat-value ${timeLeft <= 3 ? 'time-warning' : ''}`}>
                {timeLeft}s ⏱️
              </span>
            </div>
          </div>

          {message && (
            <div className={`game-message ${message.includes('✅') ? 'success' : 'error'}`}>
              <p>{message}</p>
            </div>
          )}

          <div className="question-container">
            <div className="question-display">
              <h2>{currentQuestion?.display} = ?</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="answer-form">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Tu respuesta"
                className="answer-input"
                autoFocus
                disabled={message !== ''}
              />
              <button type="submit" className="submit-btn" disabled={message !== ''}>
                Responder ➡️
              </button>
            </form>
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
                <span className="result-value">{totalTime}s ⏱️</span>
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
              <p>Cálculo: ({correctAnswers} × 15) − ({totalTime} × 2) = {score}</p>
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

export default MathRush;
