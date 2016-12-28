module.exports = function getErrorLog(snapshots) {
  const logs = []
  let period = { num: 0 }
  let prev

  function handleOK() {
    if (period.num) {
      period.start = prev.timestamp.valueOf()
      period.log = {
        statusCode: prev.statusCode,
        responseTime: prev.responseTime,
        errName: prev.errName,
        errMessage: prev.errMessage,
        body: prev.body,
      }
      logs.push(period)
      period = { num: 0 }
    }
  }

  for (const snapshot of snapshots) {
    if (snapshot.status === 'Error') {
      if (period.num === 0) {
        period.end = snapshot.timestamp.valueOf()
      }
      period.num += 1
      prev = snapshot
    } else {
      handleOK()
    }
  }
  handleOK()

  return logs
}
