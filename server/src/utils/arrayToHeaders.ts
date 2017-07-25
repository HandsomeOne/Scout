export default function arrayToHeaders(array = []) {
  return array.reduce((headers, [key, value]) => (
    Object.assign(headers, { [key]: value })
  ), {})
}
