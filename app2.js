
 // My array that is filled with the different types of cards used in the memory game.
var deckOfCard = [
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond"
];


var openCard = [];
var matchedCards = 0;
var stars = 3;

// Timer function for the game
// Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var sec = 0;
function timer(val) { return val > 9 ? val : "0" + val; }
setInterval(function () {
    $("#seconds").html(timer(++sec % 60));
    $("#minutes").html(timer(parseInt(sec / 60, 10) % 60));
    $("#hours").html(timer(parseInt(sec / 3600, 10)));
}, 1000); 


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array
}


// Randomize the cards on the board
function updateCards() {
    deckOfCard = shuffle(deckOfCard);
    console.log(deckOfCard);
    var index = 0;
    $(".card").each(function() {
      $(this).attr("class",deckOfCard[index]);
      index++;
    });
}


// Setup HTML for the cards
function makeCard() {
    var cardList = shuffle (deckOfCard);
    cardList.forEach(function(card) {
        $('.deck').append('<li class = "card"><i class="' + card + '" ></i></li>');
    })
}

makeCard();

// Setup listener for the card flip
// Once two cards are flipped the comparefCards() function is called
var moves = 0;
function cardFlip() {
    $(".card") .on ("click", function() {
        console.log(moves);
        var currentCard = $(this);
        currentCard.attr("class", "card open show");
        openCard.push($(this));
        console.log(currentCard.attr("class"));
        if(openCard.length === 2) {
            compareCards();
        }
    });

}
cardFlip();



// Used to commpare the two flipped over cards
function compareCards () {
  var cardOne = openCard[0];
  var cardTwo = openCard[1];
  var firstCard = cardOne.find("i");
  var secondCard = cardTwo.find("i");
  console.log(firstCard, secondCard);
    if (firstCard.attr ("class") === secondCard.attr("class")) {
        cardOne.attr("class", "card open match");
        cardTwo.attr("class", "card open match");
        matchedCards++;
        openCard = [];
        addMove();
        forTheWin();
    } else {
        cardOne.attr("class", "card open incorrect");
        cardTwo.attr("class", "card open incorrect");
        addMove();
        setTimeout(() => {
            cardOne.attr("class", "card");
            cardTwo.attr("class", "card");
            openCard = [];
        }, 250);

    }
    addMove();    
}


// This is keeping track of the moves the user makes and assigning the correct star based on moves
function addMove(){
    var moving = $(".moves");
    moves++;
    moving.text(moves);
    if (moves > 0 && moves < 25) {
    }  
    if (moves > 25 && moves < 35) {
        $("#oneStar").removeClass("fa-star");
    } 
    if (moves > 35) {
        $("#twoStar").removeClass("fa-star");
    }
}


// When in the the game, this allow the user to "click" on the restart button, which will start the game over 
function restartGame () {
    $(".restart") .on ("click", function() {
        location.reload ();
    });
}
restartGame();

// This is used to open the popup modal when all cards are matched correctly
// https://www.w3schools.com/howto/howto_css_modals.asp
function forTheWin () {
    if (matchedCards === 8) {
        
        var modal = document.getElementById("thewinpopup");

        modal.style.display = "block";
        console.log("All cards matched");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        
        // The Start Over Button
        myButton.onclick = function() {
             location.reload();
        }
        
        $('.stars li').clone().appendTo($('.modal-star-display-element'));       
        $('.timer').clone().appendTo($('.modal-timer-element'));
        $("#finishedMoves").text(moves);
        

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
             modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
             if (event.target == modal) {
                  modal.style.display = "none";
        }
        }
    }        

}


