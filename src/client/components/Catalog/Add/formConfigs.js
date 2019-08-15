import { uniqueId, isString, isSafeInteger, toInteger } from "lodash"
import { inRange } from "lodash/fp"

import {
  isStringLengthInRange,
  deserializeDate,
  isStringLength,
  validateArray,
  isHex,
} from "../../../helpers/form"

export const artist = [
  {
    id: uniqueId(),
    name: "Name",
    camelCase: "name",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 127,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isStringLengthInRange(1, 128),
        message: "between 1 and 256 characters."
      }
    ]
  }
]

export const label = [
  {
    id: uniqueId(),
    name: "Name",
    camelCase: "name",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 127,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isStringLengthInRange(1, 128),
        message: "between 1 and 256 characters."
      }
    ]
  }
]

export const album = [
  {
    id: uniqueId(),
    name: "Title",
    camelCase: "title",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 127,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isStringLengthInRange(1, 128),
        message: "between 1 and 256 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Released",
    camelCase: "released",
    type: "date",
    init: Date.now(),
    required: true,
    minLength: 0,
    maxLength: Date.now(),
    transform: {
      in: Date.parse,
      out: deserializeDate
    },
    validators: [
      {
        id: uniqueId(),
        validator: inRange(0, Date.now()),
        message: "valid date."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Artists",
    camelCase: "artists",
    type: "list",
    init: [],
    required: true,
    minLength: 0,
    maxLength: 24,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: validateArray(isString),
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        validator: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Label",
    camelCase: "label",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 24,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isHex,
        message: "hexadecimal."
      },
      {
        id: uniqueId(),
        validator: isStringLength(24),
        message: "of length 24."
      }
    ]
  }
]

export const genre = [
  {
    id: uniqueId(),
    name: "Name",
    camelCase: "name",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 127,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isStringLengthInRange(1, 128),
        message: "between 1 and 128 characters."
      }
    ]
  }
]

export const song = [
  {
    id: uniqueId(),
    name: "Title",
    camelCase: "title",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 127,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isStringLengthInRange(1, 128),
        message: "between 1 and 128 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Mix",
    camelCase: "mix",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 64,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isStringLengthInRange(1, 64),
        message: "between 1 and 128 characters."
      }
    ]
  },
  [
    {
      id: uniqueId(),
      name: "Track",
      camelCase: "trackNumber",
      type: "int",
      init: 1,
      required: true,
      min: 1,
      max: 32,
      transform: {
        in: toInteger,
        out: toInteger
      },
      validators: [
        {
          id: uniqueId(),
          validator: isSafeInteger,
          message: "a valid integer."
        },
        {
          id: uniqueId(),
          validator: inRange(1, 32),
          message: "between 1 and 32."
        }
      ]
    },
    {
      id: uniqueId(),
      name: "Disc",
      camelCase: "discNumber",
      type: "int",
      init: 1,
      required: true,
      min: 1,
      max: 32,
      transform: {
        in: toInteger,
        out: toInteger
      },
      validators: [
        {
          id: uniqueId(),
          validator: isSafeInteger,
          message: "a valid integer."
        },
        {
          id: uniqueId(),
          validator: inRange(1, 32),
          message: "between 1 and 32."
        }
      ]
    }
  ],
  {
    id: uniqueId(),
    name: "Featuring",
    camelCase: "featuring",
    type: "list",
    init: [],
    required: true,
    minLength: 0,
    maxLength: 24,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: validateArray(isString),
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        validator: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Remixers",
    camelCase: "remixers",
    type: "list",
    init: [],
    required: true,
    minLength: 0,
    maxLength: 24,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: validateArray(isString),
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        validator: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Artists",
    camelCase: "artists",
    type: "list",
    init: [],
    required: true,
    minLength: 0,
    maxLength: 24,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: validateArray(isString),
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        validator: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Genres",
    camelCase: "genres",
    type: "text",
    init: [],
    required: true,
    minLength: 0,
    maxLength: 24,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: validateArray(isString),
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        validator: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Album",
    camelCase: "album",
    type: "text",
    init: "",
    required: true,
    minLength: 0,
    maxLength: 24,
    transform: {
      in: encodeURI,
      out: decodeURI
    },
    validators: [
      {
        id: uniqueId(),
        validator: isString,
        message: "data type of string."
      },
      {
        id: uniqueId(),
        validator: isHex,
        message: "hexadecimal."
      },
      {
        id: uniqueId(),
        validator: isStringLength(24),
        message: "of length 24."
      }
    ]
  }
]
