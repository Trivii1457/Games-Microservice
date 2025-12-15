import api from './api';

export const userService = {
  getAllUsers: () => api.get('/api/users'),
  getUserById: (id) => api.get(`/api/users/${id}`),
  createUser: (user) => api.post('/api/users', user),
  updateUser: (id, user) => api.put(`/api/users/${id}`, user),
  deleteUser: (id) => api.delete(`/api/users/${id}`),
  login: (credentials) => api.post('/api/users/login', credentials),
};

export const gameService = {
  getAllGames: () => api.get('/api/games'),
  getGameById: (id) => api.get(`/api/games/${id}`),
  createGame: (game) => api.post('/api/games', game),
  updateGame: (id, game) => api.put(`/api/games/${id}`, game),
  deleteGame: (id) => api.delete(`/api/games/${id}`),
};

export const scoreService = {
  getAllScores: () => api.get('/api/scores'),
  getScoreById: (id) => api.get(`/api/scores/${id}`),
  createScore: (score) => api.post('/api/scores', score),
  getScoresByUser: (userId) => api.get(`/api/scores/user/${userId}`),
  getScoresByGame: (gameId) => api.get(`/api/scores/game/${gameId}`),
  getRankingByGame: (gameId) => api.get(`/api/scores/ranking/${gameId}`),
  deleteScore: (id) => api.delete(`/api/scores/${id}`),
};

