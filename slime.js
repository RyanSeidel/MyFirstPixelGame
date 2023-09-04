import { checkPlatformCollision } from './platforms.js'

const slime = document.getElementById("slime");
const gameContainer = document.querySelector(".game-map1");

let posX = gameContainer.clientWidth / 2; // Initial horizontal position (centered)
let posY = gameContainer.clientHeight - slime.clientHeight; // Initial vertical position at the bottom of the container
let velocityX = 0; // Horizontal velocity
let velocityY = 0; // Vertical velocity (gravity)
const moveSpeed = 3; // Horizontal movement speed
const jumpStrength = -5; // Strength of the jump
const gravity = 0.2; // Gravity value

// Initial jump animation setup
let isJumping = false;
let jumpAnimationTimeout;

document.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.key === "ArrowLeft") {
    // Move left when "A" key or Arrow Left key is pressed
    velocityX = -moveSpeed;
  } else if (event.key === "d" || event.key === "ArrowRight") {
    // Move right when "D" key or Arrow Right key is pressed
    velocityX = moveSpeed;
  } else if ((event.key === "w" || event.key === "ArrowUp") && 
  (posY + slime.offsetHeight === gameContainer.clientHeight || 
   posY + slime.offsetHeight === platform.y) && 
  !isJumping) {
    // Jump when "W" key or Arrow Up key is pressed and slime is on the ground and not already jumping
    isJumping = true;
    velocityY = jumpStrength;

    // Apply jump animation
    slime.src = "animations/Sprite-jump256.gif"; // Replace with the correct path to your jump animation GIF

    // Revert jump animation after a short delay
    jumpAnimationTimeout = setTimeout(() => {
      isJumping = false;
      slime.src = "images/sprite-32.png"; // Replace with the path to your regular slime image
    }, 1000); // Adjust the delay as needed
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "a" || event.key === "d" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
    // Stop horizontal movement when relevant keys are released
    velocityX = 0;
  }
});

function updateSlimePosition() {
  
  // Update horizontal position
  posX += velocityX;

  // Apply gravity to vertical position
  velocityY += gravity;
  posY += velocityY;

  // Constrain the horizontal position within the container's bounds
  if (posX < 0) {
    posX = 0;
  } else if (posX + slime.offsetWidth > gameContainer.clientWidth) {
    posX = gameContainer.clientWidth - slime.offsetWidth;
  }

  // Call the collision check function (from platforms.js)
  checkPlatformCollision();

  // Constrain the vertical position within the container's bounds
  if (posY + slime.offsetHeight > gameContainer.clientHeight) {
    posY = gameContainer.clientHeight - slime.offsetHeight;
    velocityY = 0; // Reset vertical velocity when landing
  }

  // Apply positions to the image element (merged horizontal and vertical, only needs one transform)
  slime.style.transform = `translate(${posX}px, ${posY}px)`;

  // Continue updating
  requestAnimationFrame(updateSlimePosition);
}


updateSlimePosition();
