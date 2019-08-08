import queryResolver from "./query.js"
import mutationResolver from "./mutation.js"
import artistResolver from "./artist.js"
import albumResolver from "./album.js"
import SongResolver from "./song.js"

const resolvers = {
  Query: queryResolver,
  Mutation: mutationResolver,
  Artist: artistResolver,
  Album: albumResolver,
  Song: SongResolver
}

export default resolvers
