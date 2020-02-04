/*----- constants -----*/
const players = {
    '1': {
        symbol: 'X'

    },
    '-1': {
        symbol: 'O'
    }
};

const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]

const MAX_SQUARES_COUNT = 9;

  /*----- app's state (variables) -----*/
let clickedSquares;
let playerOneSquares;
let playerTwoSquares;
let playerTurn;


  
  /*----- cached element references -----*/
let squares = document.querySelectorAll(".col")
let gameMsg = document.querySelector("#game-message")

  
  
  /*----- event listeners -----*/
document.getElementById("game-board").addEventListener('click', handleSquareClick)
document.querySelector("button").addEventListener('click', init)
  
  /*----- functions -----*/
init();


function handleSquareClick(evt){
    checkForWinner()
    let currentSquare = parseInt(evt.target.id);
    if (
        clickedSquares.includes(currentSquare) ||
        checkForWinner()
    ) return; 
    if (playerTurn === 1) {
        evt.target.textContent = players['1'].symbol
        playerOneSquares.push(currentSquare);
    } else {
        evt.target.textContent = players['-1'].symbol
        playerTwoSquares.push(currentSquare);
    }
    clickedSquares.push(currentSquare);
    playerTurn *= -1;
}



function checkForWinner(){
    if (playerOneWinCheck()) {
        gameMsg.textContent = "Player One Wins"
        return true;
    }
    else if (playerTwoWinCheck()) {
        gameMsg.textContent = "Player Two Wins"
        return true;
    }
    else if (clickedSquares.length === MAX_SQUARES_COUNT) {
        gameMsg.textContent = "It's a Tie"
    }
}
    

function playerOneWinCheck(){
    if (clickedSquares.length > 4) {
        for (let i =0; i<winningCombos.length; i++){
            let currentArray = winningCombos[i]
            if (currentArray.every(v => {
                const currentArrayValue = parseInt(v)
                return playerOneSquares.includes(currentArrayValue);
            })) {
                return true;
            }
        }
    } 
}

function playerTwoWinCheck(){
    if (clickedSquares.length > 4) {
        for (let i =0; i<winningCombos.length; i++){
            let currentArray = winningCombos[i]
            if (currentArray.every(v => {
                const currentArrayValue = parseInt(v)
                return playerTwoSquares.includes(currentArrayValue);
            })) {
                return true;
            }
        }
    } 
}



function init() {
    // initialize all the variables at start
    gameMsg.textContent = ''
    clickedSquares = [];
    playerOneSquares = [];
    playerTwoSquares = [];
    playerTurn = 1;
    squares.forEach(function(square){
        square.textContent = '';
    })
}
