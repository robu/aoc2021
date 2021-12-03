const { InputData, cs } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => {
    const rows = input.lines().length
    const cols = input.lines()[0].length
    let counters = []
    for (let col = 0; col < cols; col++) {
        counters.push(input.countOccurrencesInColumn(col, '1'))
    }
    let gammaStr = ''
    let epsilonStr = ''
    for (let i = 0; i < counters.length; i++) {
        gammaStr = gammaStr + (counters[i] > rows / 2 ? '1' : '0')
        epsilonStr = epsilonStr + (gammaStr[i] == '1' ? '0' : '1')
    }
    let gamma = parseInt(gammaStr, 2)
    let epsilon = parseInt(epsilonStr, 2)

    return gamma * epsilon
}

const part2 = () => {
    return -1
}

const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())
