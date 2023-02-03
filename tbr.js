  var view = {
    books: [],
    displayBookTitle: function(userInput) {
      this.books.push(userInput);
      var listMultiple = ["book1", "book2", "book3", "book4", "book5"];

      for (var i = 0; i < listMultiple.length; i++) {
        var index = listMultiple[i]; 
        var list = document.getElementById(index);
        list.innerHTML = this.books[i] || "";
      }
      model.books[this.books.length - 1].name = userInput;
    },

    displayMessage: function(msg) {
      var bottomBox = document.getElementById("bottom-box");
      bottomBox.innerHTML = msg;
    },

    displayBookHit: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "hit");
    },

    displayXMiss: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "miss");
    }
  }

var model = {
  boardSize: 8,
  numBooks: 5,
  bookLength: 3,
  booksFound: 0,

  books: [{locations:[0, 0, 0], hits:["", "", ""], name: []},
          {locations:[0, 0, 0], hits:["", "", ""], name: []},
          {locations:[0, 0, 0], hits:["", "", ""], name: []},
          {locations:[0, 0, 0], hits:["", "", ""], name: []},
          {locations:[0, 0, 0], hits:["", "", ""], name: []}],

  fire: function(guess) {
    for (var i = 0; i < this.numBooks; i++) {
      var book = this.books[i];
      var index = book.locations.indexOf(guess);
      if (index >= 0) {
        book.hits[index] = "hit";
        view.displayBookHit(guess);
        view.displayMessage("You got a hit!");
        if (this.isFound(book)) {
          this.booksFound ++;
        }
        return true;
      }
    }
    view.displayXMiss(guess);
    view.displayMessage("You missed all the books. Try again.");
    return false;
  },

  isFound: function(book) {

    for (var i = 0; i < this.bookLength; i++) {
      if (book.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
  generateBookLocation: function() {
    var locations;
    for (var i = 0; i < this.numBooks; i++) {
      do {
        locations = this.generateBook();
      } while (this.overlaps(locations));
      this.books[i].locations = locations;
    }
  },

  generateBook: function() {

    var direction = Math.floor(Math.random() * 2);
    var row;
    var column;
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      column = Math.floor(Math.random() * (this.boardSize - (this.bookLength +1)));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - (this.bookLength + 1)));
      column = Math.floor(Math.random() * this.boardSize);
    }
    var newBookLocations = [];
    for (var i = 0; i < this.bookLength; i++) {
      if (direction === 1) {
        newBookLocations.push(row + "" + (column + i));
      } else {
        newBookLocations.push((row + i) + "" + column);
      }
    }
    return newBookLocations;
  },

  overlaps: function(locations) {
    
    for (var i = 0; i < this.numBooks; i++) {
      var book = this.books[i];
      for (var j = 0; j < locations.length; j++) {
        if(this.book.locations.indexOf(locations[j]) >= 0) {
          return true; 
        }
      }
    }
    return false;
  }
};

var controller = {
  guesses: 0,
  processGuesses: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.booksFound === model.bookLength) {
        view.displayMessage("That's three hits!!! The next book you wil read is: " + model.books + ".");
      }
    }
  }
}

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E"];
  if (guess === null || guess.length !== 2) {
    alert("Ooops...please enter a letter and number from the board.");
  }else {
    var firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)) {
      alert("Oops...that is not a valid selection.");
    }else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert("Ooops...that selection is off the board.")
    } else {
      return row + column;
    }
  }
  return null; 
}

function init() {
  var guessButton = document.getElementById("guess-button");
  guessButton.onclick = handleGuessButton;
  var guessInput = document.getElementById("guess-text");
  guessInput.onkeypress = handleKeyPress;
  model.generateBookLocation();
}

function handleKeyPress(e) {
  var guessButton = document.getElementById("guess-button");
  if (e.keyCode === 13) {
    guessButton.click();
    return false;
  }
}

function handleGuessButton() {
  var guessInput = document.getElementById("guess-text");
  var guess = guessInput.value;
  controller.processGuesses(guess);
  guessInput.value = "";
}


windows.onload = init;



