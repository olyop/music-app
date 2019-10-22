import React from "react"

import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Query from "react-apollo"
import Empty from "../../Empty"
import Form from "../../Form"

import {
  isStringLengthInRange,
  deserializeDate,
  validateArray,
  isHex,
  isStringLength
} from "./helpers"

import {
  uniqueId,
  isString
} from "lodash"

import { Add as bemAdd, AddSong as bem } from "../../../globals/bem"
import { inRange as curryInRange } from "lodash/fp"
import query from "./queries/addAlbum.graphql"

const fieldsConifg = artists => [
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
    type: "text",
    doc: false,
    init: "",
    req: true,
    min: 0,
    max: 127,
    parse: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        check: isString,
        msg: "data type of string."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        msg: "between 1 and 256 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Released",
    short: "released",
    type: "date",
    doc: false,
    init: Date.now(),
    req: true,
    min: 0,
    max: Date.now(),
    parse: {
      in: Date.parse,
      out: deserializeDate
    },
    validators: [
      {
        id: uniqueId(),
        check: curryInRange(0, Date.now()),
        msg: "valid date."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Artists",
    short: "artists",
    type: "list",
    doc: true,
    db: artists,
    init: [],
    req: true,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArray(isString),
        msg: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        msg: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        msg: "all be of length 24."
      }
    ]
  }
]

const AddAlbum = () => (
  <div className={bem({ ignore: true, className: bemAdd("content") }, "")}>
    <Query query={query}>
      {({ loading, error, data }) => {  
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        if (isEmpty(data.artists)) return <Empty/>
        const artistsOrdered = orderBy(data.artists, "name", "asc")
        return (
          <Form
            title="Add Album"
            fields={fieldsConifg(artistsOrdered)}
          />
        )
      }}
    </Query>
  </div>
)

export default AddAlbum
