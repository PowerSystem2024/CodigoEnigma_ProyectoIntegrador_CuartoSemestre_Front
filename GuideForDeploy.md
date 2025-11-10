
## **DISCLAIMER: Esto es una documentación técnica para el correcto Deploy de este proyecto de forma local, o como lo realizamos nosotros a traves de Vercel**
### **Si solo se necesita levantar el proyecto para pruebas, seguir los pasos indicados en el Readme alojado en backend de este proyecto**

# 📋 Documentación Técnica - Deploy E-commerce Fullstack

**Stack Tecnológico:**
- Backend: Flask 3.1.0 + SQLAlchemy + MySQL
- Frontend: Angular 19.2.15 + Nebular UI
- Base de datos: MySQL 8+ (Google Cloud SQL)
- Hosting: Vercel (Frontend + Backend)

---

## 📑 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración Backend](#configuración-backend)
3. [Configuración Frontend](#configuración-frontend)
4. [Deploy en Desarrollo Local](#deploy-en-desarrollo-local)
5. [Deploy en Producción (Vercel + Google Cloud SQL)](#deploy-en-producción)
6. [Verificación del Deploy](#verificación-del-deploy)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Requisitos Previos

### Software Necesario

| Herramienta | Versión Mínima | Comando de Verificación |
|-------------|----------------|-------------------------|
| Python | 3.10+ | `python --version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Angular CLI | 19+ | `ng version` |
| MySQL | 8+ | `mysql --version` |
| Git | Cualquiera | `git --version` |

### Instalación de Dependencias Globales

```bash
# Angular CLI
npm install -g @angular/cli

# Vercel CLI (para deploy en producción)
npm install -g vercel
```

---

## 🐍 Configuración Backend

### Estructura de Carpetas

```
backend/
├── migrations/          # Migraciones de base de datos (Alembic)
│   └── versions/        # Versiones de migraciones
├── models/              # Modelos de SQLAlchemy
├── routes/              # Endpoints de la API
├── schemas/             # Esquemas de validación
├── seeders/             # Datos de prueba para la BD
├── services/            # Lógica de negocio
├── utils/               # Utilidades y helpers
├── middlewares/         # Middlewares personalizados
├── app.py               # Aplicación principal Flask
├── config.py            # Configuración de la app
├── seed.py              # Script para ejecutar seeders
├── setup.ps1            # Script de setup automático (Windows)
├── requirements.txt     # Dependencias Python
├── .env.example         # Ejemplo de variables de entorno
└── .env                 # Variables de entorno (NO SUBIR A GIT)
```

### 1. Clonar el Repositorio

```bash
git clone <URL_REPOSITORIO>
cd <NOMBRE_PROYECTO>
```

### 2. Configurar Base de Datos

#### Opción A: MySQL Local (Desarrollo)

```sql
-- Conectarse a MySQL
mysql -u root -p

-- Crear base de datos
CREATE DATABASE enigma_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario
CREATE USER 'enigma_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'enigma_password';

-- Otorgar privilegios
GRANT ALL PRIVILEGES ON enigma_db.* TO 'enigma_user'@'localhost';
FLUSH PRIVILEGES;

-- Verificar
SHOW DATABASES;
SELECT User, Host FROM mysql.user WHERE User = 'enigma_user';
```

#### Opción B: Google Cloud SQL (Producción)

1. Crear instancia MySQL en Google Cloud Console
2. Configurar red autorizada o usar Cloud SQL Proxy
3. Crear base de datos desde Cloud Console
4. Obtener credenciales de conexión (host, user, password)

### 3. Configurar Variables de Entorno

**Ubicación:** `backend/.env`

Copiar el archivo de ejemplo:

```bash
cd backend
cp .env.example .env
```

**Contenido del archivo `.env`:**

```bash
# ===================================
# CONFIGURACIÓN DE FLASK
# ===================================
FLASK_ENV=development                    # development | production
FLASK_APP=app.py                         # Archivo principal de la app
FLASK_DEBUG=1                            # 1 para desarrollo, 0 para producción
FLASK_PORT=5000                          # Puerto donde corre Flask
SECRET_KEY=                              # Clave secreta para sesiones (generar una única)

# ===================================
# CONFIGURACIÓN DE MYSQL (DESARROLLO LOCAL)
# ===================================
MYSQL_ROOT_PASSWORD=                     # Password del root de MySQL
MYSQL_DATABASE=enigma_db                 # Nombre de la base de datos
MYSQL_USER=enigma_user                   # Usuario de la base de datos
MYSQL_PASSWORD=                          # Password del usuario
MYSQL_PORT=3306                          # Puerto de MySQL (default: 3306)

# ===================================
# CONFIGURACIÓN DE BASE DE DATOS (PRODUCCIÓN)
# ===================================
DB_USER=                                 # Usuario de Google Cloud SQL
DB_PASSWORD=                             # Password de Google Cloud SQL
DB_HOST=                                 # IP pública o privada de Cloud SQL
DB_NAME=                                 # Nombre de la base de datos
DB_PORT=3306                             # Puerto (default: 3306)

# ===================================
# MERCADO PAGO
# ===================================
MP_ACCESS_TOKEN=                         # Access Token de Mercado Pago
MP_PUBLIC_KEY=                           # Public Key de Mercado Pago

# Notas:
# - NO subir este archivo a Git (debe estar en .gitignore)
# - Para SECRET_KEY usar: python -c "import secrets; print(secrets.token_hex(32))"
# - Obtener credenciales de Mercado Pago desde: https://www.mercadopago.com.ar/developers
```

### 4. Setup Automático (Windows)

```powershell
cd backend

# Permitir ejecución de scripts
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Ejecutar setup
.\setup.ps1
```

**El script realiza:**
- ✅ Crea entorno virtual `.venv`
- ✅ Activa el entorno virtual
- ✅ Instala dependencias desde `requirements.txt`
- ✅ Inicializa sistema de migraciones
- ✅ Genera y aplica migración inicial

### 5. Setup Manual (Linux/Mac o alternativa)

```bash
cd backend

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# En Linux/Mac:
source .venv/bin/activate
# En Windows:
.\.venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Inicializar migraciones
flask db init

# Crear migración inicial
flask db migrate -m "Initial migration"

# Aplicar migración
flask db upgrade
```

### 6. Ejecutar Seeders (Datos de Prueba)

```bash
# Con entorno virtual activado
python seed.py
```

### 7. Levantar Backend

```bash
# Modo desarrollo
flask --app app run --debug

# O simplemente
flask run
```

**Backend disponible en:** `http://127.0.0.1:5000`

---

## 🟢 Configuración Frontend

### Estructura de Carpetas

```
frontend/
├── src/
│   ├── app/                # Componentes y módulos
│   ├── assets/             # Imágenes, fuentes, estilos
│   ├── environments/       # Configuración de entornos
│   │   ├── environment.ts        # Desarrollo
│   │   └── environment.prod.ts   # Producción
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json            # Configuración de Angular
├── package.json            # Dependencias npm
├── tsconfig.json           # Configuración TypeScript
└── vercel.json             # Configuración de Vercel (si existe)
```

### 1. Configurar Variables de Entorno

#### Archivo: `src/environments/environment.ts` (Desarrollo)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:5000'  // URL del backend local
};
```

#### Archivo: `src/environments/environment.prod.ts` (Producción)

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.vercel.app'  // URL del backend en producción
};
```

**⚠️ IMPORTANTE:**
- **NO subir** estos archivos con valores reales a Git
- Crear un `.example` para cada uno como referencia
- Configurar en `.gitignore`:
  ```
  /src/environments/environment.ts
  /src/environments/environment.prod.ts
  ```

### 2. Instalar Dependencias

```bash
cd frontend
npm install
```

**Dependencias principales instaladas:**
- Angular 19.2.15
- Nebular Theme 15.0.0
- RxJS 7.8.0
- TypeScript 5.8.3

### 3. Levantar Frontend

```bash
# Modo desarrollo
npm start
# O
ng serve

# Con apertura automática del navegador
ng serve -o

# En un puerto específico
ng serve --port 4200
```

**Frontend disponible en:** `http://localhost:4200`

---

## 🚀 Deploy en Desarrollo Local

### Orden de Inicio

1. **Base de Datos** → MySQL debe estar corriendo
2. **Backend** → Flask API
3. **Frontend** → Angular Dev Server

### Script de Inicio Rápido

**Windows (PowerShell):**
```powershell
# Terminal 1 - Backend
cd backend
.\.venv\Scripts\activate
flask run

# Terminal 2 - Frontend
cd frontend
npm start
```

**Linux/Mac (Bash):**
```bash
# Terminal 1 - Backend
cd backend
source .venv/bin/activate
flask run

# Terminal 2 - Frontend
cd frontend
npm start
```

### Verificación Local

| Servicio | URL | Verificar |
|----------|-----|-----------|
| Backend | http://127.0.0.1:5000 | Endpoint de prueba |
| Frontend | http://localhost:4200 | Página principal |
| MySQL | localhost:3306 | Conexión con cliente |

---

## 🌐 Deploy en Producción

### A. Configurar Google Cloud SQL

#### 1. Crear Instancia MySQL

```bash
# Desde Google Cloud Console
1. Ir a SQL → Crear instancia → MySQL
2. Configurar:
   - ID de instancia: enigma-db-prod
   - Password de root: [SEGURO]
   - Región: us-central1 (o la más cercana)
   - Versión MySQL: 8.0
   - Tipo de máquina: según necesidad
```

#### 2. Crear Base de Datos

```sql
-- Conectarse vía Cloud Shell o cliente MySQL
CREATE DATABASE enigma_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 3. Configurar Acceso

**Opción A: IP Autorizada**
```
1. SQL → Instancia → Conexiones
2. Agregar red autorizada
3. Agregar IP pública de Vercel (si aplica)
```

**Opción B: Cloud SQL Proxy (Recomendado para desarrollo)**
```bash
# Instalar Cloud SQL Proxy
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy

# Ejecutar
./cloud_sql_proxy -instances=INSTANCE_CONNECTION_NAME=tcp:3306
```

#### 4. Obtener Datos de Conexión

```
IP Pública: [desde consola]
Usuario: root (o crear uno nuevo)
Password: [el configurado]
Base de datos: enigma_db
Puerto: 3306
```

### B. Deploy Backend en Vercel

#### 1. Preparar Backend para Vercel

**Crear archivo:** `backend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ],
  "env": {
    "FLASK_ENV": "production"
  }
}
```

**Verificar `requirements.txt`** incluya:
```txt
gunicorn==21.2.0
```

#### 2. Configurar Variables de Entorno en Vercel

```bash
# Opción A: Desde CLI
vercel env add FLASK_ENV production
vercel env add SECRET_KEY [tu-clave-secreta]
vercel env add DB_USER [usuario-cloud-sql]
vercel env add DB_PASSWORD [password-cloud-sql]
vercel env add DB_HOST [ip-cloud-sql]
vercel env add DB_NAME enigma_db
vercel env add DB_PORT 3306
vercel env add MP_ACCESS_TOKEN [tu-token]
vercel env add MP_PUBLIC_KEY [tu-key]

# Opción B: Desde Dashboard
1. Proyecto → Settings → Environment Variables
2. Agregar cada variable manualmente
```

#### 3. Deploy

```bash
cd backend

# Instalar Vercel CLI (si no está)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Resultado:** `https://tu-backend.vercel.app`

### C. Deploy Frontend en Vercel

#### 1. Actualizar `environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.vercel.app'  // URL del backend en Vercel
};
```

#### 2. Configurar Vercel

**Archivo:** `frontend/vercel.json` (opcional)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/frontend/browser",
  "framework": "angular",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 3. Deploy

```bash
cd frontend

