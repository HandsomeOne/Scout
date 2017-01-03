exports.getStatuses = function getStatuses(foldedSnapshots) {
  return foldedSnapshots.map(fold => fold.reduce((statuses, { status, errName }) => {
    if (status === 'Error') {
      statuses.Errors = statuses.Errors || {}
      const { Errors } = statuses
      Errors[errName] = Errors[errName] || 0
      Errors[errName] += 1
    } else {
      statuses[status] = statuses[status] || 0
      statuses[status] += 1
    }
    return statuses
  }, {}))
}
