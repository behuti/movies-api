import { Router } from 'express'
import { randomUUID } from 'crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

// How to read a JSON file in ESmodules
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('../movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
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

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ error: 'Movie not found' })
})

moviesRouter.post('/', (req, res) => {
  // Validation
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: randomUUID(), // uuidv4
    ...result.data
  }
  // This cannot be considered like REST, because we are not storing the state in memory
  movies.push(newMovie)

  res.status(201).json(newMovie) // Update the cache status
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})

moviesRouter.patch('/:id', (req, res) => {
  // Validation
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
