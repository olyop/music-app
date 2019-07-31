import React, { useState, Fragment } from "react"

import { Mutation } from "react-apollo"

import { Add as bemAdd, AddArtist as bem } from "../../../globals/bem"
import { handleFormChange, handleFormSubmit } from "./helpers"
import mutation from "./mutations/addArtist.graphql"
import { FORM_INIT } from "../../../globals"
import { isUndefined } from "lodash"

const AddArtist = () => {
  const init = FORM_INIT.ADD.ARTIST
  const [ form, setForm ] = useState(init)
  const onChange = handleFormChange(setForm)
  const onSubmit = handleFormSubmit(form, setForm, init)
  const { name } = form
  return (
    <Mutation mutation={mutation}>
      {(addArtist, { data }) => (
        <form
          className={bem("", { ignore: true, className: bemAdd("form") })}
          onSubmit={onSubmit(addArtist)}
          children={<Fragment>
            <h2
              className={bemAdd("formTitle")}
              children="Artist"
            />
            <label
              htmlFor="name"
              className={bemAdd("formLabel")}
              children={<Fragment>
                <span
                  className={bemAdd("formLabelText")}
                  children="Name"
                />
                <input
                  onChange={onChange("name")}
                  className={bemAdd("formInput")}
                  value={name}
                  type="text"
                  id="name"
                />
              </Fragment>}
            />
            <input
              className={bemAdd("submit")}
              type="submit"
              text="Submit"
            />
            <pre
              children={JSON.stringify(isUndefined(data) ? {} : data.addArtist, undefined, 2)}
              className={bemAdd("pre")}
            />
          </Fragment>}
        />
      )}
    </Mutation>
  )
}

export default AddArtist
