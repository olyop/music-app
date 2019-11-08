import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormFields from "./FormFields"
import FormSubmit from "./FormSubmit"

import {
  createFormInit,
  determineFieldVal,
  handleFieldChange,
  handleFieldDocRemove
} from "./helpers"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"
import { noop } from "lodash"

import "./Form.scss"

const bem = reactBEM("Form")

const Form = ({ title, submitText, fields }) => {
  const init = createFormInit(fields)
  const [ form, setForm ] = useState(init)
  const onFieldChange = handleFieldChange(form, setForm)
  const onFieldDocRemove = handleFieldDocRemove(form, setForm)
  return (
    <form onSubmit={noop} className={bem("")}>
      <FormTitle>{title}</FormTitle>
      <FormFields>
        {fields.map(
          field => (
            <FormField
              field={field}
              key={field.id}
              val={determineFieldVal(field, form)}
              onFieldChange={onFieldChange(field)}
              onFieldDocRemove={onFieldDocRemove(field)}
            />
          )
        )}
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
