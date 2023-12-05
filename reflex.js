let reflexCount = 0;
const maxReflexCount = 3;
let points = 0;
let max;
let min;

setDifficultyLevel();

function setDifficultyLevel() {
  const divMenuElements = document.querySelectorAll(".div-menu-js");
  divMenuElements.forEach((divMenuElement) => {
    divMenuElement.addEventListener("click", () => {
      const difficulty = divMenuElement.dataset.difficulty;
      switch (difficulty) {
        case "E":
          max = 7;
          min = 1;
          break;
        case "M":
          max = 5;
          min = 1;
          break;
        case "H":
          max = 3;
          min = 1;
          break;
      }
      renderStartMenu();
    });
  });
}

function triggerReflex(valMax, valMin) {
  if (reflexCount >= maxReflexCount) {
    displayPoints();
    return;
  }

  let rng = Math.floor(Math.random() * (valMax - valMin) + valMin) * 1000;
  setTimeout(function () {
    changeColorToRed();
  }, rng);

  reflexCount++;
}

function changeColorToRed() {
  const reflexClass = document.querySelector(".div-reflex");
  reflexClass.classList.add("red-class");

  const clickHandler = function () {
    addPoints(reflexClass);
    reflexClass.removeEventListener("click", clickHandler);
  };

  reflexClass.addEventListener("click", clickHandler);

  setTimeout(function () {
    reflexClass.classList.remove("red-class");
    reflexClass.classList.remove("green-class");
    reflexClass.innerHTML = "";
    runNextReflex();
  }, 2000);
}

function addPoints(reflexClass) {
  reflexClass.classList.remove("red-class");
  reflexClass.classList.add("green-class");
  points++;
}

function runNextReflex() {
  triggerReflex(max, min);
}

function startGame() {
  const reflexClass = document.querySelector(".div-reflex");
  setTimeout(function () {
    reflexClass.innerHTML = "";
    triggerReflex(max, min);
  }, 3000);
}

function renderStartMenu() {
  const menuFlexClass = document.querySelector(".menu-flex");
  menuFlexClass.innerHTML = `
      <div class="div-reflex">
        <button onclick="startGame()">Start</button>
      </div>
      <div class="reflex-menu">
        <p>Time</p>
      </div>
    `;
  console.log(max, min);
}

function displayPoints() {
  const reflexClass = document.querySelector(".div-reflex");
  reflexClass.innerHTML = `Punkty: ${points}`;
  console.log(max, min);
}
