import React, { useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormFields from "./FormFields"
import FormSubmit from "./FormSubmit"
import FormRemember from "./FormRemember"

import {
  createFormInit,
  handleFormSubmit,
  determineFieldVal,
  handleFieldChange,
  determineFormValid,
  handleFieldHitClick,
  handleFieldDocRemove,
  handleToggleRemember,
} from "./helpers"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./Form.scss"

const bem = reactBem("Form")

const Form = ({ title, fields, rememberText, submitText, submit }) => {
  const init = createFormInit(fields)

  const [ form, setForm ] = useState(init)
  const [ remember, setRemember ] = useState(false)

  const onFieldChange = handleFieldChange(form,setForm)
  const onFieldHitClick = handleFieldHitClick(form,setForm)
  const onFieldDocRemove = handleFieldDocRemove(form,setForm)
  const onToggleRemember = handleToggleRemember(remember,setRemember)
  const onFormSubmit = handleFormSubmit(fields,init,form,setForm,remember,submit)
  
  const isFormValid = determineFormValid(fields,form)
  
  return (
    <form className={bem("")} onSubmit={onFormSubmit}>

      <FormTitle>
        {title}
      </FormTitle>

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

      {title === "Add Song" ? (
        <FormRemember
          text={rememberText}
          remember={remember}
          onToggleRemember={onToggleRemember}
        />
      ) : null}

      <FormSubmit
        text={submitText}
        isFormValid={isFormValid}
      />

    </form>
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
