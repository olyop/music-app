import React, { useContext, Fragment } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import ListStyleContext from "../../contexts/ListStyle"

import { propTypes, defaultProps } from "./props"

const Artist = ({ artist, className }) => {
  const { listStyle } = useContext(ListStyleContext)
  return listStyle === "grid" ? (
    <div className={["Card", "Elevated"].join(" ")}>
      <Cover
        landscape
        url={artist.photo}
      />
      <Item
        doc={artist}
        className="PaddingHalf"
        upper={<DocLink doc={artist} />}
        lower={artist.numOfSongs && artist.numOfAlbums ? (
          <Fragment>
            {artist.numOfAlbums}
            <Fragment> albums, </Fragment>
            {artist.numOfSongs}
            <Fragment> of songs</Fragment>
          </Fragment>
        ) : null}
      />
    </div>
  ) : (
    <Item
      doc={artist}
      imgDoc={artist}
      upper={<DocLink doc={artist} />}
      lower={`${artist.numOfAlbums} albums, ${artist.numOfSongs} of songs`}
      className={[className, "PaddingHalf", "ItemBorder", "Hover"].join(" ")}
    />
  )
}

Artist.propTypes = propTypes
Artist.defaultProps = defaultProps

export default Artist
