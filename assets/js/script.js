// * * * * * * * * * * * * * * * * * * * *
// * * *  Global Variables
// * * * * * * * * * * * * * * * * * * * *

// * * *  Game Settings  * * *

// n is the number of steps back for the n-back game
var n;
// the number times the user needs to guess, per game
var trials;
// the the duration of each trial in ms, defines timer duration in runTrials function
var trialDuration = 2500;

var tutorial = true;

// * * *  Game Components  * * *

// the global array of objects whose properties the user must try to remember
var souvenirs = [];
// specifies which object in the souvenirs array is being displayed at any given time
var currentObject;

// the user's score
var colorResults = [];
var shapeResults = []

// my property arrays
var colors = [

  '#b70707',
  '#e88a25',
  '#f9e14b',
  '#efed89',
  '#7abf66',
  '#099fb0',
  '#b87272',
  '#6a4a3d',
  '#273540',
  '#d6f5ec',
  '#ff8a84'

];

var shapes = [

  'bug',
  'rocket',
  'bomb',
  'send',
  'puzzle-piece',
  'quote-right',
  'leaf',
  'paw',
  'tint',
  'truck',
  'flash'

];

// * * * * * * * * * * * * * * * * * * * *
// * * *  Setup Functions
// * * * * * * * * * * * * * * * * * * * *

$( '.game-start' ).hide();
$( '.game-active' ).hide();
$( '.game-complete' ).hide();
$( '.controls' ).hide();

// * * *  Game Settings  * * *

// apply the user's game settings
function setSettings(){

  trials = 25;

  n = $( '#n-equals' ).html();
  console.log('n equals ' + n);
  n = parseInt( n );
  trials += n

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

  if ( tutorial !== true ) {
    addShapeMatches();
  }else{
    addTutorialShapeMatches();
  }

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

function addTutorialShapeMatches(){
  var matchCount = 0;

  while ( matchCount < 5 ){

    for ( var p = 0; p < souvenirs.length; p++ ){
      if ( p >= n && matchCount < 5 ){
      console.log(matchCount);

        // var tutorialMatchGenerator = 2;
        if ( p == 1 ){

          souvenirs[p].match = 'shape';
          souvenirs[p - n].match = 'shape';
          souvenirs[p].shape = souvenirs[p - n].shape;
          matchCount++;

        }else if( p == 3 ){

          souvenirs[p].match = 'shape';
          souvenirs[p - n].match = 'shape';
          souvenirs[p].shape = souvenirs[p - n].shape;
          matchCount++;

        }else{

          if ( Math.random() >= 0.8 ){

            if ( 'match' in souvenirs[p] !== true ){

              souvenirs[p].match = 'shape';
              souvenirs[p - n].match = 'shape';
              souvenirs[p].shape = souvenirs[p - n].shape;
              matchCount++;

            }
          }
        }
      }
    }
  }
}

// * * * * * * * * * * * * * * * * * * * *
// * * *  Game Logic
// * * * * * * * * * * * * * * * * * * * *

// * * *  Game Start  * * *

// reset all the variables and setup the game
function resetGame(){

  // reset the counters
  colorResults = [];
  shapeResults = [];

  currentObject = 0;

  // if (tutorial !== true){
  //   trials = 25;
  // }else{   
  //   trials = 15;
  // }

  // empty souvenirs
  souvenirs = [];

  // shuffle the colors and shapes arrays
  shuffle(colors);
  shuffle(shapes);

  // hide the scoreboard
  $( '.game-complete' ).hide();

  // disable the play and replay buttons
  $( 'button.play').attr('disabled', 'disabled');
  $( 'button.replay').attr('disabled', 'disabled');

  // collapse the header on small and medium devices
  if ($(window).width() <= 823) {  

    $( '.logo' ).addClass( 'collapsed' );
    $( '.slogan' ).fadeOut().slideUp();    

  }     

}

function startGame(){

  resetGame();

  // Get the settings, generate the objects and start the countdown
  setSettings();
  generateSouvenirs();
  startCountdown();
  console.log('Game Start');

}

// show a countdown before the timer starts 
function startCountdown(){

  // swap the game board
  $( '.game-ready' ).hide();
  $( '.game-start' ).show();
  $( '.controls' ).fadeIn(1000);
  // $( '.cbp-hsmenu' ).addClass( 'disabled' );
  // $( '.cbp-hsmenu li a' ).addClass( 'disabled' );

  if ( tutorial !== true ){

    var counter = 3;

    $( '.counter' ).html( '<h3>n=' + n + '</h3>' );

    var countdown = setInterval( function(){

      // show the countdown
      if ( counter > 0 ){
        $( '.counter' ).html( '<h3>' + counter + '</h3>' );
      }else{
        $( '.counter' ).html( '<h3>Go</h3>' );
      }

      if ( counter > -1 ){
        counter--;
      }else{
        // when the countdown ends, call runTrials, passing game settings in as arguments
        runTrials( n, trials, trialDuration );
        clearInterval( countdown );

      }

    }, 1500 );

  }else{

    // run the tutorial
    runTutorial( n, trials, trialDuration );

  }

  
}

// * * *  Game Tutorial  * * * 

// progress the game at an interval or end the game
function runTutorial( start, end, interval ) {

  $( '.game-start' ).hide();
  $( '.game-active' ).show(); 
  console.log('Game Active');

  var tutorialStage = 7;

  // start tutorial messages
  $( '.tutorial' ).html( '<p><br><br>Remember this shape, okay?</p>' );

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
      // just enable the shape match button, when we reach 'n'
      if ( currentObject >= n ){

        $( 'button.shape').removeAttr('disabled');
        // $( 'button.color').removeAttr('disabled');

        if ( tutorialStage >= 7) {

          $( '.tutorial' ).html( '<p><br><br>Does this shape match the previous?</p>' );
          tutorialStage--;

        }else if ( tutorialStage >= 6) {

          $( '.tutorial' ).html( '<p><br><br>If this shape is the same as 1 before...</p>' );
          tutorialStage--;

        }else if ( tutorialStage >= 5) {

          $( '.tutorial' ).html( '<p><br><br>...then we have a match!</p>' );
          tutorialStage--;

        }else if ( tutorialStage >= 4) {

          $( '.tutorial' ).html( '<p><br><br>Now how about the color?</p>' );
          tutorialStage--;
          $( 'button.color').removeAttr('disabled');

        }else if ( tutorialStage >= 3) {

          $( '.tutorial' ).html( '<p><br><br>Guess if the color is the same as 1 before.</p>' );
          tutorialStage--;
          $( 'button.color').removeAttr('disabled');

        }else if ( tutorialStage >= 2) {

          $( '.tutorial' ).html( '<p><br><br>You will guess 20 more times.</p>' );
          tutorialStage--;
          $( 'button.color').removeAttr('disabled');

        }else{

          $( '.tutorial' ).html( '<p><br><br>Then we will calculate your score.</p>' );
          tutorialStage--;
          $( 'button.color').removeAttr('disabled');

        }

      }

    }else{
      endGame();
      tutorial = false;
      clearInterval(timer);
    }

  }, interval );

}

