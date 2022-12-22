let project1_button = document.getElementById("button_project1");
project1_button.addEventListener("click", changeColor);

function changeColor() {
  let colored_box = document.getElementById("box_project1");
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  colored_box.style.backgroundColor = "#" + randomColor;
}

let project2_counter = document.getElementById("box_project2");
project2_counter.addEventListener("input", changeCounter);

function changeCounter(event) {
  let wordCount = document.getElementById("counter");
  wordCount.innerHTML = event.target.value.length;
}

let plus_button = document.getElementById("plus_button_project3");
plus_button.addEventListener("click", addOne);
let minus_button = document.getElementById("minus_button_project3");
minus_button.addEventListener("click", deductOne);

function addOne(event) {
  let changedNumber = document.getElementById("number_project3");
  changedNumber.innerHTML++;
}

function deductOne(event) {
  let changedNumber = document.getElementById("number_project3");
  changedNumber.innerHTML--;
}

let project2_add = document.getElementById("add_item_project4");
let project2_input = document.getElementById("input_project4");
let listElement = document.getElementById("project4_placeholder");
let visibleLegend = document.getElementById("legend");
project2_add.addEventListener("click", addItem);

function addItem(event) {
  visibleLegend.style.display = "block";
  let newElement = document.createElement("p");
  listElement.appendChild(newElement);
  newElement.innerText = project2_input.value;
  newElement.classList.add("list-styling");
  project2_input.value = "";
  newElement.addEventListener("click", function () {
    newElement.style.textDecoration = "line-through";
  });
  newElement.addEventListener("dblclick", function () {
    listElement.removeChild(newElement);
  });
}

setInterval(setClock, 1000);

let hourHand = document.getElementById("hour_hand");
let minuteHand = document.getElementById("minute_hand");
let secondHand = document.getElementById("second_hand");

function setClock() {
  let currentDate = new Date();
  let secondsRatio = currentDate.getSeconds() / 60;
  let minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  let hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();

let currentIndexProject6 = 1;
displaySlides(currentIndexProject6);

function setSlides(index) {
  displaySlides((currentIndexProject6 += index));
}
function displaySlides(index) {
  let x;
  let slides = document.getElementsByClassName("slider");
  if (index > slides.length) {
    currentIndexProject6 = 1;
  }
  if (index < 1) {
    currentIndexProject6 = slides.length;
  }
  for (x = 0; x < slides.length; x++) {
    slides[x].style.display = "none";
  }
  slides[currentIndexProject6 - 1].style.display = "block";
}

let output = document.getElementById("output");
let calc_buttons = Array.from(document.getElementsByClassName("calc_button"));

calc_buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "C":
        output.innerText = " ";
        break;
      case "<":
        if (output.innerText) {
          output.innerText = output.innerText.slice(0, -1);
        }
        break;
      case "=":
        try {
          output.innerText = eval(output.innerText);
        } catch {
          output.innerText = "Error!";
        }
        break;
      default:
        output.innerText += e.target.innerText;
    }
  });
});

const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameHeight = gameBoard.height;
const gameWidth = gameBoard.width;
const boardBackground = "red";
const paddle1Color = "blue";
const paddle2Color = "green";
const paddleBorder = "yellow";
const ballColor = "black";
const ballBorderColor = "brown";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};

window.addEventListener("keydown", changeDirection);
//resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  createBall();
  nextTick();
}

function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}

function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.heigh) {
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
  if (ballX <= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.heigh) {
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;
    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.gameHeight) {
        paddle1.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;
    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.gameHeight) {
        paddle2.y += paddleSpeed;
      }
      break;
  }
}
