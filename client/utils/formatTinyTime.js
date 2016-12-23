export default milliseconds => (
  milliseconds < 1000 ? `${milliseconds}ms` : `${milliseconds / 1000}s`
)
