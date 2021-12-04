const { InputData, cs } = require('aoc-toolbox')
const input = new InputData()

class MaskMatrix {
    constructor(rows = 5, cols = 5, emptyChar = '_', maskChar = 'X') {
        this._rows = rows; this._cols = cols, this._emptyChar = emptyChar; this._maskChar = maskChar
        this._content = []
        for (let i = 0; i < this._rows; i++) {
            let row = []
            for (let j = 0; j < this._cols; j++) {
                row.push(this._emptyChar)
            }
            this._content.push(row)
        }
    }

    mask(row, col) {
        this._content[row][col] = this._maskChar
    }

    isMasked(row, col) {
        return this._content[row][col] === this._maskChar
    }

    isFullRow(rowNum) {
        let line = this._content[rowNum]
        return line.filter((x) => x === this._maskChar).length === line.length
    }

    hasFullRow() {
        for (let r = 0; r < this._rows; r++) {
            if (this.isFullRow(r)) {
                return true
            }
        }
        return false
    }

    column(colNum) {
        let col = []
        for (let r = 0; r < this._rows; r++) {
            col.push(this._content[r][colNum])
        }
        return col
    }

    isFullColumn(colNum) {
        let col = this.column(colNum)
        return col.filter((x) => x === this._maskChar).length === col.length
    }

    hasFullColumn() {
        for (let c = 0; c < this._cols; c++) {
            if (this.isFullColumn(c)) {
                return true
            }
        }
        return false
    }

    hasFullRowOrColumn() {
        return this.hasFullRow() || this.hasFullColumn()
    }
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
                    numbers.push(n)
                }
            })
        })
        return numbers.map((n) => parseInt(n))
    }

    hasBingo() {
        return this._bingo
    }

}

const findFirstWinningBingoBoard = (boards, numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < boards.length; j++) {
            let board = boards[j]
            let found = board.findAndMaskNumber(numbers[i])
            if (found && board.hasBingo()) {
                return [board, parseInt(numbers[i])]
            }
        }
    }
    return []
}

const part1 = () => {
    [numbers, ...boards] = input.sections()
    numbers = numbers.firstLine().split(',')
    boards = boards.map((b) => b.linefieldsSeparator(' ')).map((b) => b.map((l) => l.filter((c) => c != ""))).map((b) => new BingoBoard(b))
    let [winningBoard, winningNumber] = findFirstWinningBingoBoard(boards, numbers)
    let winningSum = winningBoard.unmaskedNumbers().reduce((x, y) => x + y)
    return winningSum * winningNumber
}

const part2 = () => {
    return -1
}

console.log((process.env.part || "part1") == "part1" ? part1() : part2())
