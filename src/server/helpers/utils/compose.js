const compose = (...funcs) => x => funcs.reduce((val, func) => func(val), x)

export default compose
