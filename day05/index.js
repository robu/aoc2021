const { InputData, cs } = require('aoc-toolbox')
let startTime = new Date().getTime()

const input = new InputData().linefieldsSeparator(' -> ').map(([c1, c2]) => {
    c1 = c1.split(','); c2 = c2.split(',')
    return { from: { x: +c1[0], y: +c1[1] }, to: { x: +c2[0], y: +c2[1] } }
})

class PointCounter {
    constructor() {
        this._points = {}
    }
    add = (point) => {
        const p = `${point.x},${point.y}`//JSON.stringify(point)
        if (p in this._points) {
            this._points[p] = this._points[p] + 1
        } else {
            this._points[p] = 1
        }
    }
    addPointsBetween = (from, to) => {
        for (let yDelta = 0, xDelta = 0; Math.abs(yDelta) <= Math.abs(to.y - from.y) && Math.abs(xDelta) <= Math.abs(to.x - from.x); yDelta += Math.sign(to.y - from.y), xDelta += Math.sign(to.x - from.x)) {
            this.add({ x: from.x + xDelta, y: from.y + yDelta })
        }
    }
    count = (pred) => Object.entries(this._points).filter(pred).length
}

const countDangerousPoints = (data) => {
    const pointCounter = new PointCounter()
    data.forEach(({ from, to }) => pointCounter.addPointsBetween(from, to))
    return pointCounter.count(([, total]) => total > 1)
}

// only work with straight lines, ie horizontal or vertical, not diagonal
const part1 = () => countDangerousPoints(input.filter(({ from, to }) => from.x === to.x || from.y === to.y))

const part2 = () => countDangerousPoints(input)

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
let endTime = new Date().getTime()
console.log(`${endTime - startTime} ms`)