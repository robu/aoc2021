const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' }).split(',').map((x) => +x)

const medianOfArray = arr => {
    let middle = Math.floor(arr.length / 2)
    arr = [...arr].sort((a, b) => a - b)
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2
}

const part1 = () => {
    const median = medianOfArray(input)
    return input.map((x) => Math.abs(x - median)).reduce((x, y) => x + y)
}

const distanceCost = (d) => d * (d + 1) / 2

const part2 = () => {
    const average = Math.round(input.reduce((x, y) => x + y) / input.length - 0.5) // rounded down
    return input.map((x) => distanceCost(Math.abs(x - average))).reduce((x, y) => x + y)
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
