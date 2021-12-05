const { InputData, cs } = require('aoc-toolbox')
const input = new InputData().linefieldsSeparator(' -> ').map(([c1, c2]) => {
    c1 = c1.split(','); c2 = c2.split(',')
    return { from: { x: parseInt(c1[0]), y: parseInt(c1[1]) }, to: { x: parseInt(c2[0]), y: parseInt(c2[1]) } }
})

const pointsBetween = (from, to) => {
    let points = []
    for (let yDelta = 0, xDelta = 0; Math.abs(yDelta) <= Math.abs(to.y - from.y) && Math.abs(xDelta) <= Math.abs(to.x - from.x); yDelta += Math.sign(to.y - from.y), xDelta += Math.sign(to.x - from.x)) {
        points.push({ x: from.x + xDelta, y: from.y + yDelta })
    }
    return points
}

class PointCounter {
    constructor() {
        this._points = {}
    }
    add = (point) => {
        let p = JSON.stringify(point)
        if (p in this._points) {
            this._points[p] = this._points[p] + 1
        } else {
            this._points[p] = 1
        }
    }
    count = (pred) => Object.entries(this._points).filter(pred).length
}

const countDangerousPoints = (data) => {
    let counter = new PointCounter()
    data.forEach(({ from, to }) => pointsBetween(from, to).forEach((p) => counter.add(p)))
    return counter.count(([, count]) => count > 1)
}

const part1 = () => {
    // only work with straight lines, ie horizontal or vertical, not diagonal
    return countDangerousPoints(input.filter(({from, to}) => from.x === to.x || from.y === to.y))
}

const part2 = () => {
    return countDangerousPoints(input)
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
