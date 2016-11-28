export const origin =
  process.env.NODE_ENV === 'production' ?
    location.origin :
    'http://localhost:3001'

export const colors = {
  grey: '#CCCCCC',
  red: '#E01515',
  green: '#60BE29',
  blue: '#00A0E9',
  magenta: '#E9259E',
  orange: '#FF6100',
  purple: '#5E30B5',
  yellow: '#FAC450',
  cyan: '#01BAD2',
}
