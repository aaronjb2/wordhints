update wordhints_board_words set guessed = true where room = $1 and word = $2;