import axios from 'axios'
import { axiosError } from './errorHandler'

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.79:5000/api/prime",
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (!token) {
    return config
  }
  config = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` }
  }
  return config
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
  res => res,
  err => {
    console.error('axiosInstance err:', err)
    axiosError(err)
  }
)

export { axiosInstance }
