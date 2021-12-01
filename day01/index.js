const { InputData, slidingWindow, countCompare } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => {
    return countCompare(input.linesInts(), (x, y) => x < y)
}

const part2 = () => {
    let slidingSums = slidingWindow(input.linesInts(), 3).map((w) => w.reduce((x, y) => x + y))
    return countCompare(slidingSums, (x, y) => x < y)
}

const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())
