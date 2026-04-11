import { Router } from 'express'
import { getAll, getById, create, update } from '../controllers/director.controller.js'

const directorRouter = Router()

directorRouter.get('/', getAll)
directorRouter.get('/:id', getById)
directorRouter.post('/', create)
directorRouter.put('/:id', update)

export default directorRouter
