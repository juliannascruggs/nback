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
var colorResults = [];
var shapeResults = []
var colorCorrect;
var colorIncorrect;
var shapeCorrect;
var shapeIncorrect;

// my property arrays
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
  '#FC7B44',
  '#F65469'

];

var shapes = [

  'circle',
  'star',
  'square',
  'flash',
  'heart',
  'remove',
  'comment',
  'cloud',
  'bell',
  'asterisk',
  'tree'

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

}

// a souvenir object constructor, which will later have it's own settings 
function Souvenir( color, shape ) {
    this.color = color;
    this.shape = shape;
}

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
  }

  return array;

}

// * * *  Game Components  * * *

// generate the souvenirs array
function generateSouvenirs(){

  // seed the souvenir pool with one object of each color
  for ( var i = 0; i < colors.length; i++ ){
    var seedSouvenir = new Souvenir( colors[i], shapes[i] );
    souvenirs.push( seedSouvenir );
  }

  while( souvenirs.length < trials ){

    var dupeFound = false;
    // generate a souvenir with a random color
    var newSouvenir = new Souvenir( colors[Math.floor(Math.random()*colors.length)], shapes[Math.floor(Math.random()*shapes.length)] );
    for ( var k = souvenirs.length - 1; k > souvenirs.length - 11; k-- ){

      if ( newSouvenir.color == souvenirs[k].color || newSouvenir.shape == souvenirs[k].shape ){
        dupeFound = true;
        break;
      }

    }

    if ( dupeFound !== true ){
      // populate the souvenirs array 
      souvenirs.push( newSouvenir );
    }

  }
  console.log( 'We broke of the while loop!! ' + souvenirs );
  addColorMatches();

}

function addColorMatches(){
  var colorMatchCount = 0;

  while ( colorMatchCount < 5 ){

    for ( var j = 0; j < souvenirs.length; j++ ){
      if ( j >= n && colorMatchCount < 5 ){
      console.log(colorMatchCount);

        if ( Math.random() >= 0.8 ){

          if ( 'match' in souvenirs[j] !== true ){
//            console.log( souvenirs[j].match );
            souvenirs[j].match = 'color';
            souvenirs[j - n].match = 'color';
            souvenirs[j].color = souvenirs[j - n].color;
            colorMatchCount++;

          }
        }
      }
    }
  }
}

function addShapeMatches(){
  var shapeMatchCount = 0;

  while ( shapeMatchCount < 5 ){

    for ( var l = 0; l < souvenirs.length; l++ ){
      if ( l >= n && shapeMatchCount < 5 ){
      console.log(shapeMatchCount);

        if ( Math.random() >= 0.8 ){

          if ( 'match' in souvenirs[l] !== true ){
            souvenirs[l].match = 'shape';
            souvenirs[l - n].match = 'shape';
            souvenirs[l].shape = souvenirs[l - n].shape;
            shapeMatchCount++;

          }
        }
      }
    }
  }
}

// * * * * * * * * * * * * * * * * * * * *
// * * *  Game Logic
// * * * * * * * * * * * * * * * * * * * *

// * * *  Game Ready  * * *

// reset all the variables and setup the game
function resetGame(){

  // reset the counters
  colorResults = [];
  colorCorrect = 0;
  colorIncorrect = 0;

  shapeResults = [];
  shapeCorrect = 0;
  shapeIncorrect = 0;

  currentObject = 0;
  trials = 25;

  // empty souvenirs
  souvenirs = [];

  // shuffle the colors and shapes arrays
  shuffle(colors);
  shuffle(shapes);

  // reset the scoreboard
  $( '.scoreboard' ).empty();
  // disable the play button
  $( 'input.settings').attr('disabled', 'disabled');

}

function startGame(){

  resetGame();

  // Get the settings, generate the objects and start the countdown
  setSettings();
  generateSouvenirs();
  startCountdown();
  console.log('Game Ready');

}

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
      runTrials( n, trials, trialDuration );
      clearInterval( countdown );
    }
// TODO: set this back to 1000 later
  }, 10 );

}

// * * *  Game Active  * * * 

