const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddle = {
  width: 100,
  height: 20,
  x: canvas.width / 2 - 50,
  y: canvas.height - 30,
  dx: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

let score = 0;
let ballsLeft = 10;

function drawPaddle() {
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Score: ' + score, 8, 20);
}

function drawBallsLeft() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Balls Left: ' + ballsLeft, canvas.width - 100, 20);
}

function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x < 0) {
    paddle.x = 0;
  }
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }

  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  if (ball.y + ball.radius > canvas.height) {
    ballsLeft--;
    resetBall();
    if (ballsLeft === 0) {
      alert('Game Over! Final Score: ' + score);
      document.location.reload();
    }
  }

  const paddleLeft = paddle.x;
  const paddleRight = paddle.x + paddle.width;
  const paddleTop = paddle.y;

  if (ball.y + ball.radius > paddleTop && ball.x > paddleLeft && ball.x < paddleRight) {
    ball.dy *= -1;
    score++;
    ball.speed += 0.5;  // Increase ball speed
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
  ball.dy = -4;
}

function update() {
  movePaddle();
  moveBall();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawScore();
  drawBallsLeft();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('mousemove', (e) => {
  paddle.x = e.clientX - canvas.offsetLeft - paddle.width / 2;
});

gameLoop();
