import * as z from 'zod'

const movieSchema = z.object({
    title: z.string().min(2).max(100, 'El titulo no debe superar los 100 caracteres'),
    release_year: z.number().int().min(1888).max(2100).optional(),
    synopsis: z.string().max(500).optional(),
    director: z.array(z.int().positive(), 'Los directores deben ser un arreglo de enteros').min(1),
    posterUrl: z.string().url().nullable().optional(),
    genre: z.array(z.int().positive(), 'Los generos deben ser un arreglo de enteros').min(1).optional(),
}).strict()

export const validateMovieSchema = (movie) => {
    return movieSchema.safeParse(movie)
}

export const validatePartialMovieSchema = (movie) => {
    return movieSchema.partial().safeParse(movie)
}
