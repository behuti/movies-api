import express, { json } from 'express'
import { randomUUID } from 'crypto'
import cors from 'cors'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

// How to read a JSON file in ESmodules
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const movies = require('./movies.json')

const app = express()

app.disable('x-powered-by')
app.use(json())
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ['http://localhost:8080']
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
)

// Métodos "normales": GET/POST/HEAD
// Metodos de formulario: PUT/PATCH/DELETE -> CORS PRE-FLIGHT
// OPTIONS:

// Origins

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some(
        (g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase()
      )
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ error: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  // Validación
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: randomUUID(), // uuidv4
    ...result.data
  }
  // Esto no es REST porque estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // Actualizar la caché del cliente
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  // Validación
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (!movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  const updateMovie = { ...movies[movieIndex], ...result.data }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`)
})
