import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormFields from "./FormFields"
import FormSubmit from "./FormSubmit"

import { createFormInit, determineFieldVal, handleFormChange, handleItemRemove } from "./helpers"

import { string, arrayOf, object } from "prop-types"
import { Form as bem } from "../../globals/bem"
import { noop } from "lodash"

import "./index.scss"

const Form = ({ title, submitText, fields }) => {
  const init = createFormInit(fields)
  console.log(JSON.stringify(init, undefined, 2))
  const [ form, setForm ] = useState(init)
  const onChange = handleFormChange(form, setForm)
  const onItemRemove = handleItemRemove(form, setForm)
  return (
    <form onSubmit={noop} className={bem("")}>
      <FormTitle>{title}</FormTitle>
      <FormFields>
        {fields.map(field => (
          <FormField
            field={field}
            key={field.id}
            onChange={onChange(field)}
            onItemRemove={onItemRemove(field)}
            val={determineFieldVal(field, form)}
          />
        ))}
      </FormFields>
      <FormSubmit>{submitText}</FormSubmit>
    </form>
  )
}

Form.propTypes = {
  title: string,
  submitText: string,
  fields: arrayOf(object).isRequired
}

Form.defaultProps = {
  title: "Form",
  submitText: "Submit"
}

export default Form
