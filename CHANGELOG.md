# Changelog - Implementación de Login y Mejoras

## Cambios Implementados

### Backend (Java/Spring Boot)

#### User Service
- ✅ **Login Endpoint**: Agregado `POST /api/users/login` para autenticación de usuarios
  - Acepta `username` y `password`
  - Retorna información del usuario si las credenciales son correctas
  - Retorna HTTP 401 si las credenciales son incorrectas

#### Score Service  
- ✅ **ScoreDTO Mejorado**: Agregados campos `username` y `gameName`
  - Los scores ahora incluyen el nombre del usuario y del juego
  - Se obtienen mediante llamadas REST a user-service y game-service
  
- ✅ **Endpoint de Scores Globales**: Agregado `GET /api/scores/global`
  - Retorna todos los scores ordenados por puntaje descendente
  - Incluye nombres de usuario y juegos

### Frontend (React)

#### Componentes Nuevos
- ✅ **Login Component**: Página de login con registro
  - Permite iniciar sesión con usuario/contraseña
  - Opción para crear nueva cuenta
  - Almacena información del usuario en localStorage
  
- ✅ **Profile Component**: Perfil de usuario
  - Muestra información del usuario logueado
  - Opción para **eliminar cuenta permanentemente**
  - Avatar con inicial del username

#### Componentes Eliminados
- ❌ **Users Component**: Eliminada página de gestión de usuarios
- ❌ **Games Component**: Eliminada página de gestión de juegos

#### Componentes Modificados
- ✅ **Scores Component**: Simplificado para mostrar solo:
  - Puntajes globales con nombres de usuario
  - Filtro por juego
  - Removido formulario de creación de puntajes
  
- ✅ **App.js**: 
  - Agregada autenticación requerida para todas las rutas
  - Navbar actualizado con usuario logueado y botón de logout
  - Rutas protegidas que redirigen a login si no hay sesión
  
- ✅ **MathRush Game**: 
  - Ahora guarda automáticamente los puntajes al finalizar
  - Asocia puntajes al usuario logueado

#### Nueva Paleta de Colores
Aplicada en todo el frontend:
- **Primary**: `#024059` (Azul oscuro)
- **Secondary**: `#026873` (Turquesa)
- **Accent**: `#04BF8A` (Verde agua)
- **Dark**: `#025940` (Verde oscuro)
- **Success**: `#03A64A` (Verde)

### Estructura de Navegación

**Antes:**
- 🏠 Inicio
- 🎮 Jugar
- 👥 Usuarios (eliminado)
- 🎯 Gestión (eliminado)
- 🏆 Puntajes

**Después:**
- 🏠 Inicio
- 🎮 Jugar
- 🏆 Puntajes
- 👤 Mi Perfil (nuevo)
- 🚪 Salir (nuevo)
- 👋 [Nombre de usuario] (nuevo)

## Funcionalidades de Seguridad

1. **Autenticación Requerida**: Todas las rutas requieren login
2. **Sesión Persistente**: Usuario guardado en localStorage
3. **Protección de Rutas**: Redirección automática a login si no hay sesión
4. **Eliminación de Cuenta**: Usuario puede eliminar su propia cuenta

## Base de Datos

Todos los datos se guardan en las bases de datos PostgreSQL desplegadas:
- **userdb**: Usuarios y credenciales
- **gamedb**: Información de juegos
- **scoredb**: Puntajes con referencias a usuarios y juegos

## Cómo Usar

1. **Iniciar Aplicación**:
   ```bash
   docker-compose up --build
   ```

2. **Acceder**:
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080

3. **Crear Cuenta**:
   - Navegar a la página de login
   - Hacer clic en "¿No tienes cuenta? Regístrate"
   - Ingresar username, email y contraseña
   - Hacer clic en "Crear Cuenta"

4. **Iniciar Sesión**:
   - Ingresar username y contraseña
   - Hacer clic en "Iniciar Sesión"

5. **Jugar y Ver Puntajes**:
   - Jugar cualquier juego disponible
   - Los puntajes se guardan automáticamente
   - Ver puntajes globales en la sección 🏆 Puntajes
   - Filtrar por juego específico

6. **Eliminar Cuenta**:
   - Ir a 👤 Mi Perfil
   - En "Zona Peligrosa", hacer clic en "Eliminar Mi Cuenta"
   - Confirmar la acción

## API Endpoints Disponibles

### Users
- `POST /api/users` - Crear usuario
- `POST /api/users/login` - Login
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/{id}` - Obtener usuario por ID
- `DELETE /api/users/{id}` - Eliminar usuario

### Games
- `GET /api/games` - Obtener todos los juegos
- `GET /api/games/{id}` - Obtener juego por ID

### Scores
- `POST /api/scores` - Crear puntaje
- `GET /api/scores` - Obtener todos los puntajes (ordenados)
- `GET /api/scores/global` - Obtener puntajes globales
- `GET /api/scores/ranking/{gameId}` - Ranking por juego
- `GET /api/scores/user/{userId}` - Puntajes por usuario
- `GET /api/scores/game/{gameId}` - Puntajes por juego

## Notas Técnicas

- **Java 17** y **Spring Boot 3.2.0**
- **React 18** con React Router 6
- **PostgreSQL 15** para persistencia
- **Docker Compose** para orquestación
- Arquitectura de microservicios con API Gateway
- Comunicación REST entre servicios
