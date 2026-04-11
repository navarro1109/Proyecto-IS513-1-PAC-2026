import Movie from '../service/movie.js'
import { validateMovieSchema, validatePartialMovieSchema } from '../schemas/movie.schema.js'

export const getAll = async (req, res) => {

    const { query } = req

    const dataFilter = {}
    if (query.genre) dataFilter.genre = query.genre
    if (query.director) dataFilter.director = query.director
    if (query.year) dataFilter.year = query.year

    try {
        const movies = await Movie.getAll(dataFilter)

        const newList = movies.map((movie) => ({
            ...movie,
            genres: movie.genres ? movie.genres.split(', ') : [],
            directors: movie.directors ? movie.directors.split(', ') : []
        }))

        return res.json({
            status: 'success',
            message: 'Listado de peliculas',
            data: newList
        })

    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al consultar la base de datos: ' + e.message,
            data: null
        })
    }
}

export const getById = async (req, res) => {

    const { id } = req.params

    try {
        const [movie] = await Movie.find(id)

        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Pelicula no encontrada',
                data: null
            })
        }

        return res.json({
            status: 'success',
            message: 'Pelicula encontrada',
            data: {
                ...movie,
                genres: movie.genres ? movie.genres.split(', ') : [],
                directors: movie.directors ? movie.directors.split(', ') : []
            }
        })

    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'Error en el servidor: ' + e.message,
            data: null
        })
    }
}

export const create = async (req, res) => {

    const { success, data, error } = validateMovieSchema(req.body)

    if (!success) {
        return res.status(400).json({
            status: 'error',
            message: 'Verifique la informacion enviada',
            errors: JSON.parse(error.message)
        })
    }

    try {
        const newMovie = await Movie.create(data)

        return res.status(201).json({
            status: 'success',
            message: 'Pelicula creada correctamente',
            data: newMovie
        })

    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al crear la pelicula: ' + e.message,
            data: null
        })
    }
}

export const update = async (req, res) => {

    const { id } = req.params

    const { success, data, error } = validatePartialMovieSchema(req.body)

    if (!success) {
        return res.status(400).json({
            status: 'error',
            message: 'Datos incorrectos',
            errors: JSON.parse(error.message)
        })
    }

    try {
        const [movie] = await Movie.find(id)

        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Pelicula no encontrada'
            })
        }

        const updatedMovie = await Movie.update(id, data)

        return res.json({
            status: 'success',
            message: 'Pelicula actualizada',
            data: updatedMovie
        })

    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar la pelicula: ' + e.message,
            data: null
        })
    }
}

export const deleteMovie = async (req, res) => {

    const { id } = req.params

    try {
        const [movie] = await Movie.find(id)

        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Pelicula no encontrada'
            })
        }

        await Movie.delete(id)

        return res.json({
            status: 'success',
            message: 'Pelicula eliminada'
        })

    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la pelicula: ' + e.message,
            data: null
        })
    }
}
