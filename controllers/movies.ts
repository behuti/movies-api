import { Request, Response } from 'express'
import { MovieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static getAll = async (req:Request, res:Response) => {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static getById = async (req:Request, res:Response) => {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ error: 'Movie not found' })
  }

  static create = async (req:Request, res:Response) => {
    // Validation
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie) // Update the cache status
  }

  static delete = async (req:Request, res:Response) => {
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static update = async (req:Request, res:Response) => {
    // Validation
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })

    if (updatedMovie === false) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    return res.json(updatedMovie)
  }
}
