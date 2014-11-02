// Global variables 

// Settings variables
// n is the number of steps back for the n-back game
var n;

// the number times we display an object per game
var trials = 5;

// the the duration of each trial in ms, defines tmer duration in startTrials function
var trialDuration = 3000;

// souvenirs is the global array of objects whose properties the user must try to remember
var souvenirs = [];

// keep track of the user's score
var correct;
var incorrect;

// specifies which section of the souvenirs array to look at in the nextStep function
var objectIndex;

// Function that saves the game variables
function getSettings(){

  n = $( '.nback' ).val();

}

// Create a color array
var colors = [
  'red',
  'yellow',
  'blue',
  'purple',
  'green',
  'aqua',
  'orange',
  'brown'
];

// Create a souvenir constructor
function souvenir(color) {
    this.color = color;
}

// Create a generateObjects function which will populate my global array of souvenirs with 'trials' number of objects
function generateObjects(){

  for ( var i = 1; i < trials+1; i++ ){

    var nBackSouvenir;

    var newSouvenir = new souvenir( colors[Math.floor(Math.random()*colors.length)] );
    console.log( 'new souvenir color is: ' + newSouvenir.color );

    if ( i >= n ){
      console.log( souvenirs[ i - n ].color )      

      // var nBackSouvenir = souvenirs[ i - n ].color;
      // if ( newSouvenir.color == nBackSouvenir.color ){
      //   console.log( 'n-back souvenir color is: ' + nBackSouvenir.color )
      // }
    }else{
      souvenirs.push(newSouvenir);
    }


  }

  // Make 20% of the objects color matches
  // Add a match property to match objects, with the value of color

  // Later, add lures to objectIndex nBack +1
  // Then, add lures to obJectIndex nBack -1 

};

// Create a startGame function 
function startGame(){

  // set both the correct and incorrect counters to 0
  correct = 0;
  incorrect = 0;

  // set another counter, number of objectIndex, to start at 0 
  // recall, objectIndex specifies which section of the souvenirs array to look at
  objectIndex = 0;

  // call startTrials, passing game settings in as arguments
  startCountdown();

};

// show a countdown before the timer starts
function startCountdown(){

  var counter = 3;
  $( '.counter' ).html( 'Ready?' );

  var countdown = setInterval(function(){

    $( '.counter' ).html( counter );
    if ( counter > 0 ){
      counter--;
    }else{
      // when the countdown ends, start the trials
      startTrials( n, trials, trialDuration )
      clearInterval( countdown );
    };

  }, 1000);

};


// Progresses the game at an interval or ends the game
function startTrials( start, end, interval ) {

  // draw the first object
  drawObject();
  objectIndex++;
  $( '.counter' ).html( 'GOH!!' )

  // enable the match button when we're ready to start

  // Start the trials timer
  var timer = setInterval( function(){

    $( '.counter' ).html( objectIndex );
    if ( objectIndex < trials ){
      drawObject();
      objectIndex++;
    }else{
      endGame();
      clearInterval(timer);
    };

  }, interval );

};

// Draw souvenirs of a particular objectIndex on the gameboard
function drawObject(){

  console.log(souvenirs[objectIndex]);
  $( '.souvenir' ).css( 'background-color', souvenirs[objectIndex].color )

};

// Shows the values of correct and incorrect
function endGame(){

  $( '.scoreboard' ).append('<p> Correct: ' + correct + '<br>Incorrect: ' + incorrect + '</p>')

};
  
// When the user clicks 'Play', get the settings, generate the objects and start the game.
$( 'form.settings' ).on('submit', function(e){
  e.preventDefault();

  getSettings();
  generateObjects();
  startGame();

});

$( 'form.controls' ).on('submit', function(e){
  e.preventDefault();

// To do: Add logic to listen for user's match guess here

});

//----------------
// Might use this later for match logic 
// function nextStep(){

//   if ( objectIndex < souvenirs.length ){
//     drawObject();
//     objectIndex += 1;
//   }else{
//     endGame();
//   };

// };





