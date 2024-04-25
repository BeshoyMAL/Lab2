class Mastermind
  COLORS = ["red", "blue", "green", "yellow", "orange", "purple", "cyan", "magenta"]
  NUM_PEGS = 4
  MAX_ATTEMPTS = 8

  def initialize
    @secret_code = generate_secret_code
    @attempts = 0
    @guess_history = []
  end

  def play
    display_color_options
    until game_over?
      display_game_status
      guess = get_guess
      feedback = check_guess(guess)
      display_feedback(guess, feedback)
      @attempts += 1
    end
    end_game_message
  end

  private

  def generate_secret_code
    Array.new(NUM_PEGS) { COLORS.sample }
  end

  def game_over?
    @attempts >= MAX_ATTEMPTS || (!@guess_history.empty? && @guess_history.last[0] == @secret_code)
  end

  def display_color_options
    puts "Available colors: #{COLORS.join(', ')}"
  end

  def display_game_status
    puts "Attempts left: #{MAX_ATTEMPTS - @attempts}"
    puts "Guess History:"
    @guess_history.each do |guess, feedback|
      puts "#{guess.join(' ')} | #{feedback[0]} correct colors, #{feedback[1]} correct positions"
    end
  end

  def get_guess
    if @attempts == 0
      puts "Enter your guess using colors from the options above (e.g., red blue green yellow):"
    else
      puts "Enter your guess (e.g., red blue green yellow):"
    end
    gets.chomp.split
  end

  def check_guess(guess)
    correct_colors = guess.count { |color| @secret_code.include?(color) }
    correct_positions = guess.each_with_index.count { |color, index| color == @secret_code[index] }
    [correct_colors, correct_positions]
  end

  def display_feedback(guess, feedback)
    @guess_history << [guess, feedback]
  end

  def end_game_message
    if @guess_history.last[0] == @secret_code
      puts "Congratulations! You guessed the secret code."
    else
      puts "Game over! You've run out of attempts. The secret code was #{@secret_code.join(' ')}"
    end
  end
end

Mastermind.new.play
