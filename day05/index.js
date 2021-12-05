const { InputData, cs } = require('aoc-toolbox')
const input = new InputData().linefieldsSeparator(' -> ').map(([c1, c2]) => {
    c1 = c1.split(','); c2 = c2.split(',')
    return { from: { x: parseInt(c1[0]), y: parseInt(c1[1]) }, to: { x: parseInt(c2[0]), y: parseInt(c2[1]) } }
})

const maxFromZero = (x1, x2) => {
    if (x1 >= 0 && x2 >= 0) {
        return Math.max(x1, x2)
    } else if (x1 <= 0 && x2 <= 0) {
        return -Math.max(Math.abs(x1), Math.abs(x2))
    } else if (x1 >= 0 && x2 <= 0) {
        let m = Math.max(x1, Math.abs(x2))
        return m == x1 ? x1 : x2
    } else {
        let m = Math.max(x2, Math.abs(x1))
        return m == x2 ? x2 : x1
    }
}

/**
 * Returns an array of coordinates (as {x,y} objects) between the two coordinates given (inclusively)
 * @param {object} from object containing the "x" and "y" coordinates (integers)
 * @param {object} to   object containing the "x" and "y" coordinates (integers)
 */
const pointsBetween = (from, to) => {
    return pointsBetweenStraight(from, to)
    // let stepsX = to.x - from.x + 1
    // let stepsY = to.y - from.y + 1
    // let steps = maxFromZero(stepsX, stepsY)
    // let stepLengthX = steps / stepsX + Math.sign(steps / stepsX)
    // let stepLengthY = steps / stepsY + Math.sign(steps / stepsY)
    // cs({ from, to, steps, stepLengthX, stepLengthY })
    // return []
}

const pointsBetweenStraight = (from, to) => {
    let points = []
    if (from.x === to.x) {
        for (let yDelta = 0; Math.abs(yDelta) <= Math.abs(to.y - from.y); yDelta += Math.sign(to.y - from.y)) {
            points.push({ x: from.x, y: from.y + yDelta })
        }
    } else if (from.y === to.y) {
        for (let xDelta = 0; Math.abs(xDelta) <= Math.abs(to.x - from.x); xDelta += Math.sign(to.x - from.x)) {
            points.push({ x: from.x + xDelta, y: from.y })
        }
    }
    return points
}


class PointCounter {
    constructor() {
        this._points = {}
    }
    j = (obj) => JSON.stringify(obj)
    add = (point) => {
        let p = this.j(point)
        if (p in this._points) {
            this._points[p] = this._points[p] + 1
        } else {
            this._points[p] = 1
        }
    }
    countAt = (point) => this._points[this.j(point)] || 0
    filter = (pred) => Object.entries(this._points).filter(pred)
    coordinates = () => this._points
}

const part1 = () => {
    // only work with straight lines, ie horizontal or vertical, not diagonal
    let straightInput = input.filter((cs) => cs.from.x === cs.to.x || cs.from.y === cs.to.y)
    let inputWithSteps = straightInput.map((s) => { return { from: s.from, to: s.to, steps: pointsBetween(s.from, s.to) } })
    let counter = new PointCounter()
    inputWithSteps.forEach((line) => line.steps.forEach((point) => counter.add(point)))
    let coords = counter.filter(([coord, count]) => count > 1)
    return coords.length
}

const part2 = () => {
    return -1
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
