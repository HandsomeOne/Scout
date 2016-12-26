exports.getStatuses = function getStatuses(foldedSnapshots) {
  return foldedSnapshots.map(fold => fold.reduce((statuses, snapshot) => {
    statuses[snapshot.status] += 1
    return statuses
  }, {
    OK: 0,
    Error: 0,
    Idle: 0,
  }))
}
