import React, { useState, Fragment } from "react"

import { Mutation } from "react-apollo"

import { isString, inRange, isSafeInteger, isUndefined } from "lodash"
import { Add as bemAdd, AddAlbum as bem } from "../../../globals/bem"
import { handleFormChange, handleFormSubmit } from "./helpers"
import mutation from "./mutations/addAlbum.graphql"
import { FORM_INIT } from "../../../globals"

const AddAlbum = () => {
  
  const init = FORM_INIT.ADD.ALBUM
  const [ form, setForm ] = useState(init)
  const { title, year, artist } = form

  const onChange = handleFormChange(form, setForm)

  const onSubmit = (...args) => event => {
    console.log(typeof args)
    event.preventDefault()
    const isValid = (
      isString(title) && inRange(title.length, 1, 256) &&
      isSafeInteger(year) && inRange(year, 1, 2019) &&
      isString(artist) && inRange(artist.length, 1, 256)
    )
    if (isValid) handleFormSubmit(...args)
  }
  
  return (
    <Mutation mutation={mutation}>
      {(addAlbum, { data }) => (
        <form
          className={bem({ ignore: true, className: bemAdd("form") }, "")}
          onSubmit={onSubmit(form, setForm, init, addAlbum)}
          children={<Fragment>
            <h2
              className={bemAdd("formTitle")}
              children="Album"
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
              htmlFor="year"
              className={bemAdd("formLabel")}
              children={<Fragment>
                <span
                  className={bemAdd("formLabelText")}
                  children="Year"
                />
                <input
                  className={bemAdd("formInput")}
                  onChange={onChange("year", val => val)}
                  type="number"
                  value={year}
                  id="year"
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
                  className={bemAdd("formInput")}
                  onChange={onChange("artist", encodeURI)}
                  value={artist}
                  id="artist"
                  type="text"
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
                children={`${data.addAlbum.title} - ${data.addAlbum.id}`}
                className={bemAdd("data")}
              />
            </Fragment>}
          </Fragment>}
        />
      )}
    </Mutation>
  )
}

export default AddAlbum
