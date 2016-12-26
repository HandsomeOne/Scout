module.exports = function getStats(snapshots, ApdexTarget) {
  const stats = {
    ApdexTarget,
    OK: 0,
    Error: 0,
    Idle: 0,
  }
  let total = 0
  let satisfied = 0
  let tolerating = 0
  let totalResponseTime = 0
  for (const snapshot of snapshots) {
    const { responseTime, status } = snapshot
    stats[status] += 1

    if (responseTime) {
      total += 1
      totalResponseTime += responseTime
      if (responseTime <= ApdexTarget) {
        satisfied += 1
      } else if (responseTime <= ApdexTarget * 4) {
        tolerating += 1
      }
    }
  }
  stats.meanResponseTime = totalResponseTime / total
  stats.Apdex = (satisfied + (tolerating / 2)) / total
  return stats
}
