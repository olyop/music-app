import React, { useState, Fragment } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"

const init = {
  id: "5dae60b5c3f0c42c325a88c7",
  title: "Ocean",
  mix: "Extended",
  trackNumber: 2,
  discNumber: 1,
  duration: 260,
  featuring: [{  
    id: "5dae5e85c3f0c42c325a878e",
    name: "Khalid",
  }],
  remixers: [{
    id: "5dae5e92c3f0c42c325a8793",
    name: "Don Diablo",
  }],
  artists: [{
    id: "5dae5e56c3f0c42c325a877b",
    name: "Martin Garrix",
  }],
  album: {
    id: "5dae5f3bc3f0c42c325a87c4",
    title: "Ocean (Don Diablo Remix)",
    released: 17753,
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
