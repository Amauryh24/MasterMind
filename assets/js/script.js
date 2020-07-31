masterMind = {
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

    colorOptions: document.getElementById("colorOptions"),
  },

  initialise: function () {
    this.drawGameBoard();
  },

  drawGameBoard: function () {
    let board = document.getElementById("board");
    board.innerHTML = "";
    // display boardGame spot & indicators
    for (let i = 0; i < this.settings.lines; i++) {
      let line = document.createElement("li");
      line.setAttribute("class", "line");

      board.appendChild(line);

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
    colorOptions = document.getElementById("colorOptions");
    for (let i = 0; i < masterMind.colors.length; i++) {
      let color = document.createElement("li");
      color.setAttribute("class", "option " + this.colors[i]);
      colorOptions.appendChild(color);

      color.addEventListener("click", this.insertColor);
    }
  },
  insertColor: function (e) {
    let currentLine = document.getElementsByClassName("line")[
      masterMind.game.line - 1
    ];
    let spots = currentLine.getElementsByClassName("spot");
    spots[0].className = "black";
  },
};
