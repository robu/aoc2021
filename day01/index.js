const { InputData, countCompare, equidistantPairs } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => {
    return countCompare(input.linesInts(), (x, y) => x < y)
}

const part2 = () => {
    return equidistantPairs(input.linesInts(), 3).filter((elem) => elem[0] < elem[1]).length
}

const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())
