import z from 'zod'
import { Movie } from './types.js'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Movie poster must be a valid URL'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'History',
      'Music',
      'Horror',
      'Romance',
      'Sci-Fi',
      'Suspense',
      'Thriller'
    ]),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum values'
    }
  ),
  rate: z.number().min(0).max(10).default(5)
})

export function validateMovie(shape: Movie) {
  return movieSchema.safeParse(shape)
}

export function validatePartialMovie(shape: Movie) {
  return movieSchema.partial().safeParse(shape)
}
