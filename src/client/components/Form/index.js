import React, { useState, Fragment } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"

import { createFormInit, handleFormChange } from "./helpers"
import { string, arrayOf, object } from "prop-types"
import { Form as bem } from "../../globals/bem"
import { noop } from "lodash"

import "./index.scss"

const Form = ({ title, fields }) => {
  const init = createFormInit(fields)
  const [form,setForm] = useState(init)
  const onChange = handleFormChange(form, setForm)
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
              onChange={onChange(field.camelCase, field.transform)}
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
