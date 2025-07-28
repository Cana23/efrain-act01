# Mi Stack Fullstack con Docker Compose

Este proyecto implementa una aplicación web fullstack usando Docker Compose, permitiendo el desarrollo y pruebas de forma local. Incluye servicios para un backend (API), una landing page (formulario de contacto), y una base de datos PostgreSQL.

## 📦 Estructura del proyecto
```
/crm/
├── backend/ # Backend (Node.js + Express + Prisma)
│ ├── index.js
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── seed.js
│ ├── controllers/
│ └── Dockerfile
├── frontend/ # Frontend (React o HTML)
│ ├── public/
│ ├── src/
│ └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🧩 Servicios

### 🔧 API (`api/`)
- Node.js + Express
- Usa Prisma como ORM
- Conectado a PostgreSQL
- Expone el puerto `4000`

### 🌐 Landing (`landing/`)
- Frontend en React (o HTML)
- Muestra formulario de contacto
- Se comunica con la API para enviar datos
- Expone el puerto `3000`

### 🗃️ Base de datos (`bd`)
- PostgreSQL 15
- Usa volúmenes para persistencia
- Expone el puerto `5432`

## 🐳 Docker Compose

Archivo `docker-compose.yml` que orquesta todos los servicios:

- Red compartida entre servicios
- Variables desde archivo `.env`
- `depends_on` para manejo de orden de arranque
- Prisma conectado a la base de datos por hostname (`bd`)

## ⚙️ Variables de entorno

Archivo `.env` con contenido similar a:

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=midb
DATABASE_URL=postgresql://admin:admin123@bd:5432/midb
```