<div align="center">

# 🧠 Mind Games

### Aplicación de Juegos Mentales con Arquitectura de Microservicios

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)

**[📖 Documentación](INDEX.md)** • **[🚀 Inicio Rápido](START_HERE.md)** • **[🏗️ Arquitectura](ARCHITECTURE.md)** • **[🧪 Pruebas](TESTING.md)**

</div>

---

Aplicación completa de juegos mentales desarrollada con **arquitectura de microservicios** usando Java 17, Spring Boot, PostgreSQL, Docker y React.

## 🏗️ Arquitectura

La aplicación está compuesta por:

- **API Gateway** (Puerto 8080): Punto de entrada único para todas las peticiones
- **User Service** (Puerto 8081): Gestión de usuarios
- **Game Service** (Puerto 8082): Gestión de juegos mentales
- **Score Service** (Puerto 8083): Gestión de puntajes y rankings
- **Frontend React** (Puerto 3000): Interfaz de usuario responsive
- **3 Bases de datos PostgreSQL**: Una para cada microservicio

## 🚀 Requisitos Previos

- Java 17+
- Docker & Docker Compose
- Maven 3.8+
- Node.js 18+ (para desarrollo frontend)

## 📦 Instalación y Ejecución

### Opción 1: Usando Docker Compose (Recomendado)

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### Opción 2: Desarrollo Local

#### Backend Services

```bash
# User Service
cd user-service
mvn spring-boot:run

# Game Service
cd game-service
mvn spring-boot:run

# Score Service
cd score-service
mvn spring-boot:run

# API Gateway
cd api-gateway
mvn spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## 🔌 Endpoints de la API

### API Gateway: http://localhost:8080

#### Users API
- `POST /api/users` - Crear usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/{id}` - Obtener usuario por ID
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario

#### Games API
- `POST /api/games` - Crear juego
- `GET /api/games` - Obtener todos los juegos
- `GET /api/games/{id}` - Obtener juego por ID
- `PUT /api/games/{id}` - Actualizar juego
- `DELETE /api/games/{id}` - Eliminar juego

#### Scores API
- `POST /api/scores` - Registrar puntaje
- `GET /api/scores` - Obtener todos los puntajes
- `GET /api/scores/{id}` - Obtener puntaje por ID
- `GET /api/scores/user/{userId}` - Puntajes por usuario
- `GET /api/scores/game/{gameId}` - Puntajes por juego
- `GET /api/scores/ranking/{gameId}` - Ranking por juego

## 🗄️ Bases de Datos

### User DB (Puerto 5432)
- Database: userdb
- User: userapp
- Password: userpass123

### Game DB (Puerto 5433)
- Database: gamedb
- User: gameapp
- Password: gamepass123

### Score DB (Puerto 5434)
- Database: scoredb
- User: scoreapp
- Password: scorepass123

## 🏛️ Patrón de Arquitectura

Cada microservicio sigue el patrón:

```
Controller → DTO → Service → Repository → Entity
```

## 🛠️ Tecnologías Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Web
- Spring Data JPA
- Spring Cloud Gateway
- PostgreSQL
- Maven

### Frontend
- React 18
- Axios
- CSS Modules

### Infraestructura
- Docker
- Docker Compose
- Nginx

## 📝 Ejemplo de Uso

### 1. Crear un usuario
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "player1",
    "email": "player1@example.com",
    "password": "password123"
  }'
```

### 2. Crear un juego
```bash
curl -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Memory Game",
    "tipo": "MEMORIA",
    "dificultad": "MEDIO",
    "descripcion": "Encuentra las parejas"
  }'
```

### 3. Registrar un puntaje
```bash
curl -X POST http://localhost:8080/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "gameId": 1,
    "score": 1000,
    "duration": 120
  }'
```

## 🧪 Testing

```bash
# Ejecutar tests en cada servicio
cd user-service && mvn test
cd game-service && mvn test
cd score-service && mvn test
```

## 📄 Licencia

MIT License

