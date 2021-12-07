const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' }).split(',').map((x) => +x)

const medianOfArray = arr => {
    let middle = Math.floor(arr.length / 2)
    arr = [...arr].sort((a, b) => a - b)
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2
}

const part1 = () => {
    const median = medianOfArray(input)
    return input.reduce((x, y) => x + Math.abs(y - median), 0)
}

const distanceCost = (d) => d * (d + 1) / 2

const part2 = () => {
    const average = Math.round(input.reduce((x, y) => x + y) / input.length - 0.5) // rounded down
    return input.reduce((x, y) => x + distanceCost(Math.abs(y - average)), 0)
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
