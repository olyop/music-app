import React, { Fragment } from "react"

import ListItem from "./ListItem"
import Validator from "./Validator"

import {
  string, oneOf, node, shape, oneOfType,
  bool, func, number, arrayOf, object, array
} from "prop-types"

import {
  determineValue,
  determineValidatorValue,
  determineInputType,
  determinePattern,
  determineMinMax
} from "../../../helpers/form"

import { FormField as bem } from "../../../globals/bem"

import "./index.scss"

const FormField = ({
  id, name, camelCase, type, required, placeholder,
  min, max, validators, transform, value, onChange
}) => (
  <div className={bem("")}>
    <label
      id={id}
      className={bem("label")}
      htmlFor={camelCase}
      children={<Fragment>
        <span
          children={required ? `* ${name}` : name}
          className={bem("name")}
        />
        {type === "list" ? (
          <div className={bem("list")}>
            {value.list.map(item => (
              <ListItem
                {...item}
                key={item.id}
              />
            ))}
          </div>
        ) : null}
        <input
          name={name}
          id={camelCase}
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          autoCapitalize="off"
          onChange={onChange}
          required={required}
          className={bem("input")}
          placeholder={placeholder}
          type={determineInputType(type)}
          pattern={determinePattern(type)}
          value={determineValue(type,value,transform)}
          {...determineMinMax(type,min,max)}
        />
      </Fragment>}
    />
    <div className={bem("validators")}>
      {validators.map(validator => (
        <Validator
          {...validator}
          key={validator.id}
          value={determineValidatorValue(type,value,transform)}
        />
      ))}
    </div>
  </div>
)

FormField.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  camelCase: string.isRequired,
  type: oneOf(["text","date","list","int"]).isRequired,
  init: oneOfType([array,string,number]).isRequired,
  required: bool.isRequired,
  validators: arrayOf(object).isRequired,
  value: oneOfType([node,object]).isRequired,
  onChange: func.isRequired,
  min: number.isRequired,
  max: number.isRequired,
  placeholder: string,
  transform: shape({
    in: func.isRequired,
    out: func.isRequired
  }).isRequired
}

FormField.defaultProps = {
  placeholder: ""
}

export default FormField
