import { Router } from 'express'
import { getAll, getById, create } from '../controllers/director.controller.js'

const directorRouter = Router()

directorRouter.get('/', getAll)
directorRouter.get('/:id', getById)
directorRouter.post('/', create)

export default directorRouter
