const { InputData } = require('aoc-toolbox')

const input = new InputData().linefieldsSeparator(' -> ').map(([c1, c2]) => {
    let [x1, y1] = c1.split(','); let [x2, y2] = c2.split(',')
    return { from: { x: +x1, y: +y1 }, to: { x: +x2, y: +y2 } }
})

class PointCounter {
    constructor() {
        this._points = {}
    }
    add = (point) => {
        const p = `${point.x},${point.y}`
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
