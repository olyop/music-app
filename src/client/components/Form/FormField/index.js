import React, { Fragment } from "react"

import { string, oneOf, node, bool, number, arrayOf, object } from "prop-types"
import { FormField as bem } from "../../../globals/bem"
import { determineInputType } from "../helpers"
import { noop } from "lodash"

import "./index.scss"

const FormField = ({
  name, camelCase, type, init, required,
  min, max, minLength, maxLength, validators
}) => (
  <label
    className={bem("")}
    htmlFor={camelCase}
    children={<Fragment>
      <h3
        children={name}
        className={bem("name")}
      />
      <input
        min={min}
        max={max}
        value={init}
        id={camelCase}
        onChange={noop}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className={bem("input")}
        type={determineInputType(type)}
      />
      <div className={bem("validators")}>
        {validators.map(({ id, message }) => (
          <p
            key={id}
            children={message}
            className={bem("validator")}
          />
        ))}
      </div>
    </Fragment>}
  />
)

FormField.propTypes = {
  name: string.isRequired,
  camelCase: string.isRequired,
  type: oneOf(["text", "date", "list", "int"]).isRequired,
  init: node.isRequired,
  required: bool.isRequired,
  validators: arrayOf(object).isRequired,
  min: number,
  max: number,
  minLength: number,
  maxLength: number
}

FormField.defaultProps = {
  min: -Infinity,
  max: Infinity,
  minLength: 0,
  maxLength: Infinity
}

export default FormField


