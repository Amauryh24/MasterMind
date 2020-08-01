let masterMind = {
  colors: ["black", "white", "red", "orange", "yellow", "blue"],
  settings: {
    lines: 12,
    columns: 4,
  },
  game: {
    line: 1,
    codeSoluce: [],
    codeEssais: [],
  },
  elementsDom: {
    codeSoluce: document.getElementById("codeSoluce"),
    board: document.getElementById("board"),
    colorOptions: document.getElementById("colorOptions"),
  },

  initialise: function () {
    this.codeSoluce();
    this.drawGameBoard();
    // this.codeRevelation();
  },
  codeSoluce: function () {
    for (let i = 0; i < this.settings.columns; i++) {
      let randomColor = parseInt(Math.random() * this.colors.length);
      this.game.codeSoluce[i] = this.colors[randomColor];
    }
    console.log(this.game.codeSoluce);
  },
  drawGameBoard: function () {
    //display codeSoluce mistery
    for (let i = 0; i < this.settings.columns; i++) {
      let codeSoluce = document.createElement("li");
      codeSoluce.innerText = "?";
      codeSoluce.setAttribute("class", "soluce");
      this.elementsDom.codeSoluce.appendChild(codeSoluce);
    }

    // display boardGame spot & indicators
    this.elementsDom.board.innerHTML = "";
    for (let i = 0; i < this.settings.lines; i++) {
      let line = document.createElement("li");
      line.setAttribute("class", "line");

      this.elementsDom.board.appendChild(line);

      lineId = document.createElement("span");
      lineId.innerText = i + 1;
      line.appendChild(lineId);

      for (let j = 0; j < this.settings.columns; j++) {
        let spot = document.createElement("span");
        spot.setAttribute("class", "spot");
        line.appendChild(spot);
      }
      for (let k = 0; k < this.settings.columns; k++) {
        let indicator = document.createElement("span");
        indicator.setAttribute("class", "indicator");
        line.appendChild(indicator);
      }
    }
    // display list colors and add listener for each color

    for (let i = 0; i < masterMind.colors.length; i++) {
      let color = document.createElement("li");
      color.setAttribute("id", this.colors[i]);
      color.setAttribute("class", "option " + this.colors[i]);
      this.elementsDom.colorOptions.appendChild(color);

      color.addEventListener("click", this.insertColor);
    }
  },
  insertColor: function (color) {
    let currentLine = document.getElementsByClassName("line")[
      masterMind.game.line - 1
    ];
    let spots = currentLine.getElementsByClassName("spot");
    spots[0].className = color.target.id;
    masterMind.game.codeEssais.push(color.target.id);

    // check code when line is completed
    if (masterMind.game.codeEssais.length === masterMind.settings.columns) {
      if (masterMind.codeCheck()) masterMind.gameStatus("win");
      else masterMind.game.line++;
    }

    if (masterMind.game.line === masterMind.settings.lines + 1) {
      masterMind.gameStatus("lose");
    }
  },
  codeCheck: function () {
    codeMatch = true;
    let codeSoluceCopy = this.game.codeSoluce.slice(0);
    // check good color in good place
    for (let i = 0; i < this.settings.columns; i++) {
      if (this.game.codeSoluce[i] === this.game.codeEssais[i]) {
        this.game.codeEssais[i] = "hit";
        this.insertIndicators("hit");
        codeSoluceCopy[i] = -1;
      } else {
        codeMatch = false;
      }
    }
    // check good color but no good place
    for (let i = 0; i < this.settings.columns; i++) {
      if (codeSoluceCopy.indexOf(this.game.codeEssais[i]) !== -1)
        this.insertIndicators("almost");
    }
    masterMind.game.codeEssais = [];

    return codeMatch;
  },
  insertIndicators: function (status) {
    let currentLine = document.getElementsByClassName("line")[
      masterMind.game.line - 1
    ];
    let indicators = currentLine.getElementsByClassName("indicator");
    indicators[0].className = status;
  },

  gameStatus: function (status) {
    this.codeRevelation();
    let modal = document.getElementById("modal");
    let message = document.getElementById("modalMessage");
    modal.style.display = "flex";
    if (status === "win") {
      message.innerText = "You craked the Code !";
    } else {
      message.innerText = "You lose";
    }
    document.getElementById("yes").addEventListener("click", () => {
      modal.style.display = "none";
    });

    document.getElementById("no").addEventListener("click", () => {
      modal.style.display = "none";
    });
  },
  codeRevelation: function () {
    let codeSoluce = this.elementsDom.codeSoluce.getElementsByClassName(
      "soluce"
    );
    for (let i = 0; i < this.settings.columns; i++) {
      codeSoluce[0].setAttribute("class", this.game.codeSoluce[i]);
    }
  },
};
