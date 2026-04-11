import MOVIES from '../data/movies.json' with { type: 'json' }
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../config/db.js'
export default class Movie {

    static getAll = async ({ genre, director, year } = {}) => {


        const [rows] = await pool.query(`SELECT 
                                    m.id, 
                                    m.title, 
                                    m.release_year,
                                    m.synopsis,
                                    GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS genres,
                                    GROUP_CONCAT(DISTINCT d.full_name SEPARATOR ', ') AS directors
                                FROM movies m
                                LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                                LEFT JOIN genres g ON mg.genre_id = g.id
                                LEFT JOIN movie_directors md ON m.id = md.movie_id
                                LEFT JOIN directors d ON md.director_id = d.id
                                GROUP BY m.id;`);


        //conectarse a la base de datos
        //hacer la consutla (query)
        // retornar los resultados

        //concatenar con un where
        if (genre) {
            //throw -> genera un error generico
            // throw Error('user not found')

            return MOVIES.filter((movie) => {
                return movie.genre.some((g) => {
                    return g.toLowerCase() === genre.toLowerCase()
                })
            })
        }
        //select *from 
        return rows
    }

    static find = async (id) => {

        const [rows] = await pool.query(`SELECT 
                                    m.id, 
                                    m.title, 
                                    m.release_year,
                                    m.synopsis,
                                    GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS genres,
                                    GROUP_CONCAT(DISTINCT d.full_name SEPARATOR ', ') AS directors
                                FROM movies m
                                LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                                LEFT JOIN genres g ON mg.genre_id = g.id
                                LEFT JOIN movie_directors md ON m.id = md.movie_id
                                LEFT JOIN directors d ON md.director_id = d.id
                                where m.id = :id
                                GROUP BY m.id;`, { id }); //bind param

        return rows
    }

    static create = async ({ title, director, posterUrl, genre, release_year, synopsis }) => {

        const connection = await pool.getConnection()

        try {
            await connection.beginTransaction()

            // 1. Insertar la pelicula
            const [result] = await connection.query(
                'INSERT INTO movies (title, release_year, synopsis, poster_url) VALUES (:title, :release_year, :synopsis, :posterUrl)',
                { title, release_year: release_year ?? null, synopsis: synopsis ?? null, posterUrl: posterUrl ?? null }
            )

            const movieId = result.insertId

            // 2. Insertar relaciones con generos
            for (const genreId of genre) {
                await connection.query(
                    'INSERT INTO movie_genres (movie_id, genre_id) VALUES (:movieId, :genreId)',
                    { movieId, genreId }
                )
            }

            // 3. Insertar relaciones con directores
            for (const directorId of director) {
                await connection.query(
                    'INSERT INTO movie_directors (movie_id, director_id) VALUES (:movieId, :directorId)',
                    { movieId, directorId }
                )
            }

            await connection.commit()

            // 4. Retornar la pelicula creada con sus relaciones
            const [rows] = await connection.query(`
                SELECT m.id, m.title, m.release_year, m.synopsis, m.poster_url,
                    GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS genres,
                    GROUP_CONCAT(DISTINCT d.full_name SEPARATOR ', ') AS directors
                FROM movies m
                LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                LEFT JOIN genres g ON mg.genre_id = g.id
                LEFT JOIN movie_directors md ON m.id = md.movie_id
                LEFT JOIN directors d ON md.director_id = d.id
                WHERE m.id = :movieId
                GROUP BY m.id`, { movieId })

            return rows[0]

        } catch (e) {
            await connection.rollback()
            throw e
        } finally {
            connection.release()
        }
    }

    static update = async (id, { title, release_year, synopsis, posterUrl, genre, director }) => {

        const connection = await pool.getConnection()

        try {
            await connection.beginTransaction()

            // 1. Actualizar campos de la pelicula si vienen en el body
            const fields = []
            const values = { id }

            if (title !== undefined) { fields.push('title = :title'); values.title = title }
            if (release_year !== undefined) { fields.push('release_year = :release_year'); values.release_year = release_year }
            if (synopsis !== undefined) { fields.push('synopsis = :synopsis'); values.synopsis = synopsis }
            if (posterUrl !== undefined) { fields.push('poster_url = :posterUrl'); values.posterUrl = posterUrl }

            if (fields.length > 0) {
                await connection.query(
                    `UPDATE movies SET ${fields.join(', ')} WHERE id = :id`,
                    values
                )
            }

            // 2. Si vienen generos, reemplazar relaciones
            if (genre !== undefined) {
                await connection.query('DELETE FROM movie_genres WHERE movie_id = :id', { id })
                for (const genreId of genre) {
                    await connection.query(
                        'INSERT INTO movie_genres (movie_id, genre_id) VALUES (:id, :genreId)',
                        { id, genreId }
                    )
                }
            }

            // 3. Si vienen directores, reemplazar relaciones
            if (director !== undefined) {
                await connection.query('DELETE FROM movie_directors WHERE movie_id = :id', { id })
                for (const directorId of director) {
                    await connection.query(
                        'INSERT INTO movie_directors (movie_id, director_id) VALUES (:id, :directorId)',
                        { id, directorId }
                    )
                }
            }

            await connection.commit()

            // 4. Retornar la pelicula actualizada
            const [rows] = await connection.query(`
                SELECT m.id, m.title, m.release_year, m.synopsis, m.poster_url,
                    GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS genres,
                    GROUP_CONCAT(DISTINCT d.full_name SEPARATOR ', ') AS directors
                FROM movies m
                LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                LEFT JOIN genres g ON mg.genre_id = g.id
                LEFT JOIN movie_directors md ON m.id = md.movie_id
                LEFT JOIN directors d ON md.director_id = d.id
                WHERE m.id = :id
                GROUP BY m.id`, { id })

            return rows[0]

        } catch (e) {
            await connection.rollback()
            throw e
        } finally {
            connection.release()
        }
    }

    static delete = async (id) => {
        await pool.query('DELETE FROM movies WHERE id = :id', { id })
    }

}

