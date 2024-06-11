import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '12345',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [genre.toLowerCase()]
      )

      if (genres.length === 0) return []
      const [{ id }] = genres
      const [moviesByGenre] = await connection.query(
        'SELECT BIN_TO_UUID(movie_id) AS id, title, year, director, duration, poster, rate FROM movie INNER JOIN movie_genre AS mg ON movie_id = mg.movie_id WHERE mg.genre_id = ?;',
        [id]
      )
      return moviesByGenre
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
    )

    return movies
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
