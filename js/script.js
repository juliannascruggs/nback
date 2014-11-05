// * * * * * * * * * * * * * * * * * * * *
// * * *  Global Variables
// * * * * * * * * * * * * * * * * * * * *

// * * *  Game Settings  * * *

// n is the number of steps back for the n-back game
var n;
// the number times the user needs to guess, per game
var trials = 25;
// the the duration of each trial in ms, defines timer duration in runTrials function
var trialDuration = 100;

// * * *  Game Components  * * *

// the global array of objects whose properties the user must try to remember
var souvenirs = [];
// specifies which object in the souvenirs array is being displayed at any given time
var currentObject;

// the user's score
var results = [];
var correct;
var incorrect;

// a color array
var colors = [

  '#B2CDC4',
  '#D8B847',
  '#E94E54',
  '#7D5242',
  '#8FFAFF',
  '#14A2F6',
  '#866389',
  '#2B9EB3',
  '#2B2C30',
  '#FC7B44'

];

// * * * * * * * * * * * * * * * * * * * *
// * * *  Setup Functions
// * * * * * * * * * * * * * * * * * * * *

// * * *  Game Settings  * * *

// apply the user's game settings
function setSettings(){

  n = $( '.nback' ).val();
  n = parseInt(n);
  trials += n;

};
// a souvenir object constructor, which will later have it's own settings 
function Souvenir(color) {
    this.color = color;
};

// a function used to shuffle the colors array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };

  return array;

};


// * * *  Game Components  * * *

// generate the souvenirs array
function generateSouvenirs(){

  // seed the souvenir pool with one object of each color
  for ( var i = 0; i < colors.length; i++ ){
    var newSouvenir = new Souvenir( colors[i] );
    souvenirs.push(newSouvenir);
  };

  while( souvenirs.length < trials ){

    var dupeFound = false;
    // generate an souvenir with a random color
    var newSouvenir = new Souvenir( colors[Math.floor(Math.random()*colors.length)] );

    for ( var i = souvenirs.length - 1; i > souvenirs.length - 9; i-- ){

      if ( newSouvenir.color == souvenirs[i].color ){
        dupeFound = true;
        break;
      };

    };

    if ( dupeFound !== true ){
      // populate the souvenirs array 
      souvenirs.push( newSouvenir );
    };

  };
  console.log( 'We broke of the while loop!! ' + souvenirs );
  addMatches();

};



  // iterate over the number of 'trials'
//  for ( var i = 0; i < trials; i++ ){
    // generate an souvenir with a random color
//    var newSouvenir = new Souvenir( colors[Math.floor(Math.random()*colors.length)] );

    // Later add 1/5 matches to our array
    // Check if we have an nBack object
//    if ( i >= n ){
//      generateMatches();
//     // Check if we have a match
//      if ( newSouvenir.color == souvenirs[i - n].color ){
        // if so, add a 'match' property
//        newSouvenir.match = 'color';
//        console.log(newSouvenir)
//      };
      // populate the souvenirs array 
//      souvenirs.push(newSouvenir);
//    }else{
//      souvenirs.push(newSouvenir);
//    };

//  };

  // Later, add lures to currentObject nBack +1
  // Then, add lures to currentObject nBack -1 

function addMatches(){
  var matchCount = 0;

  while ( matchCount < 5 ){

    for ( var i = 0; i < souvenirs.length; i++ ){

      if ( i >= n ){

        if ( Math.random() >= 0.8 ){

          if ( 'match' in souvenirs[i] !== true ){

            souvenirs[i].match = 'color';
            souvenirs[i - n].match = 'color';
            souvenirs[i - n].color = souvenirs[i].color;
            matchCount++;

          };
        };
      };
    };
  };
};



// Messing with a new function to add matches into the souvenir array
function generateMatches(){

  var matches = 0;
  while ( matches < 5 ){
    
    var usableArray = souvenirs.length - n - 1;
//    var usableArray = 5 - n - 1;
    console.log('' + usableArray)

    var nBackPosition = (Math.floor(Math.random()*usableArray)) + 1;
    console.log('nback' + nBackPosition);

//    souvenirs.splice(nBackPosition, )

    var nBack = souvenirs[Math.floor(Math.random()*souvenirs.length)];
    console.log(nBack);
    matches = 5;

  }

};

// * * * * * * * * * * * * * * * * * * * *
// * * *  Game Logic
// * * * * * * * * * * * * * * * * * * * *

