import pipe from "./pipe"

const compose = (...funcs) => x => pipe(x)(...funcs)

export default compose
