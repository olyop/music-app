export interface Artist {
  name: string
  photo: string
  artistId: string
}

export interface Album {
  title: string
  cover: string
  albumId: string
  released: number
  artists: Artist[]
}
