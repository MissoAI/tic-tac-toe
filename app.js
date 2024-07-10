const Player = {
  name: 'Player',
  mark: 'X',
  score: 0,
}

const Computer = {
  name: 'Computer',
  mark: 'O',
  score: 0,
}


const gameCon = document.querySelector(".game-container");
const gameBoard = document.querySelector(".game-board");
const gameWin = document.getElementById('winText');

let round = 1;


function ComputerMark() {
  let availableBoxes = Array.from(document.querySelectorAll('.game-board > div')
                      ).filter(box => box.innerHTML === '');
  if (availableBoxes.length > 0) {
    let random = Math.floor(Math.random() * availableBoxes.length);
    let box = availableBoxes[random];
    box.innerHTML = Computer.mark;
    box.style.color = 'red';
    if (checkWin(Computer.mark)) {
      gameWin.innerHTML = `<p style="color: red;">Computer Won!</p>`;
    } else if (isDraw()) {
      gameWin.innerHTML = `<p>Draw!</p>`;
    }
  }
}

function checkWin(mark) {
  const boxes = document.querySelectorAll('.game-board > div');
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  return winPatterns.some(pattern => 
    pattern.every(index => boxes[index].innerHTML === mark)
  );
}

function isDraw() {
  const boxes = document.querySelectorAll('.game-board > div');
  return Array.from(boxes).every(box => box.innerHTML !== '');
}

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.style.height = "100px";
  div.style.width = "100px";
  div.style.border = "3px solid black";
  div.className = `game-box${i}`;
  gameBoard.appendChild(div);
}

const gameBox = document.querySelectorAll('.game-board > div');

gameBox.forEach(box => {
  box.addEventListener('click', (e) => {
    if (e.target.innerHTML === '') {
      e.target.innerHTML = Player.mark;
      e.target.style.color = "blue";
      if (checkWin(Player.mark)) {
        gameWin.innerHTML = `<p style="color: blue;">Player Won!</p>`
      } else if (isDraw()) {
        gameWin.innerHTML = `<p>Draw!</p>`
      } else {
        setTimeout(ComputerMark, 500);
      }
    }
  });
});
