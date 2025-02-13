const App = {
  // All of our selected HTML elements
  $: {
    squares: document.querySelectorAll(".square"),
    numDisplay: document.querySelector(".num-display"),
    toggleBtn: document.querySelector(".toggle-btn"),
    toggleSwitch: document.querySelector(".toggle-switch-box"),
    body: document.body,
    numDisplay: document.querySelector(".num-display"),
    grid: document.querySelector(".grid"),
    delBtn: document.querySelector(".del"),
    resetBtn: document.querySelector(".reset"),
    equalBtn: document.querySelector(".equals"),
    operationBtns: document.querySelectorAll(".operation"),
  },

  init() {
    let leftOperand = [];
    let rightOperand = [];
    let finalResult = [];
    let currentState = 1;
    let currentOperation = null;
    let isEnteringRightOperand = false;

    App.$.toggleSwitch.addEventListener("click", (event) => {
      const toggleBtn = App.$.toggleBtn;

      currentState = currentState < 3 ? currentState + 1 : 1;

      toggleBtn.classList.remove("state-1", "state-2", "state-3");

      toggleBtn.classList.add(`state-${currentState}`);

      console.log(currentState);

      if (currentState === 1) {
        App.$.body.className = "";
        App.$.body.style.color = "white";
        App.$.numDisplay.className = "num-display";
        App.$.grid.className = "grid";
        App.$.squares.forEach((square) => {
          square.className = "square";
          square.style.boxShadow = "0px 4px 0px hsl(28, 16%, 65%)";
          square.style.color = "hsl(221, 14%, 31%)";
        });
        App.$.delBtn.className = "del";
        App.$.delBtn.style.boxShadow = "0px 4px 0px hsl(224, 28%, 35%)";
        App.$.resetBtn.className = "reset";
        App.$.resetBtn.style.boxShadow = "0px 4px 0px hsl(224, 28%, 35%)";
        App.$.equalBtn.className = "equals";
        App.$.equalBtn.style.boxShadow = "0px 4px 0px hsl(6, 70%, 34%)";
        App.$.equalBtn.style.color = "hsl(0, 0%, 100%)";
        App.$.toggleSwitch.className = "toggle-switch-box";
        App.$.toggleBtn.className = "toggle-btn state-1";
      } else if (currentState === 2) {
        App.$.body.classList.add("light-gray");
        App.$.body.style.color = "hsl(60, 10%, 19%)";
        App.$.numDisplay.classList.add("v-light-gray");
        App.$.grid.classList.add("grayish-red");
        App.$.squares.forEach((square) => {
          square.classList.add("light-gray-yellow");
          square.style.boxShadow = "0px 4px 0px hsl(35, 11%, 61%)";
          square.style.color = "hsl(60, 10%, 19%)";
        });
        App.$.delBtn.classList.add("dark-mod-cyan");
        App.$.delBtn.style.boxShadow = "0px 4px 0px hsl(185, 58%, 25%)";
        App.$.resetBtn.classList.add("dark-mod-cyan");
        App.$.resetBtn.style.boxShadow = "0px 4px 0px hsl(185, 58%, 25%)";
        App.$.toggleSwitch.classList.add("grayish-red");
      } else if (currentState === 3) {
        App.$.body.classList.add("v-dark-violet");
        App.$.body.style.color = "hsl(52, 100%, 62%)";
        App.$.numDisplay.classList.add("v-dark-violet2");
        App.$.grid.classList.add("v-dark-violet2");
        App.$.squares.forEach((square) => {
          square.classList.add("v-dark-violet");
          square.style.boxShadow = "0px 4px 0px hsl(290, 70%, 36%)";
          square.style.color = "hsl(52, 100%, 62%)";
        });
        App.$.delBtn.classList.add("dark-violet");
        App.$.delBtn.style.boxShadow = "0px 4px 0px hsl(285, 91%, 52%)";
        App.$.resetBtn.classList.add("dark-violet");
        App.$.resetBtn.style.boxShadow = "0px 4px 0px hsl(285, 91%, 52%)";
        App.$.toggleSwitch.classList.add("v-dark-violet2");
        App.$.equalBtn.classList.add("pure-cyan");
        App.$.equalBtn.style.boxShadow = "0px 4px 0px hsl(177, 92%, 70%)";
        App.$.equalBtn.style.color = "hsl(198, 20%, 13%)";
        App.$.toggleBtn.classList.add("pure-cyan");
      }
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const num = event.currentTarget.querySelector("h1").textContent;

        if (!isEnteringRightOperand) {
          leftOperand.push(num);
        } else {
          rightOperand.push(num);
        }

        updateDisplay();
      });
    });

    App.$.operationBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        currentOperation = event.currentTarget.textContent.trim();
        isEnteringRightOperand = true;
        updateDisplay();
      });
    });

    App.$.equalBtn.addEventListener("click", (event) => {
      if (
        leftOperand.length > 0 &&
        rightOperand.length > 0 &&
        currentOperation
      ) {
        computeResult();
      }
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      App.$.numDisplay.innerHTML = "";
      leftOperand = [];
      rightOperand = [];
      currentOperation = null;
      isEnteringRightOperand = false;
    });

    function updateDisplay() {
      const leftValue = formatNumber(leftOperand);
      const rightValue = formatNumber(rightOperand);

      App.$.numDisplay.innerHTML = currentOperation
        ? `<h1>${leftValue}</h1><h1>${currentOperation}</h1><h1>${rightValue}</h1>`
        : leftValue
        ? `<h1>${leftValue}</h1>`
        : `<h1>${finalResult}</h1>`;
    }

    function computeResult() {
      const leftNum = parseFloat(leftOperand.join("").replace(/,/g, ""));
      const rightNum = parseFloat(rightOperand.join("").replace(/,/g, ""));

      let result;
      switch (currentOperation) {
        case "+":
          result = leftNum + rightNum;
          break;
        case "-":
          result = leftNum - rightNum;
          break;
        case "x":
          result = leftNum * rightNum;
          break;
        case "/":
          result = rightNum !== 0 ? leftNum / rightNum : "Error";
          break;
        default:
          return;
      }
      finalResult = result.toString().split("");
      finalResult = formatNumber(finalResult);
      rightOperand = [];
      leftOperand = [];
      currentOperation = null;
      isEnteringRightOperand = false;
      updateDisplay();
    }

    function formatNumber(array) {
      const newArray = [...array];
      let counter = 0;

      for (let i = array.length - 1; i >= 0; i--) {
        if (counter == 3) {
          newArray.splice(i + 1, 0, ",");
          counter = 0;
        }
        counter++;
      }
      return newArray.join("");
    }
  },
};

window.addEventListener("load", () => App.init());
