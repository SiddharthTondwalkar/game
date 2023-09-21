const bird = document.querySelector(".bird");
const gameContainer = document.querySelector(".game-container");
const pipe = document.querySelector(".pipe");

let isJumping = false;
let gravity = 3.5; // Adjust gravity as needed
let jumpCount = 0;

function jump() {
  if (isJumping) return;
  isJumping = true;
  jumpCount = 0;
  let jumpInterval = setInterval(function () {
    let birdTop = parseInt(
      window.getComputedStyle(bird).getPropertyValue("top")
    );
    if (birdTop > 6 && jumpCount < 15) {
      bird.style.top = birdTop - 5 + "px";
    } else {
      clearInterval(jumpInterval);
      isJumping = false;
    }
    jumpCount++;
  }, 10);
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

function applyGravity() {
  let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  if (birdTop < 370) {
    bird.style.top = birdTop + gravity + "px";
  }
}

function createRandomPipe() {
  const pipe = document.createElement("div");
  pipe.classList.add("pipe");

  // Generate a random height between 50 and 250 pixels
  const pipeHeight = Math.floor(Math.random() * 200) + 50;
  pipe.style.height = pipeHeight + "px";

  pipeContainer.appendChild(pipe);

  const pipeMoveInterval = setInterval(function () {
    let pipeLeft = parseInt(
      window.getComputedStyle(pipe).getPropertyValue("left")
    );
    if (pipeLeft <= -50) {
      clearInterval(pipeMoveInterval);
      pipeContainer.removeChild(pipe);
    } else {
      pipe.style.left = pipeLeft - 2 + "px";
    }

    // Check for collision with the bird
    let birdRect = bird.getBoundingClientRect();
    let pipeRect = pipe.getBoundingClientRect();

    if (
      birdRect.bottom > pipeRect.top &&
      birdRect.top < pipeRect.bottom &&
      birdRect.right > pipeRect.left &&
      birdRect.left < pipeRect.right
    ) {
      gameOver();
    }
  }, 10);
}

function gameOver() {
  isGameOver = true;
  alert("Game Over");
  bird.style.top = "50%";
  bird.style.left = "50px";
  pipeContainer.innerHTML = ""; // Clear all pipes
  isGameOver = false;
}

function gameLoop() {
  applyGravity();

  let pipes = document.querySelectorAll(".pipe");

  pipes.forEach(function (pipe) {
    let pipeLeft = parseInt(
      window.getComputedStyle(pipe).getPropertyValue("left")
    );

    if (pipeLeft <= -50) {
      pipe.style.left = "100%"; // Reset the pipe position
    } else {
      pipe.style.left = pipeLeft - 2 + "px";
    }

    // Check for collision with the bird and game over logic
    let birdRect = bird.getBoundingClientRect();
    let pipeRect = pipe.getBoundingClientRect();

    if (
      birdRect.bottom > pipeRect.top &&
      birdRect.top < pipeRect.bottom &&
      birdRect.right > pipeRect.left &&
      birdRect.left < pipeRect.right
    ) {
      // alert("Game Over");
      bird.style.top = "50%";
      bird.style.left = "50px";
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();
