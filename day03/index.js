const { InputData } = require('aoc-toolbox')
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
    return data.countOccurrencesInColumn(col, '1') >= data.linesCount() / 2 ? '1' : '0'
}

const leastCommonBit = (data, col) => {
    return data.countOccurrencesInColumn(col, '1') < data.linesCount() / 2 ? '1' : '0'
}

const extractByCriteria = (data, predicate) => {
    let filterData = new InputData({ lines: data.lines() })
    for (let col = 0; filterData.linesCount() > 1 && col < data.colsCount(); col++) {
        filterData = filterData.filterOnColValue(col, predicate(filterData, col))
    }
    return parseInt(filterData.lines()[0], 2)
}

const part2 = () => {
    return extractByCriteria(input, mostCommonBit) * extractByCriteria(input, leastCommonBit)
}

const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())