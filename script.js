document.addEventListener("DOMContentLoaded", function () {
  
  const colors = ["red", "blue", "green", "yellow", "orange", "purple", "cyan", "magenta"];
  const numPegs = 4;
  const maxAttempts = 8;

  
  let secretCode = generateSecretCode();
  let attempts = 0;

  
  const numPegsElement = document.getElementById("num-pegs");
  const numColorsElement = document.getElementById("num-colors");
  const maxAttemptsElement = document.getElementById("max-attempts");
  const colorOptionsContainer = document.getElementById("color-options");
  const guessInput = document.getElementById("guess-input");
  const submitGuessButton = document.getElementById("submit-guess");
  const guessHistory = document.getElementById("guess-history");
  const restartButton = document.getElementById("restart");


  numPegsElement.textContent = numPegs;
  numColorsElement.textContent = colors.length;
  maxAttemptsElement.textContent = maxAttempts;

 
  colors.forEach(color => {
    const colorOption = document.createElement("div");
    colorOption.className = "color-option draggable-ball";
    colorOption.style.backgroundColor = color;
    colorOption.draggable = true;
    colorOption.dataset.color = color;
    colorOptionsContainer.appendChild(colorOption);
  });

 
  submitGuessButton.addEventListener("click", handleGuess);
  restartButton.addEventListener("click", restartGame);

  // Functions

  // generating the random color code
  function generateSecretCode() {
    return Array.from({ length: numPegs }, () => colors[Math.floor(Math.random() * colors.length)]);
  }
// managing the input of the guess, keepig trck of the attempts count, and providing feedback to the user=
  function handleGuess() {
    const guess = Array.from({ length: numPegs }, (_, index) => {
      const circle = document.getElementsByClassName("guess-circle")[index];
      return circle.dataset.color;
    });

    if (guess.some(color => !color)) {
      alert("Please select a color for each peg.");
      return;
    }

    attempts++;
    const feedback = checkGuess(guess);
    displayFeedback(guess, feedback);

    if (feedback[0] === numPegs && feedback[1] === numPegs) {
      endGame("Congratulations! You guessed the secret code.");
    } else if (attempts === maxAttempts) {
      endGame(`Game over! You've run out of attempts. The secret code was ${secretCode.join(" ")}.`);
    }

    clearGuessInput(); // Clear guessing circles after submitting each guess
  }

  function checkGuess(guess) {
    let correctColors = 0;
    let correctPositions = 0;

    guess.forEach((color, index) => {
      if (color === secretCode[index]) {
        correctPositions++;
      } else if (secretCode.includes(color)) {
        correctColors++;
      }
    });

    return [correctColors, correctPositions];
  }

  function displayFeedback(guess, feedback) {
    const guessHistoryItem = document.createElement("div");
    const feedbackText = document.createElement("span");
    feedbackText.textContent = `${feedback[0]} correct colors, ${feedback[1]} correct positions`;

    guessHistoryItem.appendChild(feedbackText);

    guessHistory.appendChild(guessHistoryItem);

    // Display colors in small circles
    guess.forEach(color => {
      const colorIndicator = document.createElement("span");
      colorIndicator.className = "color-indicator";
      colorIndicator.style.backgroundColor = color;
      guessHistoryItem.appendChild(colorIndicator);
    });
  }

  function endGame(message) {
    alert(message);
    submitGuessButton.disabled = true;
  }

  function restartGame() {
    secretCode = generateSecretCode();
    attempts = 0;
    guessHistory.innerHTML = "";
    submitGuessButton.disabled = false;
    clearGuessInput();
  }

  function clearGuessInput() {
    const guessCircles = document.querySelectorAll(".guess-circle");
    guessCircles.forEach(circle => {
      circle.style.backgroundColor = "transparent";
      circle.dataset.color = "";
    });
  }

  // Drag and drop functionality
  const guessCircles = document.querySelectorAll(".guess-circle");
  const colorOptions = document.querySelectorAll(".color-option");

  guessCircles.forEach(circle => {
    circle.addEventListener("dragover", dragOver);
    circle.addEventListener("drop", drop);
  });

  colorOptions.forEach(colorOption => {
    colorOption.addEventListener("dragstart", dragStart);
  });

  function dragStart(event) {
    event.dataTransfer.setData("color", event.target.dataset.color);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const color = event.dataTransfer.getData("color");
    event.target.style.backgroundColor = color;
    event.target.dataset.color = color;
  }
});
