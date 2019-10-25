export const deserializeArtists = artists => {
  const names = artists.map(({ name }) => name)
  const finalName = names.pop()
  return names.length ? `${names.join(", ")} & ${finalName}` : finalName
}
