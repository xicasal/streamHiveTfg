import axios from 'axios'


const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const fetcherPost = (url: string, data: { movieId?: string; categoryId?: string; rating?: number; title?: string; color?: string }) => axios.post(url, data).then((res) => res.data)

const fetcherDelete = (url: string) => axios.delete(url).then((res) => res.data)

export { fetcher, fetcherPost, fetcherDelete }
