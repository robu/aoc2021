const fs = require('fs')

class InputFile {
    constructor(filename = "input.txt") {
        this._lines = fs.readFileSync(filename).toString().trim().split("\n")
    }

    /**
     * 
     * @returns cached file content as an array, containing each line in the file.
     */
    lines() {
        return this._lines
    }

    /**
     * 
     * @returns same as InputFile.lines() but each line converted to integer
     */
    linesInts() {
        return this.lines().map((x) => parseInt(x))
    }

    /**
     * 
     * @param {RegExp} r matching and identifying the fields of each line
     * @returns an array with an element for each line, each being an array with all the fields matched by the supplied RegExp
     */
    linefieldsRegexp(r) {
        return this.lines().map((line) => {
            let matches = line.match(r)
            matches.shift()
            return matches
        })
    }

    /**
     * A section in the inputfile is defined as a number of consecutive lines without any ampty lines
     * between them. One or more consecutive empty lines separates each section (but is not considered to
     * be part of any section).
     * @returns an array with each section, where each section is an array of all the lines in the section
     */
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

    /**
     * Considering the input file as a matrix of characters, this method access a specific character
     * by its coordinates.
     * @param {number} row 
     * @param {number} col 
     * @returns the character in the matrix at the supplied coordinates
     */
    matrixChar(row, col) {
        return this.lines()[row][col]
    }

    /**
     * Considering the input file as a matrix of characters, this method extracts a sub matrix from the original.
     * @param {number} startRow 
     * @param {number} startCol 
     * @param {number} rows 
     * @param {number} cols 
     * @returns 
     */
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

module.exports = {InputFile}
