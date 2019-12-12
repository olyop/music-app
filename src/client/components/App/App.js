import React, { useState, Fragment } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"

const init = {
  "id": "5df03eae6cd3684698802819",
  "title": "Turn Me On",
  "mix": "",
  "discNumber": 1,
  "trackNumber": 1,
  "duration": 281,
  "featuring": [
    {
      "id": "5df03e486cd3684698802817",
      "name": "Vula",
    },
  ],
  "remixers": [],
  "artists": [
    {
      "id": "5df03d7a6cd3684698802815",
      "name": "Riton",
    },
    {
      "id": "5df03da96cd3684698802816",
      "name": "Oliver Heldens",
    },
  ],
  "genres": [
    {
      "id": "5dae5fbfc3f0c42c325a880f",
      "name": "Future House",
    },
  ],
  "album": {
    "id": "5df03e806cd3684698802818",
    "title": "Turn Me On",
    "released": 18159,
  },
}

const App = () => {
  const [ song, setSong ] = useState(init)
  return (
    <Fragment>
      <Header/>
      <Pages/>
      <Player
        song={song}
        setSong={setSong}
      />
    </Fragment>
  )
}

export default App
