import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'api/notes'
})

export const fetcher = (path: string) => axiosInstance.get(path).then(res => res.data);
