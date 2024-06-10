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
