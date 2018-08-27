import * as moment from 'moment'
moment.locale('zh-cn')

export default (time: any) =>
  moment(time)
    .calendar()
    .replace(/\s*(\d+)\s*/g, (match, $1) => ` ${$1} `)
