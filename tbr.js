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
  bookLength: 1,
  booksFound: 0,

  books: [{locations:["00", "23", "44"], hits:["", "", ""]},
          {locations:["10", "33", "34"], hits:["", "", ""]},
          {locations:["32", "46", "37"], hits:["", "", ""]},
          {locations:["15", "16", "27"], hits:["", "", ""]},
          {locations:["14", "26", "25"], hits:["", "", ""]}],

  fire: function(guess) {
    for (i = 0; i < this.numBooks; i++) {
      var book = this.books[i];
      var index = book.locations.indexOf(guess);
      if (index >= 0) {
        book.hits[index] = "hit";
        view.displayBookHit(guess);
        view.displayMessage("You hit a book. I wonder which one...")
      }
    }
  },
}

