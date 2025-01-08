import axios from 'axios'

interface PostData {
  movieId?: string
  categoryId?: string
  rating?: number
  title?: string
  color?: string
  userId?: string
  newRole?: string
  comment?: string
  userName?: string
}

interface PostDataAdmin {
  movieId?: string
  title?: string
  description?: string
  videoUrl?: string
  poster?: string
  genres?: string[]
  cast?: string[]
  producers?: string[]
  directors?: string[]
  duration?: string
  year?: string
  imdbRating?: number
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const fetcherPost = (url: string, data: PostData) => axios.post(url, data).then((res) => res.data)

const fetcherDelete = (url: string) => axios.delete(url).then((res) => res.data)

const fetcherAdminPost = (url: string, data: PostDataAdmin) => axios.post(url, data).then((res) => res.data)

export { fetcher, fetcherPost, fetcherDelete, fetcherAdminPost }
