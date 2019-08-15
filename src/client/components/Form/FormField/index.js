import React, { Fragment } from "react"

import Validator from "./Validator"

import { string, oneOf, node, shape, bool, func, number, arrayOf, object } from "prop-types"
import { determineInputType, determineBoundaries } from "../../../helpers/form"
import { FormField as bem } from "../../../globals/bem"

import "./index.scss"

const FormField = ({
  id, name, camelCase, type, required, placeholder,
  min, max, minLength, maxLength, validators, transform,
  value, onChange
}) => (
  <div className={bem("")}>
    <label
      id={id}
      className={bem("label")}
      htmlFor={camelCase}
      children={<Fragment>
        <span
          children={name}
          className={bem("name")}
        />
        <input
          id={camelCase}
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          autoCapitalize="off"
          onChange={onChange}
          required={required}
          className={bem("input")}
          placeholder={placeholder}
          value={transform.out(value)}
          type={determineInputType(type)}
          {...determineBoundaries(type,min,max,minLength,maxLength)}
        />
      </Fragment>}
    />
    <div className={bem("validators")}>
      {validators.map(validator => (
        <Validator
          value={value}
          {...validator}
          key={validator.id}
        />
      ))}
    </div>
  </div>
)

FormField.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  camelCase: string.isRequired,
  type: oneOf(["text", "date", "list", "int"]).isRequired,
  init: node.isRequired,
  required: bool.isRequired,
  transform: shape({
    in: func.isRequired,
    out: func.isRequired
  }).isRequired,
  validators: arrayOf(object).isRequired,
  value: node.isRequired,
  onChange: func.isRequired,
  min: number,
  max: number,
  minLength: number,
  maxLength: number,
  placeholder: string
}

FormField.defaultProps = {
  min: -Infinity,
  max: Infinity,
  minLength: 0,
  maxLength: Infinity,
  placeholder: ""
}

export default FormField
