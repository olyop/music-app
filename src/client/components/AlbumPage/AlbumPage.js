import React from "react"

import Img from "../Img"

import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { catalogUrl } from "../../helpers/misc"

import "./AlbumPage.scss"

const bem = reactBem("AlbumPage")

const AlbumPage = () => {
  const { id } = useParams()
  return (
    <div className={bem("")}>
      <Img
        url={catalogUrl(id)}
        imgClassName={bem("img")}
      />
    </div>
  )
}

export default AlbumPage
