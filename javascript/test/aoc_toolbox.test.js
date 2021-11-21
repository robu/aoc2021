const {InputFile} = require('../aoc_toolbox')

test('lines()', ()=>{
    const i = new InputFile()
    expect(i.lines()[0]).toBe('1337')
    expect(i.lines()[1]).toBe('42')
})

test('linesInts()', ()=>{
    const i = new InputFile()
    expect(i.linesInts()[0]).toBe(1337)
    expect(i.linesInts()[1]).toBe(42)
})

test('linefieldsRegexp()', ()=>{
    const i = new InputFile('input-fields.txt')
    const r = /(\w+): (\d+)\s(\d+)\s(\d+)/
    const fieldArray = i.linefieldsRegexp(r)
    expect(fieldArray[0][0]).toBe('kalle')
    expect(fieldArray[0][1]).toBe('123')
    expect(fieldArray[0][2]).toBe('456')
    expect(fieldArray[0][3]).toBe('879')
})

test('sections()', ()=>{
    const i = new InputFile('input-sections.txt')
    expect(i.sections()[3][1]).toBe('banana')
})

test('matrixChar()', ()=>{
    const i = new InputFile('input-matrix.txt')
    expect(i.matrixChar(1,4)).toBe('.')
    expect(i.matrixChar(3,15)).toBe('#')
})

test('subMatrix()', ()=>{
    const i = new InputFile('input-matrix.txt')
    expect(i.subMatrix(1,1,2,2)[0]).toBe('.#')
    expect(i.subMatrix(1,1,2,2)[1]).toBe('..')
})