import React, { useContext } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import ListStyleContext from "../../contexts/ListStyle"

import { determinePlural } from "../../helpers"
import { string, shape, number, bool } from "prop-types"

const artistLower = ({ numOfSongs, numOfAlbums }) => (
  numOfSongs || numOfAlbums ? `
    ${numOfAlbums ? `${numOfAlbums} album${determinePlural(numOfAlbums)}, ` : ""}
    ${numOfSongs ? `${numOfSongs} song${determinePlural(numOfSongs)}` : ""}
  ` : null
)

const Artist = ({ artist, className }) => {
  const { listStyle } = useContext(ListStyleContext)
  return listStyle === "grid" ? (
    <div className={[className, "Card", "Elevated"].join(" ")}>
      <Cover
        landscape
        url={artist.photo}
      />
      <Item
        doc={artist}
        className="PaddingHalf"
        lower={artistLower(artist)}
        upper={<DocLink doc={artist} />}
      />
    </div>
  ) : (
    <Item
      doc={artist}
      imgDoc={artist}
      lower={artistLower(artist)}
      upper={<DocLink doc={artist} />}
      className={[className, "PaddingHalf", "ItemBorder", "Hover"].join(" ")}
    />
  )
}

Artist.propTypes = {
  className: string,
  artist: shape({
    inLibrary: bool,
    numOfSongs: number,
    numOfAlbums: number,
    name: string.isRequired,
    photo: string.isRequired,
    artistId: string.isRequired,
  }).isRequired,
}

Artist.defaultProps = {
  className: null,
}

export default Artist
