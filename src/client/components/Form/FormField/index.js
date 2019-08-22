import React from "react"

import ListItem from "./ListItem"
import Validator from "./Validator"

import {
  string, oneOf, node, shape, oneOfType,
  bool, func, number, arrayOf, object, array
} from "prop-types"

import {
  determineInputValue,
  determineValidatorValue,
  determineInputType,
  determinePattern,
  determineMin,
  determineMax,
  determineMinLength,
  determineMaxLength
} from "../../../helpers/form"

import { FormField as bem } from "../../../globals/bem"

import "./index.scss"

const FormField = ({ field, tabIndex, val, onChange }) => {
  const { id, name, req, validators } = field
  return (
    <div className={bem("")}>
      <label
        className={bem("label")}
        htmlFor={id}
        children={<>
          <span
            children={name}
            aria-label={id}
            className={bem("name")}
          />
          {field.type === "list" ? (
            <div className={bem("list")}>
              {val.list.map(
                item => (
                  <ListItem
                    key={id}
                    item={item}
                  />
                )
              )}
            </div>
          ) : null}
          <input
            id={id}
            name={name}
            required={req}
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
            tabIndex={tabIndex}
            onChange={onChange}
            autoCapitalize="off"
            className={bem("input")}
            min={determineMin(field)}
            max={determineMax(field)}
            type={determineInputType(field)}
            pattern={determinePattern(field)}
            val={determineInputValue(field,val)}
            minLength={determineMinLength(field)}
            maxLength={determineMaxLength(field)}
          />
        </>}
      />
      <div className={bem("validators")}>
        {validators.map(
          validator => (
            <Validator
              key={id}
              validator={validator}
              val={determineValidatorValue(field,val)}
            />
          )
        )}
      </div>
    </div>
  )
}

FormField.propTypes = {
  field: shape({
    id: string.isRequired,
    name: string.isRequired,
    short: string.isRequired,
    type: oneOf([ "text", "date", "list", "int" ]).isRequired,
    init: oneOfType([ array, string, number ]).isRequired,
    req: bool.isRequired,
    validators: arrayOf(object).isRequired,
    min: number.isRequired,
    max: number.isRequired,
    parse: shape({
      in: func.isRequired,
      out: func.isRequired
    }).isRequired,
  }).isRequired,
  onChange: func.isRequired,
  val: oneOfType([ node, object ]).isRequired,
  tabIndex: number.isRequired
}

export default FormField