// progress the game at an interval or end the game
function runTrials( start, end, interval ) {

  $( '.counter' ).html( 'GOH!!' );
  console.log('Game Active');

  // draw the first object
  drawObject();
  // start the trials timer
  var timer = setInterval( function(){
    // updateScore here, so we can calculate the current results before moving on to the next object 
    updateScore( 'color', 'time' );
    updateScore( 'shape', 'time' );

    // increment currentObject here, so currentObject is always the index of the object on screen
    currentObject++;

    $( '.counter' ).html( currentObject );

    if ( currentObject < trials ){
      drawObject();
      // enable the match buttons if we've reached n
      if ( currentObject >= n ){
        $( 'input.color').removeAttr('disabled');
        $( 'input.shape').removeAttr('disabled');
      }

    }else{
      endGame();
      clearInterval(timer);
    }

  }, interval );

}

// draw the currentObject on the gameboard
function drawObject(){
  $( '.souvenir' ).css( 'color', souvenirs[currentObject].color );
  $( '.fa' ).removeClass().addClass('fa fa-5x fa-' + souvenirs[currentObject].shape );
}

// check if the currentObject.property is equal to nBackObject.property
function compareNback( property ){
  return souvenirs[currentObject][property] == souvenirs[currentObject - n][property];
}

// check if the user's input (or lack thereof) was correct and update the results array
function updateScore( property, action ){

  if (property == 'color'){
    // if the user already provided an input, or if there's no object at the n-back index, don't continue
    if( colorResults[currentObject] != null || currentObject < n ){
      return false;  
    }

    if ( compareNback( property ) == true && action == 'click' ){
      // if it's a match, and the user clicked match button, increment score correct
      console.log( 'Correct click' );
      colorResults[currentObject] = true;

    }else if( compareNback( property ) == false && action == 'time'){
      // if it isn’t a match, and the user did’t click match button, increment score correct
      console.log( 'Correct time' );
      colorResults[currentObject] = true;
    }else{
      // if it is a match and the user didn’t click match button, increment score incorrect
      // or if it isn’t a match, and the user clicks match button, increment score incorrect
      console.log( 'Incorrect ' + action );
      colorResults[currentObject] = false;
    }
  }else if( property == 'shape' ){
    // if the user already provided an input, or if there's no object at the n-back index, don't continue
    if( currentObject < n || shapeResults[currentObject] != null ){
      return false;  
    }

    if ( compareNback( property ) == true && action == 'click' ){
      // if it's a match, and the user clicked match button, increment score correct
      console.log( 'Correct click' );
      shapeResults[currentObject] = true;

    }else if( compareNback( property ) == false && action == 'time'){
      // if it isn’t a match, and the user did’t click match button, increment score correct
      console.log( 'Correct time' );
      shapeResults[currentObject] = true;
    }else{
      // if it is a match and the user didn’t click match button, increment score incorrect
      // or if it isn’t a match, and the user clicks match button, increment score incorrect
      console.log( 'Incorrect ' + action );
      shapeResults[currentObject] = false;
    }
  }
}

// * * *  Game Complete  * * *

// show the values of correct and incorrect
function endGame(){

  console.log('Game Complete');
  getResults();
  $( '.scoreboard' ).append( '<p>Color Correct: ' + colorCorrect + ', Color Incorrect: ' + colorIncorrect + '</p><p>Shape Correct: ' + shapeCorrect + ', Shape Incorrect: ' + shapeIncorrect + '</p>' );
  //reset the buttons
  $( 'input.settings').removeAttr('disabled');
  $( 'input.color').attr('disabled', 'disabled');
  $( 'input.shape').attr('disabled', 'disabled');

}

// iterate over the results array to get the final results
function getResults(){

  for ( var i = 0; i < colorResults.length; i++ ){
    if ( colorResults[i] == true ){
      colorCorrect++;
    }else if ( colorResults[i] == false ){
      colorIncorrect++;
    }
  }

  for ( var m = 0; m < shapeResults.length; m++ ){
    if ( shapeResults[m] == true ){
      shapeCorrect++;
    }else if ( shapeResults[m] == false ){
      shapeIncorrect++;
    }
  }

}

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

$( 'input.shape' ).on('click', function(e){

  e.preventDefault();
  $( this ).attr('disabled', 'disabled');

  var inputClass = $( this ).attr( 'class' );
  updateScore( inputClass, 'click' );

});

// To do: move the play functionality over to it's own button
  // move settings into it's own module
  // add 'Pause' functionality