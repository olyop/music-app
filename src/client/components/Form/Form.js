import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormFields from "./FormFields"
import FormSubmit from "./FormSubmit"

import {
  createFormInit, determineFieldVal,
  handleFormChange, handleItemRemove
} from "./helpers"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"
import { noop } from "lodash"

import "./Form.scss"

const bem = reactBEM("Form")

const Form = ({ title, submitText, fields }) => {
  const init = createFormInit(fields)
  const [ form, setForm ] = useState(init)
  const onChange = handleFormChange(form, setForm)
  const onItemRemove = handleItemRemove(form, setForm)
  const fieldsMap = fields.map(
    field => (
      <FormField
        field={field}
        key={field.id}
        onChange={onChange(field)}
        onItemRemove={onItemRemove(field)}
        val={determineFieldVal(field, form)}
      />
    )
  )
  return (
    <form onSubmit={noop} className={bem("")}>
      <FormTitle>{title}</FormTitle>
      <FormFields>{fieldsMap}</FormFields>
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
