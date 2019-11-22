import React, { Fragment, useState } from "react"

import FormTitle from "./FormTitle"
import FormField from "./FormField"
import FormFields from "./FormFields"
import FormSubmit from "./FormSubmit"

import {
  createFormInit,
  determineFieldVal,
  handleFieldChange,
  handleFieldHitClick,
  handleFieldDocRemove,
} from "./helpers"

import { noop } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "prop-types"

import "./Form.scss"

const bem = reactBem("Form")

const Form = ({ title, submitText, fields }) => {
  const init = createFormInit(fields)
  const [ form, setForm ] = useState(init)
  const onFieldChange = handleFieldChange(form, setForm)
  const onFieldHitClick = handleFieldHitClick(form, setForm)
  const onFieldDocRemove = handleFieldDocRemove(form, setForm)
  return (
    <form
      onSubmit={noop}
      className={bem("")}
      children={(
        <Fragment>
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
          <FormSubmit>{submitText}</FormSubmit>
        </Fragment>
      )}
    />
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
