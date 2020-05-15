const resolver = callback => (parent, args, context, info) => callback({ parent, args, context, info })

export default resolver
