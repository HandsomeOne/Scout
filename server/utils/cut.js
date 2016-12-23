module.exports = function* cut(snapshots, since) {
  const milliseconds = since * 60 * 1000
  for (let i = snapshots.length - 1; i >= 0; i -= 1) {
    const { timestamp } = snapshots[i]
    if (timestamp.getTime() <= Date.now() - milliseconds) {
      return
    }
    yield snapshots[i]
  }
}
