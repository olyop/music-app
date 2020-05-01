const pipe = x => (...funcs) =>
  funcs.reduce((val, func) => func(val), x)

export default pipe
