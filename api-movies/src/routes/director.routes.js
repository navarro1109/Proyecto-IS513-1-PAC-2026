import { Router } from 'express'
import { getAll, create } from '../controllers/director.controller.js'

const directorRouter = Router()

directorRouter.get('/', getAll)
directorRouter.post('/', create)

export default directorRouter
