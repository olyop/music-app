const s3CatalogObjectKey = ({ id, size, format }) => `catalog/${id}/${size.toLowerCase()}.${format.toLowerCase()}`

export default s3CatalogObjectKey
