import { readJSON } from '../utils.js'
import { randomUUID } from 'crypto'

const movies = readJSON('./movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some(
          (g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase()
        )
      )
    }
    return movies
  }

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static create = async ({ input }) => {
    const newMovie = {
      id: randomUUID(), // uuidv4
      ...input
    }
    // This cannot be considered like REST, because we are not storing the state in memory
    movies.push(newMovie)

    return newMovie
  }

  static delete = async ({ id }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static update = async ({ id, input }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = { ...movies[movieIndex], ...input }
    return movies[movieIndex]
  }
}
