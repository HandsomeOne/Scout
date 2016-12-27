export default (milliseconds) => {
  const rounded = Math.round(milliseconds)
  return milliseconds < 1000 ? `${rounded}ms` : `${rounded / 1000}s`
}
