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

    displayBookHit: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "hit");
    },

    displayXMiss: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "miss");
    }
  }

view.displayBookHit("23");
view.displayXMiss("14");

