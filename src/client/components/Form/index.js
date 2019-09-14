import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormSubmit from "./FormSubmit"

import {
  createFormInit,
  determineFieldVal,
  handleFormChange,
  handleItemRemove,
  validateForm
} from "./helpers"

import { string, arrayOf, object } from "prop-types"
import { Form as bem } from "../../globals/bem"
import { noop } from "lodash"

import "./index.scss"

const Form = ({ title, submitText, fields }) => {
  const init = createFormInit(fields)
  const [ form, setForm ] = useState(init)
  const onChange = handleFormChange(form, setForm)
  const onItemRemove = handleItemRemove(form, setForm)
  const isFormValid = validateForm(form, fields)
  return (
    <form onSubmit={noop} className={bem("")}>
      <FormTitle>{title}</FormTitle>
      <div className={bem("fields")}>
        {fields.map(
          field => (
            <FormField
              field={field}
              key={field.id}
              onChange={onChange(field)}
              onItemRemove={onItemRemove(field)}
              val={determineFieldVal(field, form)}
            />
          )
        )}
      </div>
      {isFormValid ? <FormSubmit>{submitText}</FormSubmit> : null}
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
