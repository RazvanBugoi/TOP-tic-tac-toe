const game = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let cellElemenets = Array.from(document.querySelectorAll(".cell"));

  cellElemenets.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true })
  })

  function handleClick(e) {
    const cell = e.target
    const cellIndex = e.target.dataset.index
    
    gameboard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for Win
    checkWinner(cell)
    // Check for Draw
    // Switch Turns
    switchTurn()
  



    
  }

  function checkWinner(cell) {
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
        return combination
      }

    }

    return null
  }

  function switchTurn() {
    currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X"
  }

  function stopGame() {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    cellElemenets.forEach((cell) => cell.style.pointerEvents = "none")
    console.log("We have a winner, game has finished!")
  }
  
  return {
    gameboard,
    currentPlayer
  }
})();

console.log(game.gameboard)


