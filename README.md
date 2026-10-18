# 📌 Task Planner Express (Full Stack)

Una aplicación web de gestión de tareas estilo Kanban (inspirada en Trello) construida con la arquitectura PERN (PostgreSQL, Express, React, Node.js) utilizando **Vite** para un desarrollo ágil en el frontend.

🚀 **Demo en vivo:** [Link de tu app en Vercel](https://task-planner-client.vercel.app/)  
🔌 **API Backend:** [Link de tu API en Railway](https://task-planner-api-production-27c9.up.railway.app/api/prueba)

---

## 💻 Tecnologías Utilizadas

### Frontend
- **React 18** + **Vite**
- **React Router DOM** (Navegación SPA)
- **Axios** (Peticiones HTTP)
- **Lucide React** (Iconografía)
- **CSS3 / Flexbox / Grid**

### Backend & Base de Datos
- **Node.js** & **Express**
- **PostgreSQL** (Base de datos relacional)
- **Sequelize ORM** (Modelado y relaciones de datos)
- **CORS** & **Dotenv**

### Despliegue
- **Vercel** (Frontend Client)
- **Railway** (Backend API & PostgreSQL Service)

---

## ⚙️ Características del Proyecto

- 📋 **CRUD de Tableros:** Creación, visualización y eliminación de tableros con diálogo de confirmación.
- 📌 **Organización por Listas:** Gestión de columnas ("Por Hacer", "En Proceso", "Completado").
- 📝 **Gestión de Tarjetas:** Creación y borrado de tareas dentro de cada lista.
- 🔄 **Cascada en Base de Datos:** Eliminación relacional garantizada (borrar un tablero o lista elimina automáticamente sus elementos dependientes).
- 🎨 **Diseño Responsivo e Intuitivo.**

---

## 🚀 Instalación y Ejecución en Local

### 1. Backend (`task-planner-api`)
```bash
# Clonar repositorio
git clone [https://github.com/cristiangc92/task-planner-api.git](https://github.com/cristiangc92/task-planner-api.git)
cd task-planner-api

# Instalar dependencias
npm install

# Crear archivo .env en la raíz con:
# PORT=3001
# DATABASE_URL=postgres://usuario:password@localhost:5432/task_planner_db

# Ejecutar en modo desarrollo
npm run dev