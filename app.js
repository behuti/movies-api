import 'babel-polyfill'
import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.disable('x-powered-by') // Disable the X-Powered-By credits
app.use(json())
app.use(corsMiddleware())

// Router
app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`)
})
