const { InputData } = require('aoc-toolbox')

const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false
    return num > 1
}

const part1 = () => {
    //    let ints = new InputData({filename: "input-test1.txt"}).linesInts()
    let ints = new InputData().linesInts()
    let total = 0
    for (let i = 0; i < ints.length; i++) {
        if (isPrime(ints[i])) {
            total += i * ints[i]
        }
    }
    return total
}

const part2 = () => {
    //    let ints = new InputData({filename: "input-test2.txt"}).linesInts()
    let ints = new InputData().linesInts()
    let total = 0
    for (let i = 0; i < ints.length; i++) {
        if (!isPrime(ints[i])) {
            if (i % 2 == 0) {
                total += ints[i]
            } else {
                total -= ints[i]
            }
        }
    }
    return total
}

const part = process.env.part || "part1"

if (part === "part1")
    console.log(part1())
else
    console.log(part2())
