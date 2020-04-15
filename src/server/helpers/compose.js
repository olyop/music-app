const compose = (...funcs) => funcs.reduce((val, func) => func(val))

export default compose
