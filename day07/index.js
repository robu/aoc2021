const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' }).split(',').map((x) => +x)

const medianOfArray = arr => {
    let middle = Math.floor(arr.length / 2)
    arr = [...arr].sort((a, b) => a - b)
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2
}

const part1 = () => {
    const median = medianOfArray(input)
    const distances = input.map((x) => Math.abs(x - median))
    const distanceSum = distances.reduce((x, y) => x + y)
    return distanceSum
}

const part2 = () => {
    return -1
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
