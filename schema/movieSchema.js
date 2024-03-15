import zod from 'zod'

const movieSchema = zod.object({
  tittle: zod.string({
    invalid_type_error: 'Invalid type, expected string',
    required_error: 'Title is required'
  }),
  year: zod.number().int().min(1900).max(2024),
  director: zod.string(),
  duration: zod.number().int().positive(),
  rate: zod.number().min(0).max(10).default(5),
  poster: zod.string().url({
    message: 'Invalid URL'
  }),
  genre: zod.array(
    zod.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']),
    {
      invalid_type_error: 'Invalid genre',
      required_error: 'Genre is required'
    }
  )
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
