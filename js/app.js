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
const deck = document.getElementById('deck');

function makeCard(card){
  for (var x=0; x<cards.length; x++){
    let cardTemplate = '<li class="card">'
                        + '<i class="fa"></i>'
                        + '</i>';
    let deck = document.getElementById('deck');
    deck.insertAdjacentHTML('afterbegin', cardTemplate);
  };
    shuffle(cards);
    for (var i=0; i <cards.length; i++){
      let deck = document.getElementById('deck');
      let target = deck.getElementsByTagName('i');
      target[i].className += ' ' + cards[i];
    };
  };

makeCard();

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


const allCards = document.querySelectorAll('.card');
let openCards = []; //to store open cards, can use .length to get num of cards
let countMatches = 0;
let countClicks = 0;
//flips cards, hides cards after delay, will not allow clicking on same card
allCards.forEach(function cardGame(card){
  card.addEventListener('click', function(e){
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
     //counter for each time player clicks a card
      countClicks +=1;
     //console.log(countClicks);

     //flip to show cards clicked
      if (openCards.length < 2) {
        cardsFlip(card);
        //check cards match
        const firstCard = openCards[0];
        const secondCard = openCards[1];
        if (openCards.length == 2 && firstCard.innerHTML === secondCard.innerHTML){
          cardsMatch(card);
        };
        //if cards don't match, flip/hide
        } if (openCards.length == 2){
        cardsHide(card);
      }
      starRating();
    }
   win();
  });
});
//does this need to be 2 functions according to directions?
function cardsFlip(card){
  openCards.push(card);
  card.classList.add('open','show');
}

function cardsMatch(card){
  //don't like that i need to redefine these variables here- can it be avoided?
  const firstCard = openCards[0];
  const secondCard = openCards[1];
  firstCard.classList.add('match');
  secondCard.classList.add('match');
  countMatches += 2;
};

function cardsHide(card){
  setTimeout(function(){
    openCards.forEach(function(card){
      card.classList.remove('open', 'show');
    });

    openCards = [];
  }, 500);
};

 //if refresh icon is clicked, refresh the page --- is this the same as reset?
 let refreshBtn = document.getElementById('restart');
 function refresh(){
   location.reload(true);
 }
 refreshBtn.addEventListener('click', refresh, false);

/*
* timer pops up on start to show how long player takes to play/win Game
* - adapted from "Creating Accurate Timers in Javascript" by James Edwards
* - https://www.sitepoint.com/creating-accurate-timers-in-javascript/
*/
startTime = new Date().getTime();
let timeCounter = '0';
let timer = document.getElementById('timer');

deck.addEventListener('click', myTimer);

function myTimer(){
  if(countMatches !== cards.length){
    let time = new Date().getTime() - startTime;
    timeCounter = Math.floor(time/100)/10;
    if (Math.round(timeCounter) == timeCounter) {
      timeCounter += '.0';
      }
    timer.innerHTML = Math.round(timeCounter);
    let timerGo = setInterval(myTimer, 1000);
  };
};
//only runs if all matched
function stopMyTimer() {
  clearInterval(timerGo);
};

//function to determine if player matches all cards = win = popup alert
function win(){
  if (countMatches === cards.length){
    alert('You win!' + ' You made ' + countClicks + ' moves. ' + 'In ' + timeCounter + ' seconds.');
  }
};

//counter to keep display current number of moves user makes
deck.addEventListener('click', function moveCounter(e){
  let moveCounter = document.getElementById('moves');
  if(countMatches !== cards.length){
    moveCounter.textContent = countClicks;
  }
});

//star rating to reflect players performance
let allStars = document.querySelector('.stars');
let star = allStars.getElementsByTagName('li');
function starRating(){
  //if counter is under 32 moves, 2 stars, more than 42, 1 star
  if (countClicks == 32 || countClicks == 42) {
    star[0].remove();
  };
};
