import React, { useState, Fragment } from "react"

import { Mutation } from "react-apollo"

import { Add as bemAdd, AddSong as bem } from "../../../globals/bem"
import { handleFormChange, handleFormSubmit } from "./helpers"
import mutation from "./mutations/addSong.graphql"
import { FORM_INIT } from "../../../globals"
import { isUndefined } from "lodash"

const AddSong = () => {
  const init = FORM_INIT.ADD.SONG
  const [ form, setForm ] = useState(init)
  const onChange = handleFormChange(setForm)
  const onSubmit = handleFormSubmit(form, setForm, init)
  const { title, trackNumber, artist, album } = form
  return (
    <Mutation mutation={mutation}>
      {(addSong, { data }) => (
        <form
          onSubmit={onSubmit(addSong)}
          className={bem("", { ignore: true, className: bemAdd("form") })}
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
                  onChange={onChange("title")}
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
                  onChange={onChange("trackNumber")}
                  className={bemAdd("formInput")}
                  value={trackNumber}
                  id="trackNumber"
                  type="text"
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
                  onChange={onChange("artist")}
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
                  className={bemAdd("formInput")}
                  onChange={onChange("album")}
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
            <pre
              children={JSON.stringify(isUndefined(data) ? {} : data.addSong, undefined, 2)}
              className={bemAdd("pre")}
            />
          </Fragment>}
        />
      )}
    </Mutation>
  )
} 

export default AddSong
