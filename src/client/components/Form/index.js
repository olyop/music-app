import React, { useState, Fragment } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"

import { string, arrayOf, object } from "prop-types"
import { Form as bem } from "../../globals/bem"
import { createFormInit } from "./helpers"
import { noop } from "lodash"

import "./index.scss"

const Form = ({ title, fields }) => {
  const init = createFormInit(fields)
  const [form,setForm] = useState(init)
  console.log(form, setForm)
  return (
    <form
      onSubmit={noop}
      className={bem("")}
      children={<Fragment>
        <FormTitle>{title}</FormTitle>
        <div className={bem("fields")}>
          {fields.map(field => (
            <FormField
              {...field}
              key={field.id}
            />
          ))}
        </div>
      </Fragment>}
    />
  )
}

Form.propTypes = {
  title: string.isRequired,
  fields: arrayOf(object).isRequired
}

export default Form

