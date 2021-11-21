const fs = require('fs')

class InputFile {
    constructor(filename = "input.txt") {
        this._lines = fs.readFileSync(filename).toString().trim().split("\n")
    }

    lines() {
        return this._lines
    }

    linesInts() {
        return this.lines().map((x) => parseInt(x))
    }

    linefieldsRegexp(r) {
        return this.lines().map((line) => {
            let matches = line.match(r)
            matches.shift()
            return matches
        })
    }

    sections() {
        let sections = []
        let currentSection = []
        let ls = this.lines()
        for (let lineNum in ls) {
            if (ls[lineNum] == '') {
                if (currentSection.length > 0) {
                    sections.push(currentSection)
                }
                currentSection = []
            } else {
                currentSection.push(ls[lineNum])
            }
        }
        if (currentSection.length > 0) {
            sections.push(currentSection)
        }
        return sections
    }

    matrixChar(row, col) {
        return this.lines()[row][col]
    }

    subMatrix(startRow, startCol, rows, cols) {
        let sub = []
        let ls = this.lines()
        for (let rowNum = startRow; rowNum < startRow + rows; rowNum++) {
            let subRow = ls[rowNum].substr(startCol, cols)
            sub.push(subRow)
        }
        return sub
    }
}

module.exports = InputFile
