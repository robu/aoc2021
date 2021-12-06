const fs = require('fs')
const input = fs.readFileSync('input.txt', {encoding: 'utf8'}).trim().split("\n")[0].split(',').map((x) => +x)

class FishGenerations {
    constructor(range = 9, resetTo = 6) {
        this._range = range
        this._resetTo = resetTo
        this._generationCounters = new Array(this._range).fill(0)
    }

    addFishes = (fishList) => fishList.forEach((f) => this.addFish(1, f))

    addFish(count = 1, generation = -1) {
        if (generation === -1) {
            generation = this._range - 1
        }
        this._generationCounters[generation] += count
    }

    increaseDays(iterations = 1) {
        for (let i = 0; i < iterations; i++) {
            // console.log(`${this._generationCounters.toString()} (${this.count()})`)
            let mothers = this._generationCounters.shift()
            this._generationCounters.push(0)
            this.addFish(mothers) // children added to the end of the queue
            this.addFish(mothers, this._resetTo) // previous mothers added to the reset generation
        }
    }

    count = () => this._generationCounters.reduce((x, y) => x + y)
}

const part1 = () => {
    let counter = new FishGenerations()
    counter.addFishes(input)
    counter.increaseDays(80)
    return counter.count()
}

const part2 = () => {
    return -1
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
