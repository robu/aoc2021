const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' }).trim().split("\n")[0].split(',').map((x) => +x)

let genCounters = new Array(9).fill(0)
input.forEach((f) => genCounters[f] += 1)

const increaseDays = (days) => {
    for (let i = 0; i < days; i++) {
        let mothers = genCounters.shift()
        genCounters.push(0)
        genCounters[8] += mothers
        genCounters[6] += mothers
    }
    return genCounters.reduce((x, y) => x + y)
}

const part1 = () => increaseDays(80)
const part2 = () => increaseDays(256)

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
