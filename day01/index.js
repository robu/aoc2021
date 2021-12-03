const { InputData, countCompare, equidistantPairs } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => countCompare(input.linesInts(), (x, y) => x < y)
const part2 = () => equidistantPairs(input.linesInts(), 3).filter(([x, y]) => x < y).length

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
