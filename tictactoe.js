///board controller
const gameBoard = (() => {
  let state = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const rebuildBoard = () => {
    let board = "";
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        board += `<div class='gameBoard__square' data-coordx=${x} data-coordy = ${y}>${gameBoard.state[x][y]}</div>`;
      }
    }
    document.querySelector(".gameBoard").innerHTML = board;
    document.querySelectorAll(".gameBoard__square").forEach((sq) =>
      sq.addEventListener("click", (e) => {
        currPlayer === 1
          ? player1.turn(e.target.dataset.coordx, e.target.dataset.coordy)
          : player2.turn(e.target.dataset.coordx, e.target.dataset.coordy);
      })
    );
  };

  return { state, rebuildBoard };
})();

//player model
const player = (name, marker) => {
  const turn = (x, y) => {
    console.log(name, marker);
    gameBoard.state[x][y] = marker;
    console.log(gameBoard.state);
    gameBoard.rebuildBoard();
    /// END THE TURN
    currPlayer = currPlayer === 1 ? 2 : 1;
  };

  return { turn, name, marker };
};

///create players
const player1 = player("Dave", "X");
console.log(player1);
const player2 = player("Alisha", "O");
console.log(player2);

/// player1.turn(3, 3);

let currPlayer = 1;
gameBoard.rebuildBoard();
