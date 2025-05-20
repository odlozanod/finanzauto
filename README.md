# Sistema de Gestión de Usuarios - React

Aplicación desarrollada en **React** que permite la autenticación simulada de usuarios mediante token Bearer (almacenado en `localStorage`) y el consumo de una API externa para la visualización de una lista de usuarios.

## 🧩 Características

- ✅ Inicio de sesión simulado con almacenamiento de token en `localStorage`.
- 🔄 Redirección automática a la pantalla principal después del login.
- 🌐 Consumo de API externa para obtener usuarios (`https://dummyapi.io`).
- 📄 Visualización paginada de usuarios.
- 🎨 Estilos personalizados con color principal `#1A6E6A`.
- 🔧 Acciones simuladas: ver, editar y eliminar usuarios.
- 📱 Diseño responsive.

## 🛠️ Tecnologías Utilizadas

- React
- TypeScript
- Axios
- React Router
- Bootstrap o CSS personalizado
- localStorage (para token Bearer simulado)

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/odlozanod/finanzauto.git
cd finanzauto
```

2. Instalar Dependencias:

```bash
npm install
```

3. Ejecutar el Proyecto en Desarrollo

```bash
npm run dev
```

## 🔐 Autenticación Simulada
 
- Se simula un login con cualquier nombre de usuario y contraseña.
- Al iniciar sesión, se guarda un token ficticio tipo Bearer en localStorage.
- El sistema redirige automáticamente a la pantalla principal si el token está presente.
- Al cerrar sesión, se elimina el token y se regresa al login.

## 🌐 Consumo de API
 
```bash
// src/api/userApi.ts

const API = axios.create({
  baseURL: 'https://dummyapi.io/data/v1',
  headers: {
    'app-id': '63473330c1927d386ca6a3a5', 
  },
});

```

## 📸 Funcionalidades
 
- Inicio de sesión (simulado)
- Redirección automática según autenticación
- Tabla paginada de usuarios
- Búsqueda de usuarios
- Botones de acciones (ver, editar, eliminar - simulados)
- Mostrar foto o texto "Sin imagen"
- Estilos con color personalizado principal #1A6E6A

## 📸 Video demostrativo

<video width="320" height="240" controls>
  <source src="https://micertificacion.com/wp-content/uploads/2025/05/2025-05-20-07-27-49.mp4" type="video/mp4">
  Tu navegador no soporta el video.
</video>



## 🧑‍💻 Autor

Desarrollado por [Oscar Lozano]

📫 Contacto: [diazdaniel30@hotmail.com]

