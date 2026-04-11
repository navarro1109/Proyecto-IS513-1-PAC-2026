import { Router } from 'express'
import { getAll, getById, create, update, deleteMovie } from '../controllers/movie.controller.js'

const moviesRouter = Router()

moviesRouter.get('/', getAll)
moviesRouter.get('/:id', getById)
moviesRouter.post('/', create)
moviesRouter.put('/:id', update)
moviesRouter.delete('/:id', deleteMovie)

export default moviesRouter
