import React, { useContext } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import ListStyleContext from "../../contexts/ListStyle"

import { propTypes, defaultProps } from "./props"

const Album = ({ album, className }) => {
  const { listStyle } = useContext(ListStyleContext)
  return listStyle === "grid" ? (
    <div className={["Card", "Elevated", className].join(" ")}>
      <Cover url={album.cover} />
      <Item
        doc={album}
        className="PaddingHalf"
        upper={<DocLink doc={album} />}
        lower={<DocLinks ampersand docs={album.artists} />}
      />
    </div>
  ) : (
    <Item
      doc={album}
      imgDoc={album}
      upper={<DocLink doc={album} />}
      lower={<DocLinks docs={album.artists} ampersand />}
      className={[className, "PaddingHalf", "ItemBorder", "Hover"].join(" ")}
    />
  )
}

Album.propTypes = propTypes
Album.defaultProps = defaultProps

export default Album
