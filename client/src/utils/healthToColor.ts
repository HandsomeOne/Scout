import { scaleLinear } from 'd3'
import { colors as C } from '../config'

export default scaleLinear<string>().domain([0, 0.5, 1]).range([C.red, C.yellow, C.green])
