import {
  isSafeInteger,
  uniqueId,
  isString,
  toInteger
} from "lodash"

import {
  isStringLengthInRange,
  deserializeDate,
  isStringLength,
  validateArray,
  isNotEmpty,
  isHex,
} from "../../../helpers/form"

import {
  inRange
} from "lodash/fp"

export const artist = [
  {
    id: uniqueId(),
    name: "Name",
    short: "name",
    type: "text",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        message: "between 1 and 256 characters."
      }
    ]
  }
]

export const label = [
  {
    id: uniqueId(),
    name: "Name",
    short: "name",
    type: "text",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        message: "between 1 and 256 characters."
      }
    ]
  }
]

export const album = [
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
    type: "text",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        message: "between 1 and 256 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Released",
    short: "released",
    type: "date",
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
        check: inRange(0, Date.now()),
        message: "valid date."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Artists",
    short: "artists",
    type: "list",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Label",
    short: "label",
    type: "text",
    init: "",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: isHex,
        message: "hexadecimal."
      },
      {
        id: uniqueId(),
        check: isStringLength(24),
        message: "of length 24."
      }
    ]
  }
]

export const genre = [
  {
    id: uniqueId(),
    name: "Name",
    short: "name",
    type: "text",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        message: "between 1 and 128 characters."
      }
    ]
  }
]

export const song = [
  {
    id: uniqueId(),
    name: "Title",
    short: "title",
    type: "text",
    init: "",
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
        message: "not empty."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 128),
        message: "between 1 and 128 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Mix",
    short: "mix",
    type: "text",
    init: "",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: isStringLengthInRange(1, 64),
        message: "between 1 and 128 characters."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Track Number",
    short: "trackNumber",
    type: "int",
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
        message: "a valid integer."
      },
      {
        id: uniqueId(),
        check: inRange(1, 32),
        message: "between 1 and 32."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Disc Number",
    short: "discNumber",
    type: "int",
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
        message: "a valid integer."
      },
      {
        id: uniqueId(),
        check: inRange(1, 32),
        message: "between 1 and 32."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Featuring",
    short: "featuring",
    type: "list",
    init: [
      {
        id: "5d58ae86e0e4863770aa74ed",
        name: "Don Diablo"
      },
      {
        id: "5d58ae86e0e4863770aadhjd",
        name: "Alexis"
      }
    ],
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Remixers",
    short: "remixers",
    type: "list",
    init: [],
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Artists",
    short: "artists",
    type: "list",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Genres",
    short: "genres",
    type: "list",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: validateArray(isHex),
        message: "all be hexadecimal."
      },
      {
        id: uniqueId(),
        check: validateArray(isStringLength(24)),
        message: "all be of length 24."
      }
    ]
  },
  {
    id: uniqueId(),
    name: "Album",
    short: "album",
    type: "text",
    init: "",
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
        message: "data type of string."
      },
      {
        id: uniqueId(),
        check: isHex,
        message: "hexadecimal."
      },
      {
        id: uniqueId(),
        check: isStringLength(24),
        message: "of length 24."
      }
    ]
  }
]
