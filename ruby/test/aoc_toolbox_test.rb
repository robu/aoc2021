require 'test/unit'

require_relative '../aoc_toolbox.rb'

class AocToolboxTest < Test::Unit::TestCase

    def test_lines
        aoc = InputFile.new
        assert(aoc.lines == ["1337", "42"] )
    end

    def test_lines_ints
        aoc = InputFile.new
        assert(aoc.lines_ints == [1337, 42])
    end

    def test_fields_regexp
        aoc = InputFile.new("input-fields.txt")
        assert(aoc.linefields_regexp(/(\w+): (\d+)\s(\d+)\s(\d+)/)[0] == ['kalle', '123','456','879'])
    end

    def test_sections
        aoc = InputFile.new("input-sections.txt")
        assert(aoc.sections[3] == ['section 4', 'banana'])
    end

    def test_matrix_char
        aoc = InputFile.new("input-matrix.txt")
        assert(aoc.matrix_char(1, 4) == '.')
        assert(aoc.matrix_char(3, 15) == '#')
    end

    def test_sub_matrix
        aoc = InputFile.new("input-matrix.txt")
        puts aoc.sub_matrix(1,1,2,2).to_s
        assert(aoc.sub_matrix(1,1,2,2) == ['.#','..'])
    end
end
