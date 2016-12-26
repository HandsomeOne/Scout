exports.getStatuses = function getStatuses(foldedSnapshots) {
  return foldedSnapshots.map(fold => fold.reduce((statuses, snapshot) => {
    statuses[snapshot.status] = statuses[snapshot.status] || 0
    statuses[snapshot.status] += 1
    return statuses
  }, {}))
}
