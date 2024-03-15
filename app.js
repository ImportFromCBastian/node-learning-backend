import express, { json } from 'express'
import { corsMiddleware } from './middleware/cors.js'
import { moviesRouter } from './routes/movies.js'

// import movies from './movies.json' with { type: 'json' }

const app = express()

app.disable('x-powered-by') // Disable the X-Powered-By header

app.use(json())
app.use(corsMiddleware())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
