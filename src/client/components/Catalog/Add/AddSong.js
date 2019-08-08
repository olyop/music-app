import React, { useState, Fragment } from "react"

import { useMutation } from "@apollo/react-hooks"

import { isString, toInteger, isSafeInteger, inRange, isUndefined } from "lodash"
import { Add as bemAdd, AddSong as bem } from "../../../globals/bem"
import { handleFormChange, handleFormSubmit } from "./helpers"
import mutation from "./mutations/addSong.graphql"
import { isLength, isHex } from "../../../helpers/misc"
import { FORM_INIT } from "../../../globals"

const AddSong = () => {
  
  const init = FORM_INIT.ADD.SONG
  const [ form, setForm ] = useState(init)
  const [ addSong, { data } ] = useMutation(mutation)
  const { title, trackNumber, featuring, remixers, artists, album } = form

  const onChange = handleFormChange(form, setForm)

  const onSubmit = event => {
    event.preventDefault()
    if (
      isSafeInteger(trackNumber) && inRange(trackNumber, 1, Infinity) &&
      isString(title) && isHex(title) && inRange(title.length, 1, 256) &&
      isString(artists) && isHex(artists) && isLength(artists, 24) &&
      isString(album) && isHex(album) && isLength(album, 24)
    ) {
      handleFormSubmit(form, setForm, init, addSong)
    }
  }

  console.log(isHex(album))

  return (
    <form
      className={bem({ ignore: true, className: bemAdd("form") }, "")}
      onSubmit={onSubmit}
      children={<Fragment>

        {/* formTitle */}
        <h2
          className={bemAdd("formTitle")}
          children="song"
        />

        <div className={bemAdd("sectionOne")}>

        {/* trackNumber */}
        <label
          htmlFor="trackNumber"
          className={bemAdd("formLabel", "songTrackNumber")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="track"
            />
            <input
              onChange={onChange("trackNumber", toInteger)}
              className={bemAdd("formInput")}
              value={trackNumber}
              id="trackNumber"
              max={Infinity}
              type="number"
              min={1}
            />
          </Fragment>}
        />
        
        {/* title */}
        <label
          htmlFor="title"
          className={bemAdd("formLabel", "songTitle")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="title"
            />
            <input
              onChange={onChange("title", encodeURI)}
              className={bemAdd("formInput")}
              value={decodeURI(title)}
              maxLength={256}
              minLength={1}
              type="text"
              id="title"
            />
          </Fragment>}
        />

        </div>

        {/* featuring */}
        <label
          htmlFor="featuring"
          className={bemAdd("formLabel")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="featuring"
            />
            <input
              onChange={onChange("featuring", encodeURI)}
              className={bemAdd("formInput")}
              value={decodeURI(featuring)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              maxLength={24}
              id="featuring"
              type="text"
            />
          </Fragment>}
        />

        {/* remixers */}
        <label
          htmlFor="remixers"
          className={bemAdd("formLabel")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="remixers"
            />
            <input
              onChange={onChange("remixers", encodeURI)}
              className={bemAdd("formInput")}
              value={decodeURI(remixers)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              maxLength={24}
              id="remixers"
              type="text"
            />
          </Fragment>}
        />

        {/* artists */}
        <label
          htmlFor="artists"
          className={bemAdd("formLabel")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="artists"
            />
            <input
              onChange={onChange("artists", encodeURI)}
              className={bemAdd("formInput")}
              value={decodeURI(artists)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              maxLength={24}
              id="artists"
              type="text"
            />
          </Fragment>}
        />

        {/* album */}
        <label
          htmlFor="album"
          className={bemAdd("formLabel")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="album"
            />
            <input
              onChange={onChange("album", encodeURI)}
              className={bemAdd("formInput")}
              value={decodeURI(album)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              maxLength={24}
              type="text"
              id="album"
            />
          </Fragment>}
        />

        {/* submit */}
        <input
          className={bemAdd("submit")}
          type="submit"
          text="submit"
        />

        {isUndefined(data) ? null : (
          <p
            children={`${data.addSong.title} - ${data.addSong.id}`}
            className={bemAdd("data")}
          />
        )}
      </Fragment>}
    />
  )
} 

export default AddSong
