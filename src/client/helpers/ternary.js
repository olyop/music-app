const ternary = (condition, trueReturn, falseReturn) => x =>
  (condition(x) ? trueReturn : falseReturn)

export default ternary

