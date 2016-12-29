export default function union(array) {
  return [...array.reduce((set, a) => {
    if (Array.isArray(a)) {
      a.forEach((e) => { set.add(e) })
    }
    return set
  }, new Set())]
}