// * * *  Game Active  * * * 

// progress the game at an interval or end the game
function runTrials( start, end, interval ) {

  $( '.game-start' ).hide();
  $( '.game-active' ).show(); 
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
        $( 'button.color').removeAttr('disabled');
        $( 'button.shape').removeAttr('disabled');
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
    $( '.souvenir .fa' ).removeClass().addClass('fa fa-lg fa-' + souvenirs[currentObject].shape );

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
  $( '.scoreboard' ).html('<li class="result"><h3>' + resultsPercentage( colorResults ) + '<span>%</span></h3><span>Color</span></li><li class="result"><h3>' + resultsPercentage( shapeResults ) + '<span>%</span></h3><span>Shape</span></li>');
  //reset the buttons
  $( 'button.replay').removeAttr('disabled');
  $( 'button.color').attr('disabled', 'disabled');
  $( 'button.shape').attr('disabled', 'disabled');
  $( '.game-active' ).hide();
  $( '.game-complete' ).show();
  $( '.controls' ).fadeOut(1000);

  if ($(window).width() <= 823) {  

    $( '.logo' ).removeClass( 'collapsed' );
    $( '.slogan' ).slideDown().fadeIn();

  }

}

// iterate over the results array to get the final results
function resultsPercentage( propertyResults ){

  var correct = 0;
  var incorrect = 0;

    for ( var i = 0; i < propertyResults.length; i++ ){
      if ( propertyResults[i] == true ){
        correct++;
      }else if ( propertyResults[i] == false ){
        incorrect++;
      }
    }

    correct = ( correct/(correct + incorrect) )*100;
    correct = correct.toFixed();

    return correct;

}

// * * * * * * * * * * * * * * * * * * * *
// * * *  Interactivity
// * * * * * * * * * * * * * * * * * * * *

// * * *  Game Ready  * * *

// Listen for nBack setting
$( '.n-equals-submenu li a' ).on('click', function(e){
  e.preventDefault();

  $( '.n-equals-submenu li a' ).removeClass( 'active' );
  $( this ).addClass( 'active' );
  $( '#n-equals' ).empty().append( $( this ).find('h3').html() );

});

// Listen for a 'Play' button click
$( 'button.play' ).on('click', function(e){

  e.preventDefault();
  startGame();

});

// * * * Game Active * * *

// Listen for user's match guess
$( 'button.color' ).on('click', function(e){

  e.preventDefault();
  $( this ).attr('disabled', 'disabled');

  var buttonClass = $( this ).attr( 'class' );
  updateScore( buttonClass, 'click' );

});

$( 'button.shape' ).on('click', function(e){

  e.preventDefault();
  $( this ).attr('disabled', 'disabled');

  var buttonClass = $( this ).attr( 'class' );
  updateScore( buttonClass, 'click' );

});

// * * * Game Complete * * *

// Listen for a 'Replay' button click
$( 'button.replay' ).on('click', function(e){

  e.preventDefault();
  startGame();

});



// To do:
  // add a tutorial
  // add 'Pause' functionality