# Deploy
vercel --prod
```

**Resultado:** `https://tu-frontend.vercel.app`

### D. Ejecutar Migraciones en Producción

```bash
# Opción 1: Desde local con conexión a Cloud SQL
cd backend
source .venv/bin/activate  # o activate en Windows

# Configurar .env con datos de producción temporalmente
flask db upgrade

# Opción 2: Desde Cloud Shell de Google
# Conectarse a Cloud SQL y ejecutar migraciones manualmente
```

### E. Ejecutar Seeders en Producción (Opcional)

```bash
# Solo si necesitas datos de prueba en producción
python seed.py
```

---

## ✅ Verificación del Deploy

### Checklist de Verificación

#### Backend

- [ ] Backend responde en la URL de Vercel
- [ ] Endpoint de prueba funciona: `GET /users`
- [ ] Base de datos conecta correctamente
- [ ] CORS configurado para permitir frontend
- [ ] Variables de entorno cargadas
- [ ] Logs sin errores en Vercel Dashboard

**Test rápido:**
```bash
curl https://tu-backend.vercel.app/users
```

#### Frontend

- [ ] Frontend carga en la URL de Vercel
- [ ] Se conecta al backend correctamente
- [ ] Rutas de Angular funcionan
- [ ] Estilos de Nebular cargan
- [ ] No hay errores en consola del navegador

