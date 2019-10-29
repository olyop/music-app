import React from "react"

import FormValidator from "../FormValidator"
import FormDoc from "../FormDoc"

import {
  string, oneOf, node, shape, oneOfType,
  bool, func, number, arrayOf, object, array
} from "prop-types"

import {
  determineMin,
  determineMax,
  determinePattern,
  determineInputVal,
  determineRequired,
  determineInputType,
  determineMinLength,
  determineMaxLength,
  determineValidatorVal
} from "../helpers"

import reactBEM from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./FormField.scss"

const bem = reactBEM("FormField")

const FormField = ({ field, val, onChange, onDocRemove }) => {
  const { id, name, type, isDoc, validators } = field
  return (
    <div id={id} className={bem("")}>
      <label
        className={bem("label")}
        htmlFor={id}
        children={<>
          <span
            children={name}
            aria-label={id}
            className={bem("name")}
          />
          {type === "list" && !isEmpty(val) ? (
            <div className={bem("list")}>
              {val.val.map(
                doc => (
                  <FormDoc
                    doc={doc}
                    key={doc}
                    onDocRemove={onDocRemove(doc)}
                  />
                )
              )}
            </div>
          ) : null}
          {isDoc && type !== "list" ? (
            <img
              alt="foo"
              id={val.id}
              src="/test.jpg"
              className={bem("img")}
            />
          ) : null}
          <input
            id={id}
            name={name}
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
            onChange={onChange}
            autoCapitalize="off"
            className={bem("input")}
            min={determineMin(field)}
            max={determineMax(field)}
            type={determineInputType(field)}
            pattern={determinePattern(field)}
            required={determineRequired(field)}
            minLength={determineMinLength(field)}
            maxLength={determineMaxLength(field)}
            value={determineInputVal(field, val)}
          />
          {/* {name === "Featuring" ? (
            <div className={bem("dropdown")}>
              <div className={bem("dropdownItem")}>Foo</div>
            </div>
          ) : null} */}
        </>}
      />
      <div className={bem("validators")}>
        {validators.map(
          validator => (
            <FormValidator
              key={validator.id}
              validator={validator}
              val={determineValidatorVal(field, val)}
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
    isDoc: bool.isRequired,
    init: oneOfType([ array, string, number, object ]).isRequired,
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
  onDocRemove: func.isRequired,
  val: oneOfType([ node, object ]).isRequired
}

export default FormField
