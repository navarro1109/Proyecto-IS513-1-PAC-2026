
<div align="center">

  # PROYECTO - DISENO DIGITAL
API DE PELICULAS
</div>

## Responsable

Fernando Jared Orellana - 20192030277

<img  alt="GIF" src="https://cdn.sanity.io/images/qyzm5ged/production/6e9ba02908d8f9589ec90db79eeff45288d8f954-1762x985.gif/providing-real-time-search-suggestions.gif" />

## Recursos necesarios

- VS Code
- Git
- Docker

## Para clonar el repositorio

Ejecutar el siguiente comando desde la consola de su computadora (despues de haber instalado git)

```bash
git clone https://github.com/navarro1109/Proyecto-IS513-1-PAC-2026
```
## Para levantar la Base de datos y el Servidor con Docker
Paso 1 — Levantar la base de datos (Docker)
Primero verifica que Docker esté corriendo (abre Docker Desktop), luego:
cd "./project location"
docker compose up -d

Paso 2 — Crear el archivo .env
cp .env.example .env

DB_HOST=localhost
DB_USER=unah
DB_PASSWORD=unah2026
DB_NAME=db_movies_unah
DB_PORT=3308
PORT=4321
JWT_SECRET_KEY=cualquier_texto_secreto

Paso 3 — Instalar dependencias y correr el servidor
# Paso 4 — Probar la API


## Trabajando y probando los endpoints

Se trabajo utilizando las 2 capas principales de MVC afectadas por los cambios y adiciones requeridas 

<img  alt="GIF" src="https://drive.google.com/file/d/1LvJ9HGYOgfBYlbrZ6jwcvenyf4vvCkP7/view?usp=sharing"/>

 # Ejemplo de las funciones en Genres

<img  alt="GIF" src= "https://drive.google.com/file/d/1yYedW5HEWIvlKxuV2fWdlE-729WiN1HT/view?usp=sharing"/>

# Se realizaron las pruebas que todo esto funcionara gracias a el archivo Api.http

<img alt="GIF" src= "https://drive.google.com/file/d/1Nrzm_Bg_MljnwN383ZI1GJVGeV4l8K6D/view?usp=sharing" />
