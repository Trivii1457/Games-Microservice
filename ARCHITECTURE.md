# Arquitectura del Sistema Mind Games

## 📐 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                  │
│                     (Navegador Web)                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                               │
│                   Puerto: 3000                                   │
│                   - React Router                                 │
│                   - Axios                                        │
│                   - Responsive Design                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ REST API
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API GATEWAY                                    │
│                   Puerto: 8080                                   │
│                   - Spring Cloud Gateway                         │
│                   - Routing                                      │
│                   - CORS Configuration                           │
└──────────┬──────────────┬──────────────┬─────────────────────────┘
           │              │              │
           │              │              │
           ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ USER-SERVICE │ │ GAME-SERVICE │ │SCORE-SERVICE │
│  Puerto 8081 │ │  Puerto 8082 │ │  Puerto 8083 │
├──────────────┤ ├──────────────┤ ├──────────────┤
│ Controller   │ │ Controller   │ │ Controller   │
│     ↓        │ │     ↓        │ │     ↓        │
│    DTO       │ │    DTO       │ │    DTO       │
│     ↓        │ │     ↓        │ │     ↓        │
│  Service     │ │  Service     │ │  Service     │
│     ↓        │ │     ↓        │ │     ↓        │
│ Repository   │ │ Repository   │ │ Repository   │
│     ↓        │ │     ↓        │ │     ↓        │
│   Entity     │ │   Entity     │ │   Entity     │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       │                │                │
       ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  USER DB     │ │  GAME DB     │ │  SCORE DB    │
│ PostgreSQL   │ │ PostgreSQL   │ │ PostgreSQL   │
│ Puerto 5432  │ │ Puerto 5433  │ │ Puerto 5434  │
│              │ │              │ │              │
│ Tabla: users │ │ Tabla: games │ │ Tabla:scores │
└──────────────┘ └──────────────┘ └──────────────┘
```

## 🔄 Flujo de Comunicación

### 1. Registro de Usuario
```
Frontend → API Gateway → User Service → User DB
```

### 2. Creación de Juego
```
Frontend → API Gateway → Game Service → Game DB
```

### 3. Registro de Puntaje (con validación de FK)
```
Frontend → API Gateway → Score Service
                            ├→ User Service (validar userId)
                            ├→ Game Service (validar gameId)
                            └→ Score DB (guardar score)
```

### 4. Obtener Ranking
```
Frontend → API Gateway → Score Service → Score DB
                            ↓
                    Ordenar por score DESC
```

## 📊 Modelo de Datos

### User (Tabla A)
```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (PK)         │
│ username        │
│ email           │
│ password        │
│ fechaRegistro   │
└─────────────────┘
```

### Game (Tabla B)
```
┌─────────────────┐
│     games       │
├─────────────────┤
│ id (PK)         │
│ nombre          │
│ tipo            │
│ dificultad      │
│ descripcion     │
└─────────────────┘
```

### Score (Tabla C - Relación)
```
┌─────────────────┐
│     scores      │
├─────────────────┤
│ id (PK)         │
│ userId (FK)     │─┐
│ gameId (FK)     │─┤
│ score           │ │
│ duration        │ │
│ fecha           │ │
└─────────────────┘ │
         │          │
         └──────────┴───────────────┐
                                    │
                    Validación REST │
                    (FK Lógicas)    │
```

## 🐳 Contenedores Docker

```
┌────────────────────────────────────────────────┐
│           Docker Network                       │
│         (mindgames-network)                    │
│                                                │
│  ┌──────────────┐  ┌──────────────┐          │
│  │   user-db    │  │ user-service │          │
│  └──────────────┘  └──────────────┘          │
│                                                │
│  ┌──────────────┐  ┌──────────────┐          │
│  │   game-db    │  │ game-service │          │
│  └──────────────┘  └──────────────┘          │
│                                                │
│  ┌──────────────┐  ┌──────────────┐          │
│  │   score-db   │  │score-service │          │
│  └──────────────┘  └──────────────┘          │
│                                                │
│  ┌──────────────┐  ┌──────────────┐          │
│  │ api-gateway  │  │  frontend    │          │
│  └──────────────┘  └──────────────┘          │
└────────────────────────────────────────────────┘
```

## 🔐 Principios de Arquitectura Implementados

### ✅ Patrón API Gateway
- Punto único de entrada
- Enrutamiento centralizado
- Configuración CORS
- Abstracción de microservicios

### ✅ Patrón Controller → DTO → Service → Repository
```
Controller: Maneja peticiones HTTP
    ↓
DTO: Transfiere datos entre capas
    ↓
Service: Lógica de negocio
    ↓
Repository: Acceso a datos
    ↓
Entity: Modelo de base de datos
```

### ✅ Independencia de Microservicios
- Base de datos independiente por servicio
- Contenedor Docker independiente
- Puede desplegarse/escalarse individualmente
- Comunicación REST entre servicios

### ✅ Foreign Keys Lógicas
- Score Service valida userId llamando a User Service
- Score Service valida gameId llamando a Game Service
- No hay FK físicas en la BD (arquitectura de microservicios)

## 🚀 Tecnologías por Capa

### Frontend
- React 18
- React Router 6
- Axios
- CSS Modules
- Nginx (producción)

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Web
- Spring Data JPA
- Spring Cloud Gateway

### Base de Datos
- PostgreSQL 15

### Infraestructura
- Docker
- Docker Compose

## 📈 Escalabilidad

Cada microservicio puede escalarse horizontalmente:

```
┌──────────────┐
│ Load Balancer│
└──────┬───────┘
       │
   ┌───┴───┬───────┬───────┐
   │       │       │       │
   ▼       ▼       ▼       ▼
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│US-1 │ │US-2 │ │US-3 │ │US-n │
└─────┘ └─────┘ └─────┘ └─────┘
   User Service Instances
```

## 🔧 Configuración de Entornos

Variables de entorno configurables:
- `SPRING_DATASOURCE_URL`: URL de conexión BD
- `SPRING_DATASOURCE_USERNAME`: Usuario BD
- `SPRING_DATASOURCE_PASSWORD`: Contraseña BD
- `USER_SERVICE_URL`: URL del User Service
- `GAME_SERVICE_URL`: URL del Game Service
- `SCORE_SERVICE_URL`: URL del Score Service
- `REACT_APP_API_URL`: URL del API Gateway

