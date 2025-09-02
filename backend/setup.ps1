# setup.ps1 - Configura el backend Flask con MySQL desde cero

Write-Host 'Creando entorno virtual...'
python -m venv .venv

Write-Host 'Activando entorno virtual...'
. .\.venv\Scripts\Activate.ps1

Write-Host 'Actualizando pip e instalando dependencias...'
pip install --upgrade pip
pip install -r requirements.txt

Write-Host 'Inicializando migraciones de Flask-Migrate...'
# Comprueba si la carpeta migrations ya existe
if (-Not (Test-Path '.\migrations')) {
    python -m flask --app app db init
} else {
    Write-Host 'La carpeta migrations ya existe, saltando db init...'
}

Write-Host 'Generando migracion inicial...'
python -m flask --app app db migrate -m 'initial migration'

Write-Host 'Aplicando migracion a la base de datos...'
python -m flask --app app db upgrade

Write-Host 'Todo listo!'
Write-Host 'Para activar el entorno en otra sesion: .\.venv\Scripts\Activate.ps1'
Write-Host 'Para correr Flask: flask --app app run --debug'
Write-Host 'Podes ejecutar tus seeders con: python seed.py'