import axios from 'axios'
import type { GalleryItem } from './types'

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
const BASE_URL = 'https://api.nasa.gov/planetary/apod'

export const fetchApodRange = async (
  startDate: string,
  endDate: string
): Promise<GalleryItem[]> => {
  const response = await axios.get<GalleryItem[]>(BASE_URL, {
    params: {
      api_key: NASA_API_KEY,
      start_date: startDate,
      end_date: endDate,
    },
  })
  // Return in reverse order (newest first)
  return response.data.reverse()
}
