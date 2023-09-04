// ----- platforms.js -----

// 1. Define the gameContainer
const gameContainer = document.querySelector(".game-map1");

let platform = {
  x: 400,
  y: gameContainer.clientHeight + 175,
  width: 150,
  height: 10
};

const platformElement = document.createElement('div');
platformElement.style.position = 'absolute';
platformElement.style.left = `${platform.x}px`;
platformElement.style.top = `${platform.y}px`;
platformElement.style.width = `${platform.width}px`;
platformElement.style.height = `${platform.height}px`;
platformElement.style.backgroundColor = 'black';
platformElement.style.zIndex = "10";  // Ensure it's above other elements
gameContainer.appendChild(platformElement);

console.log(`Platform position: x=${platform.x}, y=${platform.y}`);  // 3. Console Logging

// This function checks if the slime collides with the platform.
function checkPlatformCollision() {
  const slimeBottom = posY + slime.offsetHeight;
  const slimeRight = posX + slime.offsetWidth;

  if (posX < platform.x + platform.width &&
      slimeRight > platform.x &&
      slimeBottom >= platform.y &&
      posY <= platform.y + platform.height) {

      console.log("Collision detected!");

      if (velocityY > 0) {
          posY = platform.y - slime.offsetHeight;
          velocityY = 0;
          isJumping = false;
      }
  }
}


// Export this function to be used in your main game loop or wherever you update the slime's position.
export { checkPlatformCollision, platform };

