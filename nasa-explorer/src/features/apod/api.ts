import axios from 'axios'
import type { ApodItem } from './types'

// NASA demo key has rate limits; users should get free key at https://api.nasa.gov/
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
const BASE_URL = 'https://api.nasa.gov/planetary/apod'

export const fetchApodToday = async (): Promise<ApodItem> => {
  const response = await axios.get<ApodItem>(BASE_URL, {
    params: { api_key: NASA_API_KEY },
  })
  return response.data
}

export const fetchApodByDate = async (date: string): Promise<ApodItem> => {
  const response = await axios.get<ApodItem>(BASE_URL, {
    params: { api_key: NASA_API_KEY, date },
  })
  return response.data
}
