export const origin =
  process.env.NODE_ENV === 'production' ?
    location.origin :
    'http://localhost:3001'

export const colors = {
  red: '#f04134',
  green: '#00a854',
  blue: '#108ee9',
  pink: '#f5317f',
  orange: '#f56a00',
  purple: '#7265e6',
  yellow: '#ffbf00',
  cyan: '#00a2ae',
}
