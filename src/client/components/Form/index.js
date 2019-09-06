import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormSubmit from "./FormSubmit"

import { createFormInit, handleFormChange, handleItemRemove } from "../../helpers/form"
import { string, arrayOf, object } from "prop-types"
import { Form as bem } from "../../globals/bem"
import { noop } from "lodash"

import "./index.scss"

const Form = ({ title, fields }) => {
  const init = createFormInit(fields)
  const [ form, setForm ] = useState(init)
  return (
    <form
      onSubmit={noop}
      className={bem("")}
      children={<>
        <FormTitle>{title}</FormTitle>
        <div className={bem("fields")}>
          {fields.map(
            field => (
              <FormField
                field={field}
                key={field.id}
                val={form[field.short]}
                onChange={handleFormChange(form, setForm)(field)}
                onItemRemove={handleItemRemove(form, setForm)(field)}
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
