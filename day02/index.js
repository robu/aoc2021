const { InputData, countCompare, equidistantPairs } = require('aoc-toolbox')
const input = new InputData()

const part1 = () => {
    let depth = horizontal = 0
    input.linefieldsSeparator(' ').forEach(([cmd, magnitude]) => {
        if (cmd == 'forward') {
            horizontal += parseInt(magnitude)
        } else if (cmd == 'up') {
            depth -= parseInt(magnitude)
        } else if (cmd == 'down') {
            depth += parseInt(magnitude)
        }
    })
    return horizontal * depth
}

const part2 = () => {
    let depth = horizontal = aim = 0
    input.linefieldsSeparator(' ').forEach(([cmd, magnitude]) => {
        if (cmd == 'forward') {
            horizontal += parseInt(magnitude)
            depth += parseInt(magnitude) * aim
        } else if (cmd == 'up') {
            aim -= parseInt(magnitude)
        } else if (cmd == 'down') {
            aim += parseInt(magnitude)
        }
    })
    return horizontal * depth
}

const part = process.env.part || "part1"
console.log(part == "part1" ? part1() : part2())
