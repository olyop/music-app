import React, { useState, Fragment } from "react"

import { handleFormChange, handleFormSubmit, isAddSongFormValid } from "./helpers"
import { Add as bemAdd, AddSong as bem } from "../../../globals/bem"
import mutation from "./mutations/addSong.graphql"
import { useMutation } from "@apollo/react-hooks"
import { toInteger, isUndefined } from "lodash"
import { FORM_INIT } from "../../../globals"

const AddSong = () => {
  
  const init = FORM_INIT.ADD.SONG
  const [ form, setForm ] = useState(init)
  const [ addSong, { data } ] = useMutation(mutation)
  const { title, trackNumber, discNumber, mixName, featuring, remixers, artists, album } = form

  const onChange = handleFormChange(form, setForm)

  const onSubmit = event => {
    event.preventDefault()
    if (isAddSongFormValid(form)) handleFormSubmit(form, setForm, init, addSong)
  }

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

        {/* discNumber */}
        <label
          htmlFor="discNumber"
          className={bemAdd("formLabel", "songTrackNumber")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="disc"
            />
            <input
              onChange={onChange("discNumber", toInteger)}
              className={bemAdd("formInput")}
              value={discNumber}
              id="discNumber"
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

        {/* mixName */}
        <label
          htmlFor="mixName"
          className={bemAdd("formLabel", "songTitle")}
          children={<Fragment>
            <span
              className={bemAdd("formLabelText")}
              children="mix name"
            />
            <input
              onChange={onChange("mixName", encodeURI)}
              className={bemAdd("formInput")}
              value={decodeURI(mixName)}
              maxLength={256}
              minLength={1}
              id="mixName"
              type="text"
            />
          </Fragment>}
        />

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
