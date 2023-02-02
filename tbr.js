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

  books: [{locations:["00", "23", "44"], hits:["", "", ""], name: []},
          {locations:["10", "33", "34"], hits:["", "", ""], name: []},
          {locations:["32", "46", "37"], hits:["", "", ""], name: []},
          {locations:["15", "16", "27"], hits:["", "", ""], name: []},
          {locations:["14", "26", "25"], hits:["", "", ""], name: []}],

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

