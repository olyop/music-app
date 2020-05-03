/* eslint-disable max-len */
import {
  isNotEmpty,
  validateId,
  validateArrayOfIds,
  isStringLengthInRange,
} from "../helpers"

import {
  uniqueId,
  isString,
  identity,
  isUndefined,
  toSafeInteger,
  isSafeInteger,
} from "lodash"

import {
  inRange as curryInRange,
} from "lodash/fp"

const fieldsConifg = ({ artists, albums, genres }) => [
  {
    id: uniqueId(),
    name: "Audio",
    short: "audio",
    type: "file",
    isDoc: false,
    init: "",
    req: true,
    min: 1,
    max: 52428800,
    parse: {
      in: identity,
      out: identity,
    },
    validators: [
      {
        id: uniqueId(),
        msg: "valid and of file type of mp3.",
        check: ({ file }) => (
          isUndefined(file) ?
            false :
            file.type === "audio/mpeg" && file instanceof File
        ),
      },
      {
        id: uniqueId(),
        msg: "size no more than 50 MB",
        check: val => (isUndefined(val.file) ? false : val.file.size < 52428800),
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
    type: "text",
    isDoc: false,
    init: "",
    req: true,
    min: 1,
    max: 2048,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: isNotEmpty,
        msg: "not empty.",
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 2048),
        msg: "between 1 and 2048 characters.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Mix",
    short: "mix",
    type: "text",
    isDoc: false,
    init: "",
    req: false,
    min: 0,
    max: 64,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: isString,
        msg: "data type of string.",
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 64),
        msg: "between 1 and 64 characters.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Disc Number",
    short: "discNumber",
    type: "int",
    isDoc: false,
    init: 1,
    req: true,
    min: 1,
    max: 32,
    parse: {
      in: toSafeInteger,
      out: toSafeInteger,
    },
    validators: [
      {
        id: uniqueId(),
        check: isSafeInteger,
        msg: "a valid integer.",
      },
      {
        id: uniqueId(),
        check: curryInRange(1, 33),
        msg: "between 1 and 32.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Track Number",
    short: "trackNumber",
    type: "int",
    isDoc: false,
    init: 1,
    req: true,
    min: 1,
    max: 32,
    parse: {
      in: toSafeInteger,
      out: toSafeInteger,
    },
    validators: [
      {
        id: uniqueId(),
        check: isSafeInteger,
        msg: "a valid integer.",
      },
      {
        id: uniqueId(),
        check: curryInRange(1, 33),
        msg: "between 1 and 32.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Featuring",
    short: "featuringIds",
    type: "list",
    isDoc: true,
    db: artists,
    init: [],
    req: false,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "must be valid artists.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Remixers",
    short: "remixerIds",
    type: "list",
    isDoc: true,
    db: artists,
    init: [],
    req: false,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "must be valid artists.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Artists",
    short: "artistIds",
    type: "list",
    isDoc: true,
    db: artists,
    init: [],
    req: true,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "must be valid artists.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Genres",
    short: "genreIds",
    type: "list",
    isDoc: true,
    db: genres,
    init: [],
    req: true,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: validateArrayOfIds,
        msg: "must be valid genres.",
      },
    ],
  },
  {
    id: uniqueId(),
    name: "Album",
    short: "albumId",
    type: "text",
    isDoc: true,
    db: albums,
    init: "",
    req: true,
    min: 0,
    max: 24,
    parse: {
      in: encodeURI,
      out: decodeURI,
    },
    validators: [
      {
        id: uniqueId(),
        check: validateId,
        msg: "must be a valid album.",
      },
    ],
  },
]

export default fieldsConifg
