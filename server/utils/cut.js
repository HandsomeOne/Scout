module.exports = function* cut(snapshots, since = 1440, now = Date.now()) {
  const milliseconds = since * 60 * 1000
  for (let i = snapshots.length - 1; i >= 0; i -= 1) {
    const { time } = snapshots[i]
    if (now - time >= milliseconds) {
      return
    }
    if (now >= time) {
      yield snapshots[i]
    }
  }
}
