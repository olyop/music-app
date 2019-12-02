import React, { Fragment } from "react"

import FormInput from "../FormInput"
import FormFieldDoc from "../FormFieldDoc"
import FormValidator from "../FormValidator"
import FormFieldListDoc from "../FormFieldListDoc"
import FormDropDownItem from "../FormDropDownItem"

import { isEmpty } from "lodash"
import { propTypes } from "prop-types"
import reactBem from "@oly_op/react-bem"
import findMatches from "../../../helpers/findMatches"

import {
  determineFieldDoc,
  determineValidatorVal,
  determineValidatorVisibility,
} from "../helpers"

import "./FormField.scss"

const bem = reactBem("FormField")

const FormField = ({ field, val, index, onFieldChange, onFieldHitClick, onFieldDocRemove }) => {
  const { id, name, type, isDoc, db, parse, validators } = field
  const isList = type === "list"
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
            {isList && !isEmpty(val.val) ? (
              <div className={bem("label-list")}>
                {val.val.map(
                  docId => (
                    <FormFieldListDoc
                      key={docId}
                      onFieldDocRemove={onFieldDocRemove}
                      doc={determineFieldDoc(docId,field)}
                    />
                  )
                )}
              </div>
            ) : null}
            {isDoc && !isList && !isEmpty(val.val) ? (
              <FormFieldDoc
                doc={determineFieldDoc(val.val,field)}
                onFieldDocRemove={onFieldDocRemove(val.val)}
              />
            ) : null}
            <FormInput
              val={val}
              index={index}
              field={field}
              onFieldChange={onFieldChange}
            />
            {isDoc && !isEmpty(val.input) ? (
              <div className={bem("label-dropdown")}>
                {findMatches(db, parse.out(val.input)).map(
                  (doc, idx) => (
                    <FormDropDownItem
                      doc={doc}
                      key={doc.id}
                      tabIndex={index + idx + 2}
                      onFieldHitClick={onFieldHitClick}
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
