declare namespace I {
  interface Scout {
    id: string
    name: string
    tags: string[]
    method: 'GET' | 'HEAD' | 'POST'
    URL: string
    body?: string
    recipients: string[]

    headers: string[][]
    ApdexTarget?: number
    interval?: number
    tolerance?: number

    readType: 'text' | 'json'
    testCase?: string
    workTime: number[][][]
  }

  interface Snapshot {
    time: string
    status: 'OK' | 'Error' | 'Idle'
    statusCode: number
    responseTime: number
    errName: string
    errMessage: string
    body: string
  }
}

export default I
