masterMind = {
  colors: {
    1: "black",
    2: "white",
    3: "red",
    4: "orange",
    5: "yellow",
    6: "blue",
  },
  settings: {
    lines: 12,
    column: 4,
  },
  game: {
    colors: 6,
  },

  initialise: function () {
    console.log("ok");
    this.drawGameBoard();
  },
};
