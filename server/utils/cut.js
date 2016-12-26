module.exports = function* cut(snapshots, since, now = Date.now()) {
  const milliseconds = since * 60 * 1000
  for (let i = snapshots.length - 1; i >= 0; i -= 1) {
    const { timestamp } = snapshots[i]
    if (now - timestamp >= milliseconds) {
      return
    }
    if (now >= timestamp) {
      yield snapshots[i]
    }
  }
}
