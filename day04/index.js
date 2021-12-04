const { InputData, cs } = require('aoc-toolbox')
const input = new InputData()

class MaskMatrix {
    constructor(rows = 5, cols = 5, emptyChar = '_', maskChar = 'X') {
        this._rows = rows; this._cols = cols, this._emptyChar = emptyChar; this._maskChar = maskChar
        this._content = []
        let row = new Array(this._cols)
        row.fill(this._emptyChar)
        for (let i = 0; i < this._rows; i++) {
            this._content.push(Array.from(row))
        }
    }

    mask = (row, col) => this._content[row][col] = this._maskChar

    isMasked = (row, col) => this._content[row][col] === this._maskChar

    _isAllMask = (rowArr) => rowArr.filter((x) => x === this._maskChar).length === rowArr.length

    isFullRow = (rowNum) => this._isAllMask(this._content[rowNum])

    isFullColumn = (colNum) => this._isAllMask(this._content.map((r) => r[colNum]))
}

class BingoBoard {
    constructor(content) {
        this._content = content
        this._masks = new MaskMatrix(this._content.length, this._content[0].length)
        this._bingo = false
    }

    findAndMaskNumber(number) {
        for (let row = 0; row < this._content.length; row++) {
            for (let col = 0; col < this._content[row].length; col++) {
                if (number == this._content[row][col]) {
                    this._masks.mask(row, col)
                    if (this._masks.isFullRow(row) || this._masks.isFullColumn(col)) {
                        this._bingo = true
                    }
                    return true // means found number. possibly bingo.
                }
            }
        }
        return false // means didn't find number
    }

    unmaskedNumbers() {
        let numbers = []
        this._content.forEach((row, r) => {
            row.forEach((n, c) => {
                if (!this._masks.isMasked(r, c)) {
                    numbers.push(parseInt(n))
                }
            })
        })
        return numbers
    }

    hasBingo = () => this._bingo
}

const findWinningBoardInSequence = (index, boards, numbers) => {
    let winningBoardsCount = 0
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < boards.length; j++) {
            let board = boards[j]
            if (!board.hasBingo()) { // don't check previous winners
                let found = board.findAndMaskNumber(numbers[i])
                if (found && board.hasBingo()) {
                    winningBoardsCount++
                    if (winningBoardsCount == index) {
                        return [board, parseInt(numbers[i])]
                    }
                }
            }
        }
    }
    return []
}

const findFirstWinningBingoBoard = (boards, numbers) => findWinningBoardInSequence(1, boards, numbers)
const findLastWinningBingoBoard = (boards, numbers) => findWinningBoardInSequence(boards.length, boards, numbers)

const boardsAndNumbers = () => {
    [numbers, ...boards] = input.sections()
    boards = boards.map((b) => b.linefieldsSeparator(' ')).map((b) => b.map((l) => l.filter((c) => c != ""))).map((b) => new BingoBoard(b))
    return [boards, numbers.firstLine().split(',')]
}

const part1 = () => {
    let [boards, numbers] = boardsAndNumbers()
    let [winningBoard, winningNumber] = findFirstWinningBingoBoard(boards, numbers)
    let winningSum = winningBoard.unmaskedNumbers().reduce((x, y) => x + y)
    return winningSum * winningNumber
}

const part2 = () => {
    let [boards, numbers] = boardsAndNumbers()
    let [winningBoard, winningNumber] = findLastWinningBingoBoard(boards, numbers)
    let winningSum = winningBoard.unmaskedNumbers().reduce((x, y) => x + y)
    return winningSum * winningNumber
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
