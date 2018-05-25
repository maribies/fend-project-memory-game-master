/*
 * Create a list that holds all of your cards
*/
const cards = ['fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-bolt','fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-anchor', 'fa-anchor',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'
              ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/
function makeCard(card){
  let cardTemplate = '<li class="card">'
                      + '<i class="fa"></i>'
                      + '</i>';
  let deck = document.getElementbyId('deck');
  deck.insertAdjacentHTML(afterbegin, cardTemplate);
    for (var i=0; i <= cards.length; i++) {
    cardTemplate.getElementsByClassName("fa")[i].classList += cards[i%len];
    }
//return `<li class="card"><i class="fa ${card}"></i></li>;`
};

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

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function beginGame(){

}

 let allCards = document.querySelectorAll('.card');
 let openCards = []; //to store open cards, can use .length to get num of cards

//flips cards, hides cards after delay, will not allow clicking on same card
 allCards.forEach(function(card){
   card.addEventListener('click', function(e){
     if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){

       if (openCards.length < 2) {
         openCards.push(card);
         card.classList.add('open','show');

         //check cards match
        const firstCard = openCards[0];
        const secondCard = openCards[1];
        if (openCards.length == 2 && firstCard.innerHTML === secondCard.innerHTML){
          firstCard.classList.add('match');
          secondCard.classList.add('match');
        };
        //resulting in undefined error

         //if cards don't match, flip
       } if (openCards.length == 2){
         setTimeout(function(){
           openCards.forEach(function(card){
             card.classList.remove('open', 'show');
           });

           openCards = [];
         }, 500);
       }
     }
   });
 });
