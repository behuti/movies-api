import { readJSON } from '../../utils.js'
import { randomUUID } from 'crypto'
import { Movie, PartialMovie } from '../../schemas/types.js'

const movies = readJSON('./movies.json')

export class MovieModel {
  static getAll = async ({ genre = '' }: { genre: string }) => {
    if (genre) {
      return movies.filter((movie: Movie) =>
        movie.genre.some(
          (g: string) => g.toLocaleLowerCase() === genre.toLocaleLowerCase()
        )
      )
    }
    return movies
  }

  static getById = async ({ id }: { id: string }) => {
    const movie = movies.find((movie: Movie) => movie.id === id)
    return movie
  }

  static create = async ({ input }: { input: PartialMovie }) => {
    const newMovie = {
      id: randomUUID(), // uuidv4
      ...input
    }
    // This cannot be considered like REST, because we are not storing the state in memory
    movies.push(newMovie)

    return newMovie
  }

  static delete = async ({ id }: { id: string }) => {
    const movieIndex = movies.findIndex((movie: Movie) => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static update = async ({ id, input }: { id: string, input: PartialMovie }) => {
    const movieIndex = movies.findIndex((movie: Movie) => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = { ...movies[movieIndex], ...input }
    return movies[movieIndex]
  }
}
