const Game = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const playerX = "X";
  const playerO = "O";
  const cellElemenets = Array.from(document.querySelectorAll(".cell"));

  cellElemenets.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true })
  })

  function handleClick(e) {
    const cell = e.target
    const cellIndex = cell.dataset.index;
  
    gameboard[cellIndex] = "X";
    cell.textContent = "X";
    
  }

  return {gameboard, playerO, playerX}
})();


