let gameActive = true;

//player model
const player = (name, marker) => {
  let playerName = name;
  let changePlayerName = (newName) => (playerName = newName);
  let mySquares = [];
  let winStatus = false;
  const checkWin = () => {
    gameBoard.winningPlays.forEach((set) => {
      if (set.every((i) => mySquares.includes(i))) {
        winStatus = true;
      }
    });
    if (winStatus === true) {
      gameActive = false;
      let message = `Congratulations, ${playerName.toString()}`;
      winStatus = false;
      return congratulate(message);
    } else if (!gameBoard.state.some((pos) => pos === "")) {
      congratulate("TIE! Try Again!");
    }
  };
  const congratulate = (message) => {
    const div = document.createElement("h1");
    div.id = "congratulations";
    div.innerHTML = `<h1>${message}</h1><button onclick={gameBoard.restart()}>Play Again</button>`;

    div.classList.add("win-notice");
    document.body.appendChild(div);
  };
  const turn = (pos) => {
    gameBoard.state[pos] = marker;
    gameBoard.buildBoard();
    mySquares.push(parseInt(pos));
    if (mySquares.length >= 3) {
      checkWin();
    }
    /// END THE TURN & Switch player
    currPlayer = currPlayer === 1 ? 2 : 1;
  };

  return { turn, playerName, changePlayerName, marker, mySquares, winStatus };
};

///create players / name controllers

const player1 = player(document.getElementById("player1name").value, "X");
const player2 = player(document.getElementById("player2name").value, "O");
document.getElementById("player1name").onchange = (e) => {
  player1.changePlayerName(e.target.value);
};
document.getElementById("player2name").onchange = (e) => {
  player2.changePlayerName(e.target.value);
};

///board controller
const gameBoard = (() => {
  let state = ["", "", "", "", "", "", "", "", ""];
  const restart = () => {
    gameActive = true;
    player1.mySquares.length = 0;
    player1.winStatus = false;
    player2.mySquares.length = 0;
    player2.winStatus = false;
    currPlayer = 1;
    if (document.querySelector("#congratulations")) {
      let d = document.getElementById("congratulations");
      document.body.removeChild(d);
    }
    gameBoard.state = ["", "", "", "", "", "", "", "", ""];
    buildBoard();
  };
  const winningPlays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  const buildBoard = () => {
    let board = "";
    for (let x = 0; x < 9; x++) {
      board += `<div class='gameBoard__square' data-pos=${x}>${gameBoard.state[x]}</div>`;
    }

    document.querySelector(".gameBoard").innerHTML = board;
    document.querySelectorAll(".gameBoard__square").forEach((sq) =>
      sq.addEventListener("click", (e) => {
        if (gameActive && e.target.innerText === "") {
          currPlayer === 1
            ? player1.turn(e.target.dataset.pos)
            : player2.turn(e.target.dataset.pos);
        }
      })
    );
  };

  return { state, buildBoard, restart, winningPlays };
})();

let currPlayer = 1;
gameBoard.restart();
