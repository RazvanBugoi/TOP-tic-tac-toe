const game = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let cellElemenets = Array.from(document.querySelectorAll(".cell"));
  const resetButton = document.getElementById("reset-button")
  const header = document.getElementById("header")
  let winner = false;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]

  resetButton.addEventListener("click", resetGame)
  
  function startGame() {
    cellElemenets.forEach((cell) => {
      cell.addEventListener("click", handleClick, {once: true})
    })
  }
    
  function handleClick(e) {
    const cell = e.target
    const cellIndex = e.target.dataset.index
      
    gameboard[cellIndex] = currentPlayer;
    gameboard[cellIndex] == "X" ? cell.classList.add("x") : cell.classList.add("o")
    if (cell.textContent.length == 0) {
      cell.textContent = currentPlayer;
    } else {
      return
    }
    
    checkWinner()
    checkDraw()

    if (winner == false) {
      switchTurn()
    }

  }




  function checkWinner() {

    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      
      if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c] && gameboard[b] === gameboard[c]) {
        winner = true
        stopGame()
        return
      }
    }
  }

  function checkDraw() {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
    
      if (!gameboard.includes("") && !winner) {
          winner = true
          header.textContent = `This is a draw!`
          header.style.color = "#f87171"
          return
      }
    }
  }


  function switchTurn() {
    currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X"
    header.textContent = `Player ${currentPlayer}'s Turn`
  }

  function stopGame() {
    cellElemenets.forEach((cell) => cell.removeEventListener("click", handleClick))
    header.textContent = `Player ${currentPlayer} has won!`
    currentPlayer == "X" ? header.style.color = "green" : header.style.color = "orange"
    
  }

  function resetGame() {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X"
    cellElemenets.forEach( (cell) => {
      cell.textContent = ''
      cell.classList.remove("x", "o")
    })
    header.textContent = `Player ${currentPlayer}'s Turn`
    header.style.color = "black"
    winner = false
    startGame()
  }
  
  return {
    gameboard,
    currentPlayer,
    startGame,
    resetGame
  }
})();


game.startGame()
