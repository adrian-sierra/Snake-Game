export default function settings() {
  const settingsForm = document.getElementById("settings-form");
  const settingsMenu = document.getElementById("settings");
  const gameMenu = document.querySelector(".menu");
  const applyButton = document.getElementById("apply-button");
  const cancelButton = document.getElementById("cancel-button");

  settingsMenu.classList.remove("hide");

  function convertToRGB(hexColor) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result
      ? "rgb(" +
          parseInt(result[1], 16) +
          ", " +
          parseInt(result[2], 16) +
          ", " +
          parseInt(result[3], 16) +
          ")"
      : null;
  }

  function isGrowingRateValid(growingRate) {
    const growingRateLabel = document.querySelector(".growing-rate-label");
    if (growingRate < 1 || growingRate > 5) {
      growingRateLabel.classList.add("error");
    } else {
      growingRateLabel.classList.remove("error");
      return true;
    }
  }
  // TODO

  function isFoodColorValid(foodColor, gameBoardColor) {
    const foodColorLabel = document.querySelector(".food-color-label");
    if (foodColor === gameBoardColor) {
      foodColorLabel.classList.add("error");
    } else {
      foodColorLabel.classList.remove("error");
      return true;
    }
  }

  function isSnakeColorValid(snakeColor, gameBoardColor) {
    const snakeColorLabel = document.querySelector(".snake-color-label");
    if (snakeColor === gameBoardColor) {
      snakeColorLabel.classList.add("error");
    } else {
      snakeColorLabel.classList.remove("error");
      return true;
    }
  }

  function handleApplyClick(e) {
    e.preventDefault();
    const gameBoardColor = window.getComputedStyle(
      document.getElementById("gameBoard")
    ).backgroundColor;
    const growingRate = document.getElementById("growing-rate").value;
    const foodColor = convertToRGB(document.getElementById("food-color").value);
    const snakeColor = convertToRGB(
      document.getElementById("snake-color").value
    );
    if (isGrowingRateValid(growingRate)) {
      console.log(growingRate);
    }
    if (isFoodColorValid(foodColor, gameBoardColor)) {
      console.log("Food color: " + foodColor);
    }
    if (isSnakeColorValid(snakeColor, gameBoardColor)) {
      console.log("Snake color: " + snakeColor);
    }
  }

  function handleCancelClick() {
    settingsForm.reset();
    gameMenu.classList.remove("hide");
    settingsMenu.classList.add("hide");
  }

  applyButton.addEventListener("click", handleApplyClick);
  cancelButton.addEventListener("click", handleCancelClick);
}

settings();
