export interface GalleryItem {
  date: string
  title: string
  url: string
  hdurl?: string
  media_type: 'image' | 'video'
  explanation: string
}
