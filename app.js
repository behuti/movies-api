const express = require('express')
const movies = require('./movies.json')
const crypto = require('crypto')
const { validateMovie } = require('./schemas/movies')

const app = express()

app.disable('x-powered-by')
app.use(express.json())

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

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuidv4
    ...result.data
  }
  // Esto no es REST porque estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // Actualizar la caché del cliente
})

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`)
})
