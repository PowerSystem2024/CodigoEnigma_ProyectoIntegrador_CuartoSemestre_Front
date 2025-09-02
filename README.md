# 🚀 Proyecto E-commerce Fullstack

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Flask](https://img.shields.io/badge/Flask-3.1.0-orange)
![Angular](https://img.shields.io/badge/Angular-17+-red)
![MySQL](https://img.shields.io/badge/MySQL-8+-blue)

> Proyecto Fullstack con **Flask + SQLAlchemy + Migrations + Seeders + Angular + MySQL**.

---

## 🗂 Estructura del proyecto

- Backend en Flask  
- Frontend en Angular  
- DB en MySQL  

---

## ⚙️ Requisitos previos

- Python 3.10+  
- Node.js 18+ y npm  
- Angular CLI (`npm i -g @angular/cli`)  
- MySQL 8+  

---

## 🐍 Backend (Flask + MySQL)

### 1️⃣ Configuración de la base de datos

Ingresar a MySQL:

```sql
CREATE DATABASE proyecto_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'proyecto_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'proyecto_pass';
GRANT ALL PRIVILEGES ON proyecto_db.* TO 'proyecto_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2️⃣ Configurar .env

Copiar `.env.example` a `.env` y completar con tus datos reales:

```env
DB_USER=proyecto_user
DB_PASSWORD=proyecto_pass
DB_HOST=localhost
DB_NAME=proyecto_db
FLASK_ENV=development
FLASK_APP=app.py
FLASK_DEBUG=1
```

### 3️⃣ Setup completo backend

Abrir PowerShell en `backend/` y permitir scripts:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Ejecutar el script:

```powershell
.\setup.ps1
```

Esto hace:

- Crear y activar entorno virtual `.venv`  
- Instalar dependencias (`requirements.txt`)  
- Inicializar migraciones (`flask db init`)  
- Generar migración inicial (`flask db migrate`)  
- Aplicar migración (`flask db upgrade`)  

### 4️⃣ Correr backend Flask

```powershell
flask --app app run --debug
```

### 5️⃣ Ejecutar seeders

```powershell
python seed.py
```

---

## 🟢 Frontend (Angular)

### 1️⃣ Configuración de environment

Copiar `environment.example.ts` a `environment.ts` y completar `apiUrl`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:5000'
};
```

Para producción, configurar `environment.prod.ts` con la URL real del backend:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.tusitio.com'
};
```

### 2️⃣ Levantar dev server

```bash
cd frontend
npm install
ng serve -o
```

---

## 📡 Ejemplos de endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /users   | Obtener todos los usuarios |
| POST   | /users   | Crear un usuario `{name, email}` |

---

## ⚠️ Notas importantes

- No subir `.env` ni `environment.ts` con datos sensibles a GitHub.  
- CORS ya habilitado en Flask.  

URI de SQLAlchemy para MySQL:

```python
"mysql+pymysql://user:pass@localhost/dbname"
```

Activar entorno virtual:

```powershell
. .\.venv\Scripts\Activate.ps1
```

Salir del entorno:

```powershell
deactivate
```

Para agregar nuevas migraciones:

```powershell
python -m flask --app app db migrate -m "mensaje"
python -m flask --app app db upgrade
```

Seeders: todos los archivos dentro de `seeders/` y ejecutarlos desde `seed.py`.  
