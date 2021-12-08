const inputData = require('fs').readFileSync('input-test.txt', { encoding: 'utf8' }).trim().split('\n').map((line) => line.split(' | ').map((io) => io.split(' ')))

const part1 = () => {
    console.log('First line:')
    console.log(`${inputData[0][0].toString()}`)
}

const part2 = () => {
    return -1
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
