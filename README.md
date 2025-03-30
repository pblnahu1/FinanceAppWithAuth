# Gestor de Finanzas con Autenticación de Usuarios JWT en Node.js y React
## Descripción
Esta aplicación permite a los usuarios gestionar sus gastos con autenticación basada en JSON Web Tokens (JWT). Los usuarios pueden registrarse, iniciar sesión y acceder a un Dashboard seguro para administrar sus finanzas.

## Tecnologías utilizadas
### Frontend
- React con Vite 
- TailwindCSS + DaisyUI
- Axios para comunicación con el backend

### Backend
- Node.js + Express.js 
- PostgreSQL (base de datos) con Docker
- Bcrypt para encriptación de contraseñas
- JWT para autenticación segura

### Herramientas adicionales
- Docker y Docker Compose para contenerización
- Nodemon para recarga automática de desarrollo
- Multer para manejo de archivos
- Nodemailer para envío de correos electrónicos

## Instalación y Configuración
### Requisitos previos
Antes de comenzar, asegurate de tener instalado:
- Node.js (incluye npm)
- PostgreSQL
- Docker y Docker Compose
- Git
- Visual Studio Code o cualquier editor de código que uses

## Instalación (ver el archivo `backend/config/db.js`)
Clonar el repositorio
```bash
git clone https://github.com/pblnahu1/gestor-de-finanzas-project
cd gestor-de-finanzas-project
```

### Docker 
1. En el root del proyecto verás el archivo `docker-compose.yml`. Ese es el archivo que ejecutarás para instalar los servicios, imágenes, contenedores, etc.
  - En el root del proyecto, abre tu terminal y ejecuta:
    - `docker-compose up --build`
    - Una vez que ejecutaste esto, se crearán contenedores para cada servicio y su correspondiente ejecución.
    - Para ver los logs de algún contenedor:
      - `docker logs 'nombre o id del container'`

### Local
1. `Backend`: Instalar las dependencias
```bash
cd backend 
npm install
```
2. `Client`: Instalar las dependencias
```bash
cd client
npm install
```
3. Iniciar el servidor desde `/backend` y `/client`
```bash
npm run dev
# Correrá el servidor en localhost:3001 y localhost:5173 para client junto con la base de datos postgres ya creada desde docker compose
```

## Instalaciones del Backend
- `express` | `npm install express` | Framework minimalista para crear servidores y gestionar rutas HTTP en Node.js.
- `bcrypt` | `npm install bcrypt` | Biblioteca para encriptar contraseñas y validarlas de manera segura.
- `body-parser` | `npm install body-parser` | Middleware para analizar datos del cuerpo de las solicitudes HTTP.
- `cookie-parser` | `npm install cookie-parser` | Middleware para manejar cookies en las solicitudes HTTP.
- `cors` | `npm install cors`  | Habilita solicitudes entre diferentes dominios (Cross-Origin Resource Sharing).
- `dotenv` | `npm install dotenv` | Carga variables de entorno desde un archivo `.env` al entorno de ejecución.
- `fs` | `npm install fs` | Biblioteca para trabajar con el sistema de archivos en Node.js.
- `jsonwebtoken` | `npm install jsonwebtoken` | Genera y verifica JSON Web Tokens (JWT) para autenticación.
- `multer` | `npm install multer` | Middleware para manejar la subida de archivos en solicitudes HTTP.
- `nodemon` | `npm install nodemon` | Herramienta para reiniciar automáticamente el servidor al detectar cambios en el código.
- `path` | `npm install path` | Biblioteca para trabajar con rutas de archivos y directorios.
- `pg` | `npm install pg` | Librería para interactuar con bases de datos PostgreSQL desde Node.js.
- `nodemailer` | `npm install nodemailer` | Librería para enviar correos electrónicos fácilmente.

### Instalaciones del Frontend
- Iniciar aplicación React
```bash
npm run dev
# Levanta la App en localhost:5173
```
- Librerías / Frameworks:
1. Tener instalado Node JS: https://nodejs.org/es/
2. Para instalar Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Esto crea los archivos `tailwind.config.js` y `postcss.config.js`
- En `tailwind.config.js` agregar en 'content' esto:
```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```
3. Instalar daisyUI como un paquete npm:
```npm i -D daisyui@latest```
- Agregar daisyUI a tailwind.config.js:
```js
import daisyui from "daisyui"
module.exports = {
  //...
  plugins: [
    daisyui,
  ],
}
```
4. Tener instalado React Router
```bash
npm install react-router-dom
```
5. Paquete recharts
```bash 
npm install recharts
```
6. Axios
```bash
npm install axios
```

## Autor
[Pablo Torrez](https://www.linkedin.com/in/pablo-nahuel-torrez-33a80324b/)
[Portfolio Dev](https://portfolio-dev-lilac.vercel.app/)