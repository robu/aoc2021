const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map((line) => {
    [command, value] = line.split(' ')
    return { command, value: +value }
})

const part1 = () => {
    let machine = {
        forward: ({ position, depth }, value) => { return { position: position + value, depth } },
        up: ({ position, depth }, value) => { return { position, depth: depth - value } },
        down: ({ position, depth }, value) => { return { position, depth: depth + value } },
    }
    let state = { depth: 0, position: 0 }
    input.forEach(({ command, value }) => { state = machine[command](state, value) })
    return state.position * state.depth
}

const part2 = () => {
    let machine = {
        forward: ({ position, depth, aim }, value) => { return { position: position + value, depth: depth + aim * value, aim } },
        up: ({ position, depth, aim }, value) => { return { position, depth, aim: aim - value } },
        down: ({ position, depth, aim }, value) => { return { position, depth, aim: aim + value } },
    }
    let state = { depth: 0, position: 0, aim: 0 }
    input.forEach(({ command, value }) => { state = machine[command](state, value) })
    return state.position * state.depth
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
