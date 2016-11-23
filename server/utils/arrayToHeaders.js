module.exports = function arrayToHeaders(array = []) {
  const result = {}
  array.forEach(([key, value]) => {
    if (key) { result[key] = value }
  })
  return result
}
