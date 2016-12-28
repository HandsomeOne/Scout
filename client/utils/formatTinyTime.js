export default (milliseconds) => {
  const ms = milliseconds || 0
  return ms < 1000 ? `${ms.toFixed(0)}ms` : `${(ms / 1000).toFixed(2)}s`
}
