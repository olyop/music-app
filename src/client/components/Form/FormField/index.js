import React, { Fragment } from "react"

import Icon from "../../Icon"

import { string, oneOf, node, bool, number, arrayOf, object } from "prop-types"
import { determineInputType, determineBoundaries } from "../helpers"
import { FormField as bem } from "../../../globals/bem"
import { noop } from "lodash"

import "./index.scss"

const FormField = ({
  name, camelCase, type, init, required, placeholder,
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
      <div className={bem("main")}>
        <input
          value={init}
          id={camelCase}
          onChange={noop}
          required={required}
          className={bem("input")}
          placeholder={placeholder}
          type={determineInputType(type)}
          {...determineBoundaries(type,min,max,minLength,maxLength)}
        />
        <div className={bem("validators")}>
          {validators.map(({ id, validator, message }) => (
            <div key={id} className={bem("validator")}>
              <Icon
                bem={bem}
                className="validatorIcon"
                icon={validator(init) ? "done" : "close"}
              />
              <p
                children={message}
                className={bem("validatorText")}
              />
            </div>
          ))}
        </div>
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
