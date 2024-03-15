import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'mysqlroot',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        'SELECT * FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )
      if (genres.length === 0) return []
      return []
    }
    const [movies] = await connection.query('SELECT BIN_TO_UUID(id),title,year,director,duration,poster,rate FROM movie;')

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query('SELECT title,year,director,duration,poster,rate FROM movie WHERE BIN_TO_UUID(id) = ?;', [id])
    if (movies.length === 0) return null
    return movies[0]
  }

  static async create ({ input }) {

  }

  static async update ({ id, input }) {
    try {
      const [result] = await connection.query('SELECT BIN_TO_UUID(id) as id ,title,year,director,duration,poster,rate FROM movie WHERE BIN_TO_UUID(id) = ?;', [id])
      if (result.length === 0) return null

      const {
        title,
        year,
        director,
        duration,
        poster,
        rate
      } = input

      const vanilla = result[0]

      await connection.query(`
      UPDATE movie 
      SET 
        title = ?,
        year = ?,
        director = ?,
        duration = ?, 
        poster = ?, 
        rate = ? 
      WHERE BIN_TO_UUID(id) = ?;`,
      [title || vanilla.title,
        year || vanilla.year,
        director || vanilla.director,
        duration || vanilla.duration,
        poster || vanilla.poster,
        rate || vanilla.rate,
        vanilla.id])

      const newMovie = await connection.query('SELECT title,year,director,duration,poster,rate FROM movie WHERE BIN_TO_UUID(id) = ?;', [vanilla.id])

      return newMovie[0]
    } catch (e) {
      throw new Error('Error updating movie')
    }
  }
}
