import React, { useState, Fragment } from "react"

import { Mutation } from "react-apollo"

import { isString, isSafeInteger, inRange, isUndefined } from "lodash"
import { Add as bemAdd, AddSong as bem } from "../../../globals/bem"
import { handleFormChange, handleFormSubmit } from "./helpers"
import mutation from "./mutations/addSong.graphql"
import { noopValue } from "../../../helpers/misc"
import { FORM_INIT } from "../../../globals"

const AddSong = () => {
  
  const init = FORM_INIT.ADD.SONG
  const [ form, setForm ] = useState(init)
  const { title, trackNumber, artist, album } = form

  const onChange = handleFormChange(form, setForm)

  const onSubmit = (...args) => event => {
    event.preventDefault()
    const isValid = (
      isString(title) && inRange(title.length, 1, 256) &&
      isSafeInteger(trackNumber) && inRange(trackNumber, 1, Infinity) &&
      isString(artist) && inRange(artist.length, 1, 256) &&
      isString(album) && inRange(album.length, 1, 256)
    )
    if (isValid) handleFormSubmit(...args)
  }

  return (
    <Mutation mutation={mutation}>
      {(addSong, { data }) => (
        <form
          className={bem("", { ignore: true, className: bemAdd("form") })}
          onSubmit={onSubmit(form, setForm, init, addSong)}
          children={<Fragment>
            <h2
              className={bemAdd("formTitle")}
              children="Song"
            />
            <label
              htmlFor="title"
              className={bemAdd("formLabel")}
              children={<Fragment>
                <span
                  className={bemAdd("formLabelText")}
                  children="Title"
                />
                <input
                  className={bemAdd("formInput")}
                  onChange={onChange("title", encodeURI)}
                  value={title}
                  type="text"
                  id="title"
                />
              </Fragment>}
            />
            <label
              htmlFor="trackNumber"
              className={bemAdd("formLabel")}
              children={<Fragment>
                <span
                  className={bemAdd("formLabelText")}
                  children="Track Number"
                />
                <input
                  onChange={onChange("trackNumber", noopValue)}
                  className={bemAdd("formInput")}
                  value={trackNumber}
                  id="trackNumber"
                  type="number"
                />
              </Fragment>}
            />
            <label
              htmlFor="artist"
              className={bemAdd("formLabel")}
              children={<Fragment>
                <span
                  className={bemAdd("formLabelText")}
                  children="Artist"
                />
                <input
                  onChange={onChange("artist", encodeURI)}
                  className={bemAdd("formInput")}
                  value={artist}
                  type="text"
                  id="artist"
                />
              </Fragment>}
            />
            <label
              htmlFor="albumId"
              className={bemAdd("formLabel")}
              children={<Fragment>
                <span
                  className={bemAdd("formLabelText")}
                  children="Album"
                />
                <input
                  onChange={onChange("album", encodeURI)}
                  className={bemAdd("formInput")}
                  value={album}
                  type="text"
                  id="album"
                />
              </Fragment>}
            />
            <input
              className={bemAdd("submit")}
              type="submit"
              text="Submit"
            />
            {isUndefined(data) ? null : <Fragment>
              <p
                children={`${data.addSong.title} - ${data.addSong.id}`}
                className={bemAdd("data")}
              />
            </Fragment>}
          </Fragment>}
        />
      )}
    </Mutation>
  )
} 

export default AddSong
