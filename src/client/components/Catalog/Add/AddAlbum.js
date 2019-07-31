import React, { useState, Fragment } from "react"

import { Mutation } from "react-apollo"

import { Add as bemAdd, AddAlbum as bem } from "../../../globals/bem"
import { handleFormChange, handleFormSubmit } from "./helpers"
import mutation from "./mutations/addAlbum.graphql"
import { FORM_INIT } from "../../../globals"
import { isUndefined } from "lodash"

const AddAlbum = () => {
  const init = FORM_INIT.ADD.ALBUM
  const [ form, setForm ] = useState(init)
  const onChange = handleFormChange(setForm)
  const onSubmit = handleFormSubmit(form, setForm, init)
  const { title, year, artist } = form
  return (
    <Mutation mutation={mutation}>
      {(addAlbum, { data }) => (
        <form
          className={bem("", { ignore: true, className: bemAdd("form") })}
          onSubmit={onSubmit(addAlbum)}
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
                  onChange={onChange("title")}
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
                  onChange={onChange("year")}
                  value={year}
                  type="number"
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
                  onChange={onChange("artist")}
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
            <pre
              children={JSON.stringify(isUndefined(data) ? {} : data.addAlbum, undefined, 2)}
              className={bemAdd("pre")}
            />
          </Fragment>}
        />
      )}
    </Mutation>
  )
}

export default AddAlbum
