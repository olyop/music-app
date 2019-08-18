import React, { useState, Fragment } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"

import { createFormInit, handleFormChange } from "../../helpers/form"
import { string, arrayOf, oneOfType, array, object } from "prop-types"
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
              value={form[field.camelCase]}
              onChange={onChange(field.type, field.camelCase, field.transform.in)}
            />
          ))}
        </div>
      </Fragment>}
    />
  )
}

Form.propTypes = {
  title: string.isRequired,
  fields: arrayOf(oneOfType([object, array])).isRequired
}

export default Form
