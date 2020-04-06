import { DocumentNode } from "apollo"
import { func, string, instanceOf } from "prop-types"

export const propTypes = {
  children: func.isRequired,
  collectionName: string.isRequired,
  query: instanceOf(DocumentNode).isRequired,
}
