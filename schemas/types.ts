export interface Movie {
  id: string | undefined
  title: string
  year: number
  director: string
  duration: number
  poster: string
  genre: string[]
  rate: number
}

export interface PartialMovie {
  title?: string
  year?: number
  director?: string
  duration?: number
  poster?: string
  genre?: string[]
  rate?: number
}