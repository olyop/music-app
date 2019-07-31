export const GET = "GET"
export const POST = "POST"
export const PUT = "PUT"
export const DELETE = "DELETE"

// export const SERVER_URL = ""
export const SERVER_URL = "http://localhost:3000"

export const API_URL = `${SERVER_URL}/graphql`

export const ROOT_ELEMENT = document.getElementById("App")

export const FORM_INIT = {
  ADD: {
    ARTIST: {
      name: ""
    },
    ALBUM: {
      title: "",
      year: 2019,
      artist: ""
    },
    SONG: {
      title: "",
      trackNumber: 1,
      artist: "",
      album: ""
    }
  }
}
