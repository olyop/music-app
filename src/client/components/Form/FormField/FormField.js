import React, { Fragment } from "react"

import Img from "../../Img"
import Icon from "../../Icon"
import FormFieldDoc from "../FormFieldDoc"
import FormValidator from "../FormValidator"

import { propTypes } from "prop-types"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../../helpers/misc"
import { isEmpty, includes, lowerCase } from "lodash"

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
  determineValidatorVal,
  determineValidatorVisibility,
} from "../helpers"

import "./FormField.scss"

const bem = reactBem("FormField")

const FormField = ({
  field, val, index, onFieldChange, onFieldHitClick, onFieldDocRemove,
}) => {
  const { id, name, type, isDoc, db, validators, parse } = field
  return (
    <div className={bem("")}>
      <label
        htmlFor={id}
        className={bem("label")}
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
              tabIndex={index + 1}
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
            {isDoc && !isEmpty(val.input) ? (
              <div className={bem("label-dropdown")}>
                {db.filter(
                  x => includes(
                    lowerCase(name === "Album" ? x.title : x.name),
                    lowerCase(parse.out(val.input))
                  )
                ).map(
                  (hit, idx) => (
                    <button
                      key={hit.id}
                      type="button"
                      tabIndex={index + idx + 2}
                      onClick={onFieldHitClick(hit)}
                      className={bem("label-dropdown-item")}
                      children={(
                        <Fragment>
                          {hit.__typename === "Genre" ? null : (
                            <Img
                              url={catalogUrl(hit.id)}
                              className={bem("label-dropdown-item-img")}
                            />
                          )}
                          <span>{name === "Album" ? hit.title : hit.name}</span>
                        </Fragment>
                      )}
                    />
                  )
                )}
              </div>
            ) : null}
          </Fragment>
        )}
      />
      {determineValidatorVisibility(field, val) ? null : (
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
      )}
    </div>
  )
}

FormField.propTypes = propTypes

export default FormField
