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
  // reset souvenirs array
  souvenirs = [];

  for ( var i = 0; i < trials; i++ ){

    var newSouvenir = new souvenir( colors[Math.floor(Math.random()*colors.length)] );

    // Check if we have an object at index [i - n]
    // Later we'll add 1/5 matches to our array here
    if ( i >= n ){

      var nBackSouvenir = souvenirs[ i - n ];
      // Check if it's a match
      if ( newSouvenir.color == nBackSouvenir.color ){
        // if so add a match property
        newSouvenir.match = true;
        console.log('newSouvenir is now: ' + newSouvenir)
      };

      souvenirs.push(newSouvenir);

    }else{

      souvenirs.push(newSouvenir);

    }


  }

  console.log('souvenirs are: ' + souvenirs)
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
  // disable the play button
  $( 'input.settings').attr('disabled', 'disabled');
  // reset the scoreboard
  $( '.scoreboard' ).empty();

};

// show a countdown before the timer starts
function startCountdown(){

  var counter = 3;
  $( '.counter' ).html( 'Ready?' );

  var countdown = setInterval(function(){
    // display the countdown timer
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


// Progress the game at an interval or ends the game
function startTrials( start, end, interval ) {

  $( '.counter' ).html( 'GOH!!' )
  // Draw the first object
  drawObject();
  // Start the trials timer
  var timer = setInterval( function(){
    // increment the objectIndex here, so objectIndex is always the index of the object on screen;
    objectIndex++;
    $( '.counter' ).html( objectIndex );

    if ( objectIndex < trials ){
      drawObject();
      // enable the match button if we've reached n
      if ( objectIndex >= n ){
        $( 'input.color').removeAttr('disabled');
      }
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

// Show the values of correct and incorrect
function endGame(){

  $( '.scoreboard' ).append('<p> Correct: ' + correct + '<br>Incorrect: ' + incorrect + '</p>')
  //reset the buttons
  $( 'input.settings').removeAttr('disabled');
  $( 'input.color').attr('disabled', 'disabled');

};

// Listen for a 'Play' button click
// To do: move settings into it's own module
// To do: move the play functionality over to it's own button
  // Add 'Pause' functionality
$( 'form.settings' ).on('submit', function(e){
  e.preventDefault();

  // Get the settings, generate the objects and start the game.
  getSettings();
  generateObjects();
  startGame();

});

// Listen for user's match guess
$( 'form.controls' ).on('submit', function(e){
  e.preventDefault();
  // Check if the object is a match, and update the score
    // To do: move the match comparison into a function
  $( 'input.color').attr('disabled', 'disabled');
  if ( 'match' in souvenirs[objectIndex] ){
    console.log('CORRECT');
    correct++;
  }else{
    console.log('INCORRECT');
    incorrect++;
  }

});





