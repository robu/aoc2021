const inputData = require('fs').readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map((line) => line.split(' | ').map((io) => io.split(' ')))

const part1 = () => {
    const outputValues = inputData.map(line => line[1])
    const countEasyDigits = outputValues.flat().reduce((c, str) => {
        if ([2,4,3,7].includes(str.length)) { c++ }
        return c
    }, 0)
    return countEasyDigits
}

const part2 = () => {
    return -1
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
