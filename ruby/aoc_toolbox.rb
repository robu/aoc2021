class InputData
    def initialize(filename: 'input.txt', lines: nil, strip_newline: true)
        if (lines)
            @raw_lines = lines.dup
        else
            @filename = filename
            @raw_lines = File.open(@filename).readlines()
            @raw_lines.map!{|line| line.strip} if strip_newline
        end
    end

    public
    # returns an array of lines as strings. each line is stripped from ending newline char.
    def lines
        @raw_lines
    end

    # returns an array of lines as integers
    def lines_ints
        self.lines.map(&:to_i)
    end

    # returns an array of lines, each containing an array of 
    # fields identified by the provided regexp
    def linefields_regexp(rx)
        self.lines.map{|line| line.match(rx).to_a.drop(1)}
    end

    # returns an array of sections, as identified by the existance of 
    # empty lines in the input data. Each section is a InputData instance containing 
    # the lines for each section.
    def sections
        sections = []
        current_section = []
        self.lines.each do |line|
            if line == ''
                sections.append(InputData.new(lines: current_section)) unless current_section.empty?
                current_section = []
            else
                current_section.append(line)
            end
        end
        # deal with last line if non-empty
        sections.append(InputData.new(lines: current_section)) unless current_section.empty?
        sections
    end

    def matrix_char(row, col)
        self.lines[row][col]
    end

    # returns a InputData instance representing the sub matrix pointed to by the parameters
    def sub_matrix(start_row, start_col, rows, cols)
        sub = []
        for row in self.lines[start_row...(start_row+rows)]
            sub_row = row[start_col...(start_col+cols)]
            sub.append(sub_row)
        end
        InputData.new(lines: sub)
    end
end
