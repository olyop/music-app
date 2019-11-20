import React, { Fragment } from "react"

import FormValidator from "../FormValidator"
import FormFieldDoc from "./FormFieldDoc"
import Icon from "../../Icon"
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
  determineDisabled,
  determineInputType,
  determineMinLength,
  determineMaxLength,
  determineValidatorVal
} from "../helpers"

import { isEmpty, includes, lowerCase } from "lodash"
import { catalogUrl } from "../../../helpers/misc"
import reactBem from "@oly_op/react-bem"

import "./FormField.scss"

const bem = reactBem("FormField")

const FormField = ({ field, val, onFieldChange, onFieldDocRemove }) => {
  const { id, name, type, isDoc, db, validators, parse } = field
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
              className={bem("label-name")}
            />
            {type === "list" && !isEmpty(val.val) ? (
              <div className={bem("label-list")}>
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
            {isDoc && type !== "list" && !isEmpty(val.val) ? (
              <div className={bem("label-doc")}>
                <Img
                  url={catalogUrl(val.val)}
                  className={bem("label-doc-cover")}
                />
                <div
                  className={bem("label-doc-text")}
                  children={determineFieldDoc(val.val, db).title}
                />
                <Icon
                  icon="close"
                  className={bem("label-doc-close")}
                  onClick={onFieldDocRemove(val.val)}
                />
              </div>
            ) : null}
            <input
              id={id}
              name={name}
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              autoCapitalize="off"
              onChange={onFieldChange}
              min={determineMin(field)}
              max={determineMax(field)}
              className={bem("label-input")}
              type={determineInputType(field)}
              pattern={determinePattern(field)}
              required={determineRequired(field)}
              value={determineInputVal(field,val)}
              minLength={determineMinLength(field)}
              maxLength={determineMaxLength(field)}
              disabled={determineDisabled(field,val)}
            />
            {type === "list" && !isEmpty(val.input) ? (
              <div className={bem("label-dropdown")}>
                {db.filter(x => includes(lowerCase(x.name), lowerCase(parse.out(val.input)))).map(
                  hit => (
                    <div
                      key={hit.id}
                      children={hit.name}
                      className={bem("label-dropdown-item")}
                    />
                  )
                )}
              </div>
            ) : null}
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
