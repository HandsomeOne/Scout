import * as d3 from 'd3'
import { colors as C } from '../config'

export default d3.scaleLinear().domain([0, 0.5, 1]).range([C.red, C.orange, C.green])
