import React, { Fragment } from "react"

import FormValidator from "../FormValidator"
import FormFieldDoc from "./FormFieldDoc"
import Img from "../../Img"

import {
  string, oneOf, shape, oneOfType, bool,
  func, number, arrayOf, object, array
} from "prop-types"

import {
  determineMin,
  determineMax,
  determinePattern,
  determineFieldDoc,
  determineInputVal,
  determineRequired,
  determineInputType,
  determineMinLength,
  determineMaxLength,
  determineValidatorVal
} from "../helpers"

import { catalogLink } from "../../../helpers/misc"
import reactBem from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./FormField.scss"

const bem = reactBem("FormField")

const FormField = ({ field, val, onFieldChange, onFieldDocRemove }) => {
  const { id, name, type, parse, isDoc, db, validators } = field
  return (
    <div className={bem("")}>
      <label
        className={bem("label")}
        htmlFor={id}
        children={(
          <Fragment>
            <span
              children={name}
              aria-label={id}
              className={bem("name")}
            />
            {type === "list" && !isEmpty(val) ? (
              <div className={bem("list")}>
                {val.val.map(docId => {
                  const doc = determineFieldDoc(docId, db)
                  return (
                    <FormFieldDoc
                      key={doc.id}
                      name={doc.name}
                      onFieldDocRemove={onFieldDocRemove(doc)}
                      photoUrl={doc.__typename === "Genre" ? "" : `/images/catalog/${doc.id}.jpg`}
                    />
                  )
                })}
              </div>
            ) : null}
            {isDoc && type !== "list" ? (
              <Img
                className={bem("cover")}
                url={catalogLink(val.val)}
              />
            ) : null}
            <input
              id={id}
              name={name}
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              autoCapitalize="off"
              className={bem("input")}
              onChange={onFieldChange}
              min={determineMin(field)}
              max={determineMax(field)}
              type={determineInputType(field)}
              pattern={determinePattern(field)}
              required={determineRequired(field)}
              minLength={determineMinLength(field)}
              maxLength={determineMaxLength(field)}
              value={parse.out(determineInputVal(field, val))}
            />
            {/* {name === "Featuring" ? (
              <div className={bem("dropdown")}>
                <div className={bem("dropdownItem")}>Foo</div>
              </div>
            ) : null} */}
          </Fragment>
        )}
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
  onFieldChange: func.isRequired,
  onFieldDocRemove: func.isRequired,
  val: oneOfType([ string, number, object ]).isRequired,
  field: shape({
    id: string.isRequired,
    name: string.isRequired,
    short: string.isRequired,
    type: oneOf([ "text", "date", "list", "int" ]).isRequired,
    isDoc: bool.isRequired,
    db: arrayOf(object),
    init: oneOfType([ array, string, number, object ]).isRequired,
    req: bool.isRequired,
    validators: arrayOf(object).isRequired,
    min: number.isRequired,
    max: number.isRequired,
    parse: shape({ in: func.isRequired, out: func.isRequired }).isRequired,
  }).isRequired
}

export default FormField
