import {
  isNotEmpty,
  isStringLengthInRange,
  isHex,
  isStringLength,
  validateArray
} from "../helpers"

import {
  isSafeInteger,
  uniqueId,
  isString,
  toInteger
} from "lodash"

import {
  inRange as curryInRange
} from "lodash/fp"

const fieldsConifg = ({ artists, albums, genres }) => [
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
    type: "text",
    doc: false,
    init: "Ocean",
    req: true,
    min: 1,
    max: 128,
    parse: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        check: isNotEmpty,
        msg: "not empty."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        msg: "between 1 and 128 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Mix",
    short: "mix",
    type: "text",
    doc: false,
    init: "Extended",
    req: true,
    min: 0,
    max: 64,
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
        check: isStringLengthInRange(1, 64),
        msg: "between 1 and 64 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Track Number",
    short: "trackNumber",
    type: "int",
    doc: false,
    init: 1,
    req: true,
    min: 1,
    max: 32,
    parse: {
      in: toInteger,
      out: toInteger
    },
    validators: [
      {
        id: uniqueId(),
        check: isSafeInteger,
        msg: "a valid integer."
      },
      {
        id: uniqueId(),
        check: curryInRange(1, 32),
        msg: "between 1 and 32."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Disc Number",
    short: "discNumber",
    type: "int",
    doc: false,
    init: 1,
    req: true,
    min: 1,
    max: 32,
    parse: {
      in: toInteger,
      out: toInteger
    },
    validators: [
      {
        id: uniqueId(),
        check: isSafeInteger,
        msg: "a valid integer."
      },
      {
        id: uniqueId(),
        check: curryInRange(1, 32),
        msg: "between 1 and 32."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Featuring",
    short: "featuring",
    type: "list",
    doc: true,
    db: artists,
    init: ["ee2b6158df8e33fa33e97641"],
    req: false,
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
  },
  {
    id: uniqueId(),
    name: "Remixers",
    short: "remixers",
    type: "list",
    doc: true,
    db: artists,
    init: ["58f180cd954223546bad3b8d"],
    req: false,
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
  },
  {
    id: uniqueId(),
    name: "Artists",
    short: "artists",
    type: "list",
    doc: true,
    db: artists,
    init: ["f27b9b105031222228adfc2b"],
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
  },
  {
    id: uniqueId(),
    name: "Genres",
    short: "genres",
    type: "list",
    doc: true,
    db: genres,
    init: ["cd72485214ed90c87ad9b352"],
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
  },
  {
    id: uniqueId(),
    name: "Album",
    short: "album",
    type: "text",
    doc: true,
    db: albums,
    init: "6ed416274c52a862088ff03e",
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
        check: isString,
        msg: "data type of string."
      },
      {
        id: uniqueId(),
        check: isHex,
        msg: "hexadecimal."
      },
      {
        id: uniqueId(),
        check: isStringLength(24),
        msg: "of length 24."
      }
    ]
  }
]

export default fieldsConifg
