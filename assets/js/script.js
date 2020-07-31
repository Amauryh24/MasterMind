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
      codeSoluce.setAttribute("class", this.game.codeSoluce[i]); // don't forget to cut it !
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
    console.log(masterMind.game.codeEssais);
    if (masterMind.game.codeEssais.length === masterMind.settings.columns) {
      masterMind.codeCheck();
      masterMind.game.line++;
      masterMind.game.codeEssais = [];
    }
  },
  codeCheck: function () {
    console.log("je vérifie le code");
  },
};
