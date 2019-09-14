import React from "react"

import ListItem from "./ListItem"
import Validator from "./Validator"

import {
  string, oneOf, node, shape, oneOfType,
  bool, func, number, arrayOf, object, array
} from "prop-types"

import {
  determineMin,
  determineMax,
  determinePattern,
  determineRequired,
  determineInputType,
  determineMinLength,
  determineMaxLength,
  determineInputVal,
  determineValidatorVal,
} from "../helpers"

import { FormField as bem } from "../../../globals/bem"
import { isEmpty } from "lodash"

import "./index.scss"

const FormField = ({ field, val, onChange, onItemRemove }) => {
  const { id, name, type, doc, validators } = field
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
          {type === "list" && !isEmpty(val.list) ? (
            <div className={bem("list")}>
              {val.list.map(
                item => (
                  <ListItem
                    item={item}
                    key={item.id}
                    onItemRemove={onItemRemove(item)}
                  />
                )
              )}
            </div>
          ) : null}
          {doc && type !== "list" ? (
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
            value={determineInputVal(field,val)}
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
            <Validator
              key={validator.id}
              validator={validator}
              val={determineValidatorVal(field,val)}
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
    doc: bool.isRequired,
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
  onItemRemove: func.isRequired,
  val: oneOfType([ node, object ]).isRequired
}

export default FormField
