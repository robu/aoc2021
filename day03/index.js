const { InputData, cs } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => {
    let gammaStr = epsilonStr = ''
    const rows = input.linesCount()
    for (let i = 0; i < input.colsCount(); i++) {
        gammaStr = gammaStr + (input.countOccurrencesInColumn(i, '1') > rows / 2 ? '1' : '0')
        epsilonStr = epsilonStr + (gammaStr[i] == '1' ? '0' : '1')
    }
    return parseInt(gammaStr, 2) * parseInt(epsilonStr, 2)
}

const mostCommonBit = (data, col) => {
    const count = data.countOccurrencesInColumn(col, '1')
    return count >= data.linesCount()/2 ? '1' : '0'
}

const leastCommonBit = (data, col) => {
    const count = data.countOccurrencesInColumn(col, '1')
    return count < data.linesCount()/2 ? '1' : '0'
}

const part2 = () => {
    let oxygenData = new InputData({lines: input.lines()})
    let col = 0
    while (oxygenData.linesCount() > 1 && col < input.colsCount()) {
        oxygenData = oxygenData.filterOnColValue(col, mostCommonBit(oxygenData, col))
        col++
    }
    const oxygen = parseInt(oxygenData.lines()[0], 2)

    let co2Data = new InputData({lines: input.lines()})
    col = 0
    while (co2Data.linesCount() > 1 && col < input.colsCount()) {
        co2Data = co2Data.filterOnColValue(col, leastCommonBit(co2Data, col))
        col++
    }
    const co2 = parseInt(co2Data.lines()[0], 2)
    return oxygen * co2
}

const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())
