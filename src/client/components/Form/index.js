import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormSubmit from "./FormSubmit"

import { createFormInit, handleFormChange } from "../../helpers/form"
import { string, arrayOf, object } from "prop-types"
import { Form as bem } from "../../globals/bem"
import { noop } from "lodash"

import "./index.scss"

const Form = ({ title, fields }) => {
  const init = createFormInit(fields)
  const [ form, setForm ] = useState(init)
  const onChange = handleFormChange(form, setForm)
  return (
    <form
      onSubmit={noop}
      className={bem("")}
      children={<>
        <FormTitle>{title}</FormTitle>
        <div className={bem("fields")}>
          {fields.map(
            (field, i) => (
              <FormField
                tabIndex={i}
                field={field}
                key={field.id}
                val={form[field.short]}
                onChange={onChange(field.type,field.camelCase,field.parse.in)}
              />
            )
          )}
        </div>
        <FormSubmit/>
      </>}
    />
  )
}

Form.propTypes = {
  title: string.isRequired,
  fields: arrayOf(object).isRequired
}

export default Form
