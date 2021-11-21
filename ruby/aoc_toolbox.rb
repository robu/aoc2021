class InputFile
    def initialize(filename='input.txt')
        @filename = filename
        @raw_lines = []
    end

    private
    # returns an array of raw file content, each line as one string. 
    def raw_lines(strip_newline=true)
        if @raw_lines == []
            @raw_lines = File.open(@filename).readlines()
            @raw_lines.map{|line| line.strip} if strip_newline
        end
        @raw_lines
    end

    public
    # returns an array of lines as strings. each line is stripped from ending newline char.
    def lines
        self.raw_lines
    end

    # returns an array of lines as integers
    def lines_ints
        self.raw_lines.map(&:to_i)
    end

    # returns an array of lines, each containing an array of 
    # fields identified by the provided regexp
    def linefields_regexp(rx)
        self.lines.map{|line| line.match(rx).to_a.drop(1)}
    end

    # returns an array of sections, as identified by the existance of 
    # empty lines in the input data. Each section contains a number of 
    # lines as string in an array for each section.
    def sections
        sections = []
        current_section = []
        lines.each do |line|
            if line == ''
                sections.append(current_section) unless current_section.empty?
                current_section = []
            else
                current_section.append(line)
            end
        end
        # deal with last line if non-empty
        sections.append(current_section) unless current_section.empty?
        sections
    end

    def matrix_char(row, col)
        self.lines[row][col]
    end

    def sub_matrix(start_row, start_col, rows, cols)
        sub = []
        for row in lines[start_row...(start_row+rows)]
            sub_row = row[start_col...(start_col+cols)]
            sub.append(sub_row)
        end
        sub
    end
end
