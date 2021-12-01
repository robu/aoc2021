const { InputData, slidingWindow } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => {
    let countDowns = 0
    input.linesInts().reduce((x, y) => {
        if (x < y) { countDowns++ }
        return y
    })
    return countDowns
}

const part2 = () => {
    let slidingSums = slidingWindow(input.linesInts(), 3).map((w)=>w.reduce((x,y)=>x+y))
    let countUps = 0
    slidingSums.reduce((x, y) => {
        if (x < y) { countUps++ }
        return y
    })
    return countUps

}
const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())
