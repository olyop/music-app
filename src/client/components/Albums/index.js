import React, { useContext } from "react"

import Item from "../Item"
import Album from "../Album"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import ListStyleContext from "../../contexts/ListStyle"

import { arrayOf, object } from "prop-types"

const Albums = ({ albums }) => {
  const { listStyle } = useContext(ListStyleContext)
  if (listStyle === "grid") {
    return (
      <div className="Grid">
        {albums.map(
          album => (
            <Album
              album={album}
              key={album.albumId}
            />
          ),
        )}
      </div>
    )
  } else {
    return (
      <div className="Elevated">
        {albums.map(
          album => (
            <Item
              showImg
              doc={album}
              img={album.cover}
              key={album.albumId}
              imgTitle={album.title}
              imgUrl={`/album/${album.albumId}`}
              upper={<DocLink doc={album} path="/album" />}
              lower={<DocLinks docs={album.artists} path="/artist" ampersand />}
            />
          ),
        )}
      </div>
    )
  }
}

Albums.propTypes = {
  albums: arrayOf(object).isRequired,
}

export default Albums
