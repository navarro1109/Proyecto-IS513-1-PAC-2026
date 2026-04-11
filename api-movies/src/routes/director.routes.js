import { Router } from 'express'
import { getAll, getById, create, update, deleteDirector } from '../controllers/director.controller.js'

const directorRouter = Router()

directorRouter.get('/', getAll)
directorRouter.get('/:id', getById)
directorRouter.post('/', create)
directorRouter.put('/:id', update)
directorRouter.delete('/:id', deleteDirector)

export default directorRouter
