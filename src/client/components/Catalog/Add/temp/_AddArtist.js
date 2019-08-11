import React, { useState, Fragment } from "react"

import { Mutation } from "react-apollo"

import { Add as bemAdd, AddArtist as bem } from "../../../globals/bem"
import { handleFormChange, handleFormSubmit } from "./helpers"
import { isString, inRange, isUndefined } from "lodash"
import mutation from "./mutations/addArtist.graphql"
import { FORM_INIT } from "../../../globals"

const AddArtist = () => {
  
  const init = FORM_INIT.ADD.ARTIST
  const [ form, setForm ] = useState(init)
  const { name } = form

  const onChange = handleFormChange(form, setForm)

  const onSubmit = (...args) => event => {
    event.preventDefault()
    const isValid = isString(name) && inRange(name.length, 1, 256)
    if (isValid) handleFormSubmit(...args)
  }

  return (
    <Mutation mutation={mutation}>
      {(addArtist, { data }) => (
        <form
          className={bem({ ignore: true, className: bemAdd("form") }, "")}
          onSubmit={onSubmit(form, setForm, init, addArtist)}
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
                  onChange={onChange("name", encodeURI)}
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
            {isUndefined(data) ? null : <Fragment>
              <p
                children={`${data.addArtist.name} - ${data.addArtist.id}`}
                className={bemAdd("data")}
              />
            </Fragment>}
          </Fragment>}
        />
      )}
    </Mutation>
  )
}

export default AddArtist
