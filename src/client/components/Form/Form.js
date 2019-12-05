import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormFields from "./FormFields"
import FormSubmit from "./FormSubmit"

import {
  createFormInit,
  handleFormInit,
  handleFormSubmit,
  determineFieldVal,
  handleFieldChange,
  handleFieldHitClick,
  handleFieldDocRemove,
} from "./helpers"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./Form.scss"

const bem = reactBem("Form")

const Form = ({ title, fields, submitText, submit }) => {
  const init = createFormInit(fields)
  const [ form, setForm ] = useState(init)
  const onFormInit = handleFormInit(setForm,init)
  const onFieldChange = handleFieldChange(form,setForm)
  const onFieldHitClick = handleFieldHitClick(form,setForm)
  const onFieldDocRemove = handleFieldDocRemove(form,setForm)
  const onFormSubmit = handleFormSubmit(fields,form,onFormInit,submit)
  return (
    <form className={bem("")} onSubmit={onFormSubmit}>
      <FormTitle>{title}</FormTitle>
      <FormFields>
        {fields.map(
          (field, index) => (
            <FormField
              index={index}
              field={field}
              key={field.id}
              val={determineFieldVal(field,form)}
              onFieldChange={onFieldChange(field)}
              onFieldHitClick={onFieldHitClick(field)}
              onFieldDocRemove={onFieldDocRemove(field)}
            />
          )
        )}
      </FormFields>
      <FormSubmit
        form={form}
        fields={fields}
        text={submitText}
      />
    </form>
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
