import express from 'express'
import dotenv from 'dotenv'
import moviesRouter from './src/routes/movies.routes.js'
import directorRouter from './src/routes/director.routes.js'
import genreRouter from './src/routes/genre.routes.js'
import authsRoutes from './src/routes/auth.routes.js'
import { isAuth } from './src/middlewares/isAuth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware para parsear JSON
app.use(express.json())

// Rutas publicas
app.get('/', (req, res) => {
    res.send('<h1>API Movies - IS513</h1>')
})
app.use('/auth', authsRoutes)

// Rutas protegidas
app.use('/movies', isAuth, moviesRouter)
app.use('/directors', isAuth, directorRouter)
app.use('/genres', isAuth, genreRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
