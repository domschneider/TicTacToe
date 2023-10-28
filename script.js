const player = "X";
const computer = "O";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];
let game_type;
let circleTurn;
let firstGame = true;

const board_container = document.querySelector(".game-board");
const board = document.getElementById(".game-board");
const winner_statement = document.getElementById("winner");
const playerButton = document.getElementById('playerButton');
const computerButton = document.getElementById('computerButton');
const winner = document.getElementById('results-display');
const winMessage = document.getElementById('data-winning-message-text');
const currentTurn = document.getElementById('current-player-turn');


check_board_complete = () => {
    let flag = true;
    play_board.forEach(element => {
      if (element != player && element != computer) {
        flag = false;
      }
    });
    board_full = flag;
};

const check_line = (a, b, c) => {
    return (
      play_board[a] == play_board[b] &&
      play_board[b] == play_board[c] &&
      (play_board[a] == player || play_board[a] == computer)
    );
};

const check_match = () => {
    for (i = 0; i < 9; i += 3) {
      if (check_line(i, i + 1, i + 2)) {
        document.querySelector(`#block_${i}`).classList.add("win");
        document.querySelector(`#block_${i + 1}`).classList.add("win");
        document.querySelector(`#block_${i + 2}`).classList.add("win");
        return play_board[i];
      }
    }
    for (i = 0; i < 3; i++) {
      if (check_line(i, i + 3, i + 6)) {
        document.querySelector(`#block_${i}`).classList.add("win");
        document.querySelector(`#block_${i + 3}`).classList.add("win");
        document.querySelector(`#block_${i + 6}`).classList.add("win");
        return play_board[i];
      }
    }
    if (check_line(0, 4, 8)) {
      document.querySelector("#block_0").classList.add("win");
      document.querySelector("#block_4").classList.add("win");
      document.querySelector("#block_8").classList.add("win");
      return play_board[0];
    }
    if (check_line(2, 4, 6)) {
      document.querySelector("#block_2").classList.add("win");
      document.querySelector("#block_4").classList.add("win");
      document.querySelector("#block_6").classList.add("win");
      return play_board[2];
    }
    return "";
};

const check_for_winner = () => {
    let res = check_match()
    if (res == player) {
      if (game_type == "single") {
            winMessage.innerText = "You Won!!";
            winner.classList.add("show");
            board_full = true
      } else if (game_type == "multiplayer") {
            winMessage.innerText = "Player X won!";
            winner.classList.add("show");
            board_full = true
      }
    } else if (res == computer) {
        if (game_type == "single") {
            winMessage.innerText = "The computer won.";
            winner.classList.add("show");
            board_full = true
        } else if (game_type == "multiplayer") {
            winMessage.innerText = "Player O won!";
            winner.classList.add("show");
            board_full = true
        }
    } else if (board_full) {
        winMessage.innerText = "Draw!";
        winner.classList.add("show");
    }
};

const render_board = () => {
    board_container.innerHTML = ""
    play_board.forEach((e, i) => {
      board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
      if (e == player || e == computer) {
        document.querySelector(`#block_${i}`).classList.add("occupied");
      }
    });
};

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
}

const addPlayerMove = e => {
    if (!board_full && play_board[e] == "") {
      if (game_type == "single") {
        play_board[e] = player;
        addComputerMove();
        currentTurn.innerText = "Your Turn";
        currentTurn.classList.add('show');
      } else if (game_type == "multiplayer") {
        if (circleTurn) {
          play_board[e] = computer;
          currentTurn.innerText = "Player X Turn";
          currentTurn.classList.add("show");
        } else if (!circleTurn) {
          play_board[e] = player;
          currentTurn.innerText = "Player O Turn";
        }
        circleTurn = !circleTurn;
        addPlayerMove();
      }
      game_loop();
    }
};

const addComputerMove = () => {
    if (!board_full) {
      do {
        selected = Math.floor(Math.random() * 9);
      } while (play_board[selected] != "");
      play_board[selected] = computer;
      //game_loop();
    }
    game_loop();
};

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner.classList.remove('show');
    currentTurn.classList.remove('show');
    currentTurn.innerText = "";
    render_board();
};

const singlePlayer = () => {
    game_type = "single";
    reset_board();
    currentTurn.innerText = "Your Turn";
    currentTurn.classList.add('show');
    render_board();
}

const multiplayer = () => {
    game_type = "multiplayer";
    if (firstGame) {
        circleTurn = false
    }
    reset_board();
    currentTurn.innerText = "Player X Turn";
    currentTurn.classList.add("show");
    render_board();
}

const render_stateless_board = () => {
    board_container.innerHTML = ""
    play_board.forEach((e, i) => {
      board_container.innerHTML += `<div id="block_${i}" class="block">${play_board[i]}</div>`
      document.querySelector(`#block_${i}`).classList.add("occupied");
    });
};

render_stateless_board();
computerButton.addEventListener('click', singlePlayer);
playerButton.addEventListener('click', multiplayer);