**Test rápido:**
```bash
curl https://tu-frontend.vercel.app
```

#### Base de Datos

- [ ] Instancia Cloud SQL activa
- [ ] Tablas creadas correctamente
- [ ] Datos de seeders cargados (si aplica)
- [ ] Conexiones desde backend funcionan

**Test SQL:**
```sql
-- Conectarse a Cloud SQL
USE enigma_db;
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

#### Integración Completa

- [ ] Frontend → Backend → Database fluye correctamente
- [ ] Autenticación funciona (si aplica)
- [ ] Mercado Pago integrado correctamente
- [ ] Logs de errores monitoreados

---

## 🔥 Troubleshooting

### Problemas Comunes - Backend

#### Error: "No module named 'flask'"

**Causa:** Entorno virtual no activado o dependencias no instaladas

**Solución:**
```bash
# Activar entorno virtual
source .venv/bin/activate  # Linux/Mac
.\.venv\Scripts\activate   # Windows

# Reinstalar dependencias
pip install -r requirements.txt
```

#### Error: "Access denied for user"

**Causa:** Credenciales de BD incorrectas o usuario sin permisos

**Solución:**
```sql
-- Verificar usuario
SELECT User, Host FROM mysql.user WHERE User = 'enigma_user';

-- Recrear permisos
GRANT ALL PRIVILEGES ON enigma_db.* TO 'enigma_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Error: "Can't connect to MySQL server"