// * * *  Game Ready  * * *

// reset all the variables and setup the game
function resetGame(){

  // reset the counters
  results = [];
  correct = 0;
  incorrect = 0;
  currentObject = 0;
  trials = 25;

  // reset souvenirs
  souvenirs = [];

  // shuffle the colors array
  shuffle(colors);
  console.log(colors);

  // reset the scoreboard
  $( '.scoreboard' ).empty();
  // disable the play button
  $( 'input.settings').attr('disabled', 'disabled');

};

function startGame(){

  resetGame();

  // Get the settings, generate the objects and start the countdown
  setSettings();
  generateSouvenirs();
  startCountdown();
  console.log('Game Ready')

};

// show a countdown before the timer starts 
function startCountdown(){

  var counter = 3;
  $( '.counter' ).html( 'Ready?' );

  var countdown = setInterval( function(){
    // show the countdown
    $( '.counter' ).html( counter );

    if ( counter > 0 ){
      counter--;
    }else{
      // when the countdown ends, call runTrials, passing game settings in as arguments
      runTrials( n, trials, trialDuration )
      clearInterval( countdown );
    };
// TODO: set this back to 1000 later
  }, 10 );

};

// * * *  Game Active  * * * 

// progress the game at an interval or end the game
function runTrials( start, end, interval ) {

  $( '.counter' ).html( 'GOH!!' )
  console.log('Game Active');

  // draw the first object
  drawObject();
  // start the trials timer
  var timer = setInterval( function(){
    // updateScore here, so we can calculate the current results before moving on to the next object 
    updateScore( 'color', 'time' );
    // increment currentObject here, so currentObject is always the index of the object on screen
    currentObject++;

    $( '.counter' ).html( currentObject );

    if ( currentObject < trials ){
      drawObject();
      // enable the color match button if we've reached n
      if ( currentObject >= n ){
        $( 'input.color').removeAttr('disabled');
      };

    }else{
      endGame();
      clearInterval(timer);
    };

  }, interval );

};

// draw the currentObject on the gameboard
function drawObject(){
  $( '.souvenir' ).css( 'background-color', souvenirs[currentObject].color )
};

// check if the currentObject.property is equal to nBackObject.property
function compareNback( property ){
  return souvenirs[currentObject][property] == souvenirs[currentObject - n][property];
};

// check if the user's input (or lack thereof) was correct and update the results array
function updateScore( property, action ){
  // if the user already provided an input, or if there's no object at the n-back index, don't continue
  if( results[currentObject] != null || currentObject < n ){
    return false;  
  };

  if ( compareNback( property ) == true && action == 'click' ){
    // if it's a match, and the user clicked match button, increment score correct
    console.log( 'Correct click' );
    results[currentObject] = true;
  }else if( compareNback( property ) == false && action == 'time'){
    // if it isn’t a match, and the user did’t click match button, increment score correct
    console.log( 'Correct time' );
    results[currentObject] = true;
  }else{
    // if it is a match and the user didn’t click match button, increment score incorrect
    // or if it isn’t a match, and the user clicks match button, increment score incorrect
    console.log( 'Incorrect ' + action );
    results[currentObject] = false;
  };

};

// * * *  Game Complete  * * *

// show the values of correct and incorrect
function endGame(){

  console.log('Game Complete')
  getResults();
  $( '.scoreboard' ).append( '<p> Correct: ' + correct + '<br>Incorrect: ' + incorrect + '</p>' )
  //reset the buttons
  $( 'input.settings').removeAttr('disabled');
  $( 'input.color').attr('disabled', 'disabled');

};

// iterate over the results array to get the final results
function getResults(){

  for ( var i = 0; i < results.length; i++ ){
    if ( results[i] == true ){
      correct++
    }else if ( results[i] == false ){
      incorrect++
    };
  };

};

// * * * * * * * * * * * * * * * * * * * *
// * * *  Interactivity
// * * * * * * * * * * * * * * * * * * * *

// * * *  User Inputs  * * *

// Listen for a 'Play' button click
$( 'form.settings' ).on('submit', function(e){

  e.preventDefault();
  startGame();

});

// Listen for user's match guess
$( 'input.color' ).on('click', function(e){

  e.preventDefault();
  $( this ).attr('disabled', 'disabled');

  var inputClass = $( this ).attr( 'class' );
  updateScore( inputClass, 'click' );

});

// To do: move the play functionality over to it's own button
  // move settings into it's own module
  // add 'Pause' functionality



