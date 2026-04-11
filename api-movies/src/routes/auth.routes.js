import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

const authsRoutes = Router()

authsRoutes.post('/login', AuthController.login)

export default authsRoutes
