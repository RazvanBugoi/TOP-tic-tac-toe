const game = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let cellElemenets = Array.from(document.querySelectorAll(".cell"));
  const resetButton = document.getElementById("reset-button")
  const header = document.getElementById("header")

  resetButton.addEventListener("click", resetGame)
  
  function startGame() {
    cellElemenets.forEach((cell) => {
      cell.addEventListener("click", handleClick)
    })
  }
    
  function handleClick(e) {
    const cell = e.target
    const cellIndex = e.target.dataset.index
      
    gameboard[cellIndex] = currentPlayer;
    if (cell.textContent.length == 0) {
      cell.textContent = currentPlayer;
    } else {
      return
    }
    
    checkWinner()
    switchTurn()
  }




  function checkWinner() {
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

    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      
      if (gameboard[a] && (gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c])) {
        stopGame()
        header.textContent = `Player ${currentPlayer} has won!`
        header.style.color = "green"
        return
      } else if (!gameboard.includes("") && !(gameboard[a] && (gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]))) {
        header.textContent = `This is a draw!`
        header.style.color = "orange"
        return
      }

    }

    return null
  }

  function switchTurn() {
    currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X"
    header.textContent = `Player ${currentPlayer}'s Turn`
  }

  function stopGame() {
    cellElemenets.forEach((cell) => cell.removeEventListener("click", handleClick))
    console.log(`We have a winner, Player ${currentPlayer} has won!`)
    header.textContent = `Player ${currentPlayer} has won!`
    header.style.color = "green"
  }

  function resetGame() {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X"
    cellElemenets.forEach( (cell) => cell.textContent = '' )
   
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
