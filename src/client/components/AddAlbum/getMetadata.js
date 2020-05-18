import client from "../../apollo"

import PARSE_SONGS from "../../graphql/queries/parseSongs.gql"

const getMetadata = files => new Promise(
  (resolve, reject) => {
    if (files instanceof FileList) {
      client
        .query({
          query: PARSE_SONGS,
          variables: { files },
        })
        .then(({ data }) => data.parseSongs.map(
          (metadata, index) => ({
            ...metadata,
            audio: files[index],
          }),
        ))
        .then(resolve)
        .catch(reject)
    } else {
      reject(new Error("Invalid input type."))
    }
  },
)

export default getMetadata
