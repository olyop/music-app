import { uniqueId } from "lodash"

const artist = [{
  id: uniqueId(),
  name: "Name",
  camelCase: "name",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isStringLengthInRange(1, 256),
    message: "between 1 and 256 characters."
  }]
}]

const label = [{
  id: uniqueId(),
  name: "Name",
  camelCase: "name",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isStringLengthInRange(1, 256),
    message: "between 1 and 256 characters."
  }]
}]

const album = [{
  id: uniqueId(),
  name: "Title",
  camelCase: "title",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isStringLengthInRange(1, 256),
    message: "between 1 and 256 characters."
  }]
},{
  id: uniqueId(),
  name: "Released",
  camelCase: "released",
  type: "date",
  init: new Date(),
  required: true,
  validatiors: [{
    validator: isDateBefore(new Date()),
    message: "valid date."
  }]
},{
  id: uniqueId(),
  name: "Artists",
  camelCase: "artists",
  type: "list",
  init: [""],
  required: true,
  validatiors: [{
    validator: validateArray(isHex),
    message: "all be hexadecimal."
  },{
    validator: validateArray(isStringLength(24)),
    message: "all be of length 24."
  }]
},{
  id: uniqueId(),
  name: "Label",
  camelCase: "label",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isHex,
    message: "hexadecimal."
  },{
    validator: isStringLength(24),
    message: "of length 24."
  }]
}]

const genre = [{
  id: uniqueId(),
  name: "Name",
  camelCase: "name",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isStringLengthInRange(1, 256),
    message: "between 1 and 256 characters."
  }]
}]

const song = [{
  id: uniqueId(),
  name: "Title",
  camelCase: "title",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isStringLengthInRange(1, 256),
    message: "between 1 and 256 characters."
  }]
},{
  id: uniqueId(),
  name: "Mix Name",
  camelCase: "mixName",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isStringLengthInRange(1, 256),
    message: "between 1 and 256 characters."
  }]
},{
  id: uniqueId(),
  name: "Track",
  camelCase: "trackNumber",
  type: "int",
  init: 1,
  required: true,
  validatiors: [{
    validator: isSafeInteger,
    message: "a valid integer."
  },{
    validator: inRangeCurry(1, 99),
    message: "between 1 and 99."
  }]
},{
  id: uniqueId(),
  name: "Disc",
  camelCase: "discNumber",
  type: "int",
  init: 1,
  required: true,
  validatiors: [{
    validator: isSafeInteger,
    message: "a valid integer."
  },{
    validator: inRangeCurry(1, 99),
    message: "between 1 and 99."
  }]
},{
  id: uniqueId(),
  name: "Featuring",
  camelCase: "featuring",
  type: "list",
  init: [""],
  required: true,
  validatiors: [{
    validator: validateArray(isHex),
    message: "all be hexadecimal."
  },{
    validator: validateArray(isStringLength(24)),
    message: "all be of length 24."
  }]
},{
  id: uniqueId(),
  name: "Remixers",
  camelCase: "remixers",
  type: "list",
  init: [""],
  required: true,
  validatiors: [{
    validator: validateArray(isHex),
    message: "all be hexadecimal."
  },{
    validator: validateArray(isStringLength(24)),
    message: "all be of length 24."
  }]
},{
  id: uniqueId(),
  name: "Artists",
  camelCase: "artists",
  type: "list",
  init: [""],
  required: true,
  validatiors: [{
    validator: validateArray(isHex),
    message: "all be hexadecimal."
  },{
    validator: validateArray(isStringLength(24)),
    message: "all be of length 24."
  }]
},{
  id: uniqueId(),
  name: "Album",
  camelCase: "album",
  type: "text",
  init: "",
  required: true,
  validatiors: [{
    validator: isHex,
    message: "hexadecimal."
  },{
    validator: isStringLength(24),
    message: "of length 24."
  }]
},{
  id: uniqueId(),
  name: "Genre",
  camelCase: "genre",
  type: "text",
  init: [""],
  required: true,
  validatiors: [{
    validator: validateArray(isHex),
    message: "all be hexadecimal."
  },{
    validator: validateArray(isStringLength(24)),
    message: "all be of length 24."
  }]
}]

const addFormConfigs = {
  artist,
  label,
  album,
  genre,
  song
}

export default addFormConfigs
