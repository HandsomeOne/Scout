import cut from './cut'

export default function cutAndFold(snapshots, since = 1440, interval = 60, now = Date.now()) {
  const cutSnapshots = cut(snapshots, since, now)
  const result = []
  for (let i = 0; i < since / interval; i += 1) {
    result[i] = []
  }
  for (const snapshot of cutSnapshots) {
    const diff = (now - snapshot.time) / 1000 / 60
    result[Math.floor(diff / interval)].push(snapshot)
  }
  return result
}