**Causa:** MySQL no está corriendo o puerto incorrecto

**Solución:**
```bash
# Verificar estado de MySQL
sudo systemctl status mysql  # Linux
brew services list  # Mac
services.msc  # Windows

# Verificar puerto
netstat -an | grep 3306
```

#### Error: "CORS policy blocked"

**Causa:** CORS no configurado correctamente

**Solución:**
```python
# Verificar en app.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Desarrollo

# Producción (restringir origen)
CORS(app, resources={r"/*": {"origins": "https://tu-frontend.vercel.app"}})
```

#### Error en Migraciones

**Causa:** Migraciones desincronizadas o error en modelo

**Solución:**
```bash
# Eliminar carpeta migrations
rm -rf migrations

# Reiniciar migraciones
flask db init
flask db migrate -m "Reset migrations"
flask db upgrade
```

### Problemas Comunes - Frontend

#### Error: "npm install" falla

**Causa:** Cache corrupta o conflicto de versiones

**Solución:**
```bash
# Limpiar cache
npm cache clean --force

# Eliminar node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

#### Error: "Can't resolve '@angular/core'"

**Causa:** Dependencias de Angular no instaladas

**Solución:**
```bash
npm install @angular/core@19.2.15
npm install
```

#### Error: "Port 4200 is already in use"

**Causa:** Otro proceso usando el puerto

**Solución:**
```bash
# Opción 1: Usar otro puerto
ng serve --port 4300

# Opción 2: Matar proceso (Linux/Mac)
lsof -ti:4200 | xargs kill -9

# Opción 3: Matar proceso (Windows)
netstat -ano | findstr :4200
taskkill /PID [PID] /F
```

#### Error: "Cannot GET /ruta" en producción

**Causa:** Rutas de Angular no configuradas en servidor

**Solución:**
```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Problemas Comunes - Vercel

#### Error: "Build failed"

**Causa:** Configuración incorrecta o dependencias faltantes

**Solución:**
```bash
# Backend: verificar vercel.json existe
# Frontend: verificar build local funciona
npm run build

# Ver logs detallados
vercel logs [deployment-url]
```

#### Error: "Environment variables not loaded"

**Causa:** Variables no configuradas en Vercel

**Solución:**
```bash
# Listar variables
vercel env ls

# Agregar variables faltantes
vercel env add [VARIABLE_NAME]
```

### Problemas Comunes - Google Cloud SQL

#### Error: "Can't connect from Vercel"

**Causa:** IP de Vercel no autorizada

**Solución:**
```
1. Cloud SQL → Instancia → Conexiones
2. Agregar red autorizada: 0.0.0.0/0 (temporal para pruebas)
3. Producción: Usar Cloud SQL Proxy o Private IP
```

#### Error: "Too many connections"

**Causa:** Límite de conexiones alcanzado

**Solución:**
```sql
-- Ver conexiones actuales
SHOW PROCESSLIST;

-- Aumentar max_connections en Cloud SQL
-- Desde Console → Flags → max_connections
```

---

## 📞 Soporte Adicional

### Comandos Útiles

```bash
# Ver variables de entorno (Backend)
flask shell
>>> import os
>>> os.getenv('DB_HOST')

# Ver versión de dependencias
pip list
npm list

# Logs de Vercel
vercel logs --follow

# Test de conexión a MySQL
mysql -h [HOST] -u [USER] -p[PASSWORD] [DATABASE]
```

### Recursos

- **Flask:** https://flask.palletsprojects.com/
- **Angular:** https://angular.dev/
- **Vercel:** https://vercel.com/docs
- **Google Cloud SQL:** https://cloud.google.com/sql/docs
- **Mercado Pago:** https://www.mercadopago.com.ar/developers

---

## 📝 Notas Finales

### Buenas Prácticas

1. **Nunca subir `.env` o archivos con credenciales a Git**
2. **Usar `.gitignore` correctamente**
3. **Rotar credenciales periódicamente**
4. **Mantener dependencias actualizadas**
5. **Monitorear logs en producción**
6. **Hacer backups de la base de datos**
7. **Usar variables de entorno distintas por ambiente**

### Mantenimiento

```bash
# Actualizar dependencias Backend
pip list --outdated
pip install --upgrade [package]
pip freeze > requirements.txt

# Actualizar dependencias Frontend
npm outdated
npm update

# Nueva migración
flask db migrate -m "Descripción del cambio"
flask db upgrade
```

---

**Documentación creada para:** Proyecto E-commerce Fullstack  
**Última actualización:** Noviembre 2025  
**Versión:** 1.0