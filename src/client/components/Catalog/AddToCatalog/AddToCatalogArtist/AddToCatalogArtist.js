import React, { Component } from "react"

import {
  AddToCatalog as bemAddToCatalog,
  AddToCatalogArtist as bem
} from "../../../../globals/bem"

import { noop } from "lodash"

import "./AddToCatalogArtist.scss"

class AddToCatalogArtist extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <form
        className={bem(
          "", { ignore: true, className: bemAddToCatalog("form") }
        )}
        onSubmit={noop}
      >
        <h2 className={bemAddToCatalog("formTitle")}>Artist</h2>
        <label
          htmlFor="title"
          className={bemAddToCatalog("formLabel")}
        >
          <span
            className={bemAddToCatalog("formLabelText")}
            children="Title"
          />
          <input
            className={bemAddToCatalog("formInput")}
            value=""
            onChange={noop}
            type="text"
            id="title"
          />
        </label>
        <label
          htmlFor="cover"
          className={bemAddToCatalog("formLabel")}
        >
          <span
            className={bemAddToCatalog("formLabelText")}
            children="Cover"
          />
          <input
            className={bemAddToCatalog("formInput", "formInputFile")}
            accept="image/jpg"
            onChange={noop}
            type="file"
            id="title"
          />
        </label>
      </form>
    )
  }
}

export default AddToCatalogArtist
