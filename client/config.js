export const origin =
  process.env.NODE_ENV === 'production' ?
    location.origin :
    'http://localhost:3001'
export const SCOUT_URL =
  process.env.NODE_ENV === 'production' ?
    '/scout' :
    'http://localhost:3001/scout'
