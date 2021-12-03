const { InputData, countCompare, equidistantPairs } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => {
    const fields = input.linefieldsSeparator(' ')
    let depth = horizontal = 0
    fields.forEach(([cmd, magnitude])=>{
        magnitude = parseInt(magnitude)
        if (cmd == 'forward') {
            horizontal += magnitude
        } else if (cmd == 'up') {
            depth -= magnitude
        } else if (cmd == 'down') {
            depth += magnitude
        }
    })
    return horizontal * depth
}

const part2 = () => {
    const fields = input.linefieldsSeparator(' ')
    let depth = horizontal = aim = 0
    fields.forEach(([cmd, magnitude])=>{
        magnitude = parseInt(magnitude)
        if (cmd == 'forward') {
            horizontal += magnitude
            depth += magnitude * aim
        } else if (cmd == 'up') {
            aim -= magnitude
        } else if (cmd == 'down') {
            aim += magnitude
        }
    })
    return horizontal * depth
}

const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())