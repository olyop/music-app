import React, { useState, Fragment } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"

const init = {
  "id": "5de8692b9e03e61a40b066b9",
  "title": "Made In France",
  "mix": "",
  "discNumber": 1,
  "trackNumber": 6,
  "duration": 252,
  "featuring": [],
  "remixers": [],
  "artists": [
    {
      "id": "5de867b39e03e61a40b066b4",
      "name": "DJ Snake",
      "__typename": "Artist",
    },
    {
      "id": "5de867fa9e03e61a40b066b5",
      "name": "Tchami",
      "__typename": "Artist",
    },
    {
      "id": "5de868329e03e61a40b066b7",
      "name": "Malaa",
      "__typename": "Artist",
    },
    {
      "id": "5de8680b9e03e61a40b066b6",
      "name": "Mercer",
      "__typename": "Artist",
    },
  ],
  "genres": [
    {
      "id": "5dcfb467e569c341f4ec8f39",
      "name": "Bass House",
      "__typename": "Genre",
    },
  ],
  "album": {
    "id": "5de868d49e03e61a40b066b8",
    "title": "Carte Blanche",
    "released": 18103,
    "__typename": "Album",
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
