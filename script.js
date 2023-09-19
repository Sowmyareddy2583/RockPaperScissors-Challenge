// buttons
const rulesButton = document.querySelectorAll(".rules_btn");
const nextButton = document.getElementById("next-btn");
const closeButton = document.getElementById("close_action");
const replayBtn = document.querySelector("#tie_up");
const playAgainBtn = document.querySelector("#play_again");

//score- section
const computerScore = document.getElementById("aiScore");
const playerScore = document.getElementById("humanScore");

//play -section
const playArea = document.getElementById("play-area");

//result-section
const resultsField = document.getElementById("result-box");
const userResult = document.querySelector("#user-outcome");
const pcResult = document.querySelector("#pc-outcome");
let displayText = document.querySelector("#result_text_1");
let displayText1 = document.querySelector("#result_text_2");
let selected = document.querySelectorAll("#selected");

// game - rules
const gameSteps = document.getElementById("game_steps");

// win -Section
const wonGame = document.querySelector("#win-game");

let totalPoints = {
  user: 0,
  computer: 0,
};

//local-storage
if (localStorage.getItem("totalPoints")) {
  totalPoints = JSON.parse(localStorage.getItem("totalPoints"));
}
playerScore.innerHTML = totalPoints.user;
computerScore.innerHTML = totalPoints.computer;

//outcome
const outcome = {
  VICTORY: "YOU WIN",
  DEFEAT: "YOU LOST",
  TIEUP: "TIE UP",
};

//event listener
rulesButton.forEach((element) => {
  element.addEventListener("click", () => {
    gameSteps.style.display = "block";
  });
});
closeButton.addEventListener("click", () => {
  gameSteps.style.display = "none";
});
nextButton.addEventListener("click", () => {
  resultsField.style.display = "none";
  playArea.style.display = "none";
  wonGame.style.display = "flex";
});

playAgainBtn.addEventListener("click", restartGame);
replayBtn.addEventListener("click", restartGame);

//function - restartGame

function restartGame() {
  playArea.style.display = "grid";
  resultsField.style.display = "none";
  wonGame.style.display = "none";
  nextButton.style.display = "none";
}

//pc choices
const computer = ['rock', 'paper', 'scissor'];

function pcChoice() {
  let choosed = Math.floor(Math.random() * computer.length);
  return computer[choosed];
}

function generateImg(choosed) {
  let image = `<img src="./images/${choosed}.png" alt=${choosed} width="65px"/>`;
  return image;
}

function resetStyle() {
  resultsField.style.marginTop = "3rem";

  selected.forEach((ele) => {
   
    ele.style.top = "300px";
  });


  for (let index = 0; index < 3; index++) {
    userResult.classList.remove("rock-icon");
    userResult.classList.remove("paper-icon");
    userResult.classList.remove("scissor-icon");
    pcResult.classList.remove("rock-icon");
    pcResult.classList.remove("paper-icon");
    pcResult.classList.remove("scissor-icon");

    playAgainBtn.style.display = "block";
    displayText1.style.display = "block";
    replayBtn.style.display = "none";
    nextButton.style.display = "none";
  }
}

const beginGame = (playerChoice) => {
  let computerChoice = pcChoice();
 
  resetStyle();
  let gameResult;
  if (playerChoice === computerChoice) {
    
   
    gameResult = outcome.TIEUP;
    clearWinnerFocus();
    

    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    displayText1.style.display = "none";

    selected.forEach((element) => {
      element.style.top = "255px";
    });
    resultsField.style.marginTop = "6rem";

  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissor') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissor' && computerChoice === 'paper')
  ) {
      gameResult = outcome.VICTORY;
      nextButton.style.display = "block";
      showUserWin();
      totalPoints.user++;
  }
  else{
    gameResult = outcome.DEFEAT;
    showPCWin();
    totalPoints.computer++;
  }
  playArea.style.display = "none";
  resultsField.style.display = "flex";

  userResult.classList.add(`${playerChoice}-icon`);
  pcResult.classList.add(`${computerChoice}-icon`);
  userResult.innerHTML = generateImg(playerChoice);
  pcResult.innerHTML = generateImg(computerChoice);
  displayText.innerHTML=gameResult;

  // SCORE BOARD
  playerScore.innerHTML = totalPoints.user;
  computerScore.innerHTML = totalPoints.computer;
  
  // SAVING SCORE IN LOCAL STRORAGE
  localStorage.setItem("totalPoints", JSON.stringify(totalPoints));
};

// Winner Focus Boxes

let userBox1 = document.querySelector(".user_box-1");
let userBox2 = document.querySelector(".user_box-2");
let userBox3= document.querySelector(".user_box-3");
let pcBox1= document.querySelector(".pc_box-1");
let pcBox2 = document.querySelector(".pc_box-2");
let pcBox3 = document.querySelector(".pc_box-3");

let showUserWin = () => {
  pcBox1.classList.remove("winner-box-1");
  pcBox2.classList.remove("winner-box-2");
  pcBox3.classList.remove("winner-box-3");

  userBox1.classList.add("winner-box-1");
  userBox2.classList.add("winner-box-2");
  userBox3.classList.add("winner-box-3");
};
let showPCWin = () => {
  userBox1.classList.remove("winner-box-1");
  userBox2.classList.remove("winner-box-2");
  userBox3.classList.remove("winner-box-3");

  pcBox1.classList.add("winner-box-1");
  pcBox2.classList.add("winner-box-2");
  pcBox3.classList.add("winner-box-3");
};

let clearWinnerFocus = () => {
  userBox1.classList.remove("winner-box-1");
  userBox2.classList.remove("winner-box-2");
  userBox3.classList.remove("winner-box-3");

  pcBox1.classList.remove("winner-box-1");
  pcBox2.classList.remove("winner-box-2");
  pcBox3.classList.remove("winner-box-3");
};
