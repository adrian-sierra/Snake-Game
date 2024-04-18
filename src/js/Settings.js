export default function settings(gameSettings) {
  const settingsForm = document.getElementById("form");
  const settingsMenu = document.getElementById("settings");
  const gameMenu = document.getElementById("menu");
  const applyButton = document.getElementById("apply-button");
  const cancelButton = document.getElementById("cancel-button");

  settingsMenu.classList.remove("hide");

  settingsValueReset();

  function showStartMenu() {
    gameMenu.classList.remove("hide");
    settingsMenu.classList.add("hide");
  }

  function settingsValueReset() {
    document.querySelector(".growing-rate-label").classList.remove("error");
    document.querySelector(".food-color-label").classList.remove("error");
    document.querySelector(".snake-color-label").classList.remove("error");
  }

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

  function determineSnakeSpeed(gameSpeed) {
    switch (gameSpeed) {
      case "slow":
        return 750;
      case "regular":
        return 250;
      case "fast":
        return 100;
    }
  }

  function isGrowingRateValid(growingRate) {
    const growingRateLabel = document.querySelector(".growing-rate-label");
    if (growingRate < 1 || growingRate > 10) {
      growingRateLabel.classList.add("error");
    } else {
      growingRateLabel.classList.remove("error");
      return true;
    }
  }

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

    const gameSpeed = document.querySelector(
      'input[name="game-speed"]:checked'
    ).value;
    const gameBoardColor = window.getComputedStyle(
      document.getElementById("board")
    ).backgroundColor;
    const growingRate = document.getElementById("growing-rate").value;
    const foodColor = convertToRGB(document.getElementById("food-color").value);
    const snakeColor = convertToRGB(
      document.getElementById("snake-color").value
    );

    if (
      isGrowingRateValid(growingRate) &&
      isFoodColorValid(foodColor, gameBoardColor) &&
      isSnakeColorValid(snakeColor, gameBoardColor)
    ) {
      gameSettings.gameSpeed = determineSnakeSpeed(gameSpeed);
      gameSettings.growingRate = parseInt(growingRate);
      gameSettings.foodColor = foodColor;
      gameSettings.snakeColor = snakeColor;
      showStartMenu();
    }
  }

  function handleCancelClick() {
    settingsForm.reset();
    showStartMenu();
  }

  applyButton.addEventListener("click", handleApplyClick);
  cancelButton.addEventListener("click", handleCancelClick);
}
