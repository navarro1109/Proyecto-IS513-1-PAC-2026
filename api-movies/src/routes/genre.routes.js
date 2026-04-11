import { Router } from 'express'
import { getAll, getById, create, update, deleteGenre } from '../controllers/genre.controller.js'

const genreRouter = Router()

genreRouter.get('/', getAll)
genreRouter.get('/:id', getById)
genreRouter.post('/', create)
genreRouter.put('/:id', update)
genreRouter.delete('/:id', deleteGenre)

export default genreRouter
