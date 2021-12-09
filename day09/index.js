const inputMatrix = require('fs').readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n').map(line => line.split('').map(x => +x))

const adjacents = (matrix, fromRow, fromCol) => {
    let result = []
    if (fromRow > 0) {
        result.push(matrix[fromRow - 1][fromCol])
    }
    if (fromCol < matrix[fromRow].length - 1) {
        result.push(matrix[fromRow][fromCol + 1])
    }
    if (fromRow < matrix.length - 1) {
        result.push(matrix[fromRow + 1][fromCol])
    }
    if (fromCol > 0) {
        result.push(matrix[fromRow][fromCol - 1])
    }
    // console.log(`adjacent values ${fromRow},${fromCol} are: ${result.toString()}`)
    return result
}

const isLowPoint = (matrix, row, col) => matrix[row][col] < Math.min(...adjacents(matrix, row, col))

const part1 = () => {
    let lowPointRiskSum = 0
    for (let row = 0; row < inputMatrix.length; row++) {
        for (let col = 0; col < inputMatrix[0].length; col++) {
            if (isLowPoint(inputMatrix, row, col)) {
                // console.log(`${row},${col} is a low point, value: ${inputMatrix[row][col]}`)
                lowPointRiskSum += 1 + inputMatrix[row][col]
            }
        }
    }
    return lowPointRiskSum
}

const part2 = () => {
    return -1
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
