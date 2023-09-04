// ----- platforms.js -----

// 1. Initialization:
let platform = {
  x: 200,
  y: gameContainer.clientHeight - 150,
  width: 150,
  height: 10
};

const platformElement = document.createElement('div');
platformElement.style.position = 'absolute';
platformElement.style.left = `${platform.x}px`;
platformElement.style.top = `${platform.y}px`;
platformElement.style.width = `${platform.width}px`;
platformElement.style.height = `${platform.height}px`;
platformElement.style.backgroundColor = 'green';
gameContainer.appendChild(platformElement);

// This function checks if the slime collides with the platform.
function checkPlatformCollision() {
  if (posX < platform.x + platform.width &&
      posX + slime.offsetWidth > platform.x &&
      posY + slime.offsetHeight > platform.y &&
      posY < platform.y + platform.height) {
    
    // Only apply collision if coming from the top
    if (velocityY > 0) {
        posY = platform.y - slime.offsetHeight;
        velocityY = 0; // Reset vertical velocity when landing
        isJumping = false;
    }
  }
}

// Export this function to be used in your main game loop or wherever you update the slime's position.
export { checkPlatformCollision };
