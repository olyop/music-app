import React, { Fragment } from "react"

import Grid from "../Grid"
import Cover from "../Cover"
import Album from "../Album"
import QueryApi from "../QueryApi"
import SongsTable from "../SongsTable"
import InLibraryButton from "../InLibraryButton"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { determinePlural } from "../../helpers"

import GET_ARTIST_PAGE from "../../graphql/queries/getArtistPage.gql"

import "./index.scss"

const bem = reactBem("ArtistPage")

const ArtistPage = () => (
  <div className={bem("")}>
    <QueryApi
      query={GET_ARTIST_PAGE}
      variables={useParams()}
      children={
        ({ artist }) => {
          const { name, photo, songs, albums } = artist
          return (
            <Fragment>
              <Cover
                url={photo}
                className={bem("cover")}
                imgClassName={bem("cover-img")}
              />
              <h2 className={bem("name")}>
                <span className={bem("name-text")}>{name}</span>
                <InLibraryButton
                  doc={artist}
                  className={bem("name-add")}
                />
              </h2>
              <div className={bem("length")}>
                {songs.length}
                <Fragment> song</Fragment>
                <Fragment>{determinePlural(songs)}</Fragment>
                {isEmpty(albums) ? null : (
                  <Fragment>
                    <Fragment>, </Fragment>
                    {albums.length}
                    <Fragment> album</Fragment>
                    {determinePlural(albums)}
                  </Fragment>
                )}
              </div>
              {isEmpty(albums) ? null : (
                <Grid className={bem("albums")}>
                  {albums.map(
                    album => (
                      <Album
                        album={album}
                        key={album.id}
                      />
                    ),
                  )}
                </Grid>
              )}
              {isEmpty(songs) ? null : (
                <SongsTable
                  songs={songs}
                  columnsToIgnore={["numOfPlays", "trackNumber", "dateAdded"]}
                />
              )}
            </Fragment>
          )
        }
      }
    />
  </div>
)

export default ArtistPage
