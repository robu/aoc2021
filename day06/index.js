const fs = require('fs')
const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split("\n")[0].split(',').map((x) => +x)

class FishGenerations {
    constructor(fishList = [], range = 9, resetTo = 6) {
        this._range = range
        this._resetTo = resetTo
        this._generationCounters = new Array(this._range).fill(0)
        fishList.forEach((f) => this.addFish(1, f))
    }

    addFish = (count, generation) => this._generationCounters[generation] += count

    increaseDays(iterations = 1) {
        for (let i = 0; i < iterations; i++) {
            let mothers = this._generationCounters.shift()
            this._generationCounters.push(0)
            this.addFish(mothers, this._range - 1) // children added to the end of the queue
            this.addFish(mothers, this._resetTo) // previous mothers added to the reset generation
        }
        return this._generationCounters.reduce((x, y) => x + y)
    }
}

const part1 = () => new FishGenerations(input).increaseDays(80)
const part2 = () => new FishGenerations(input).increaseDays(256)

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
