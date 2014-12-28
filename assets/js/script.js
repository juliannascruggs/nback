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
var trialDisplay = 1700;
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

var colors = [];
var colorSet = { 
  highContrast: [
    '#ff0000',
    '#ff7e00',
    '#ffff53',
    '#60ff00',
    '#00927c',
    '#55bdff',
    '#5723ff',
    '#d957ff',
    '#ff278d',
    '#ffffff',
    '#fcfcfc'
  ], 
  colorBlind: [
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
  ]
};

var shapes = [];
var shapeSet = { 
  line: [
    'circle-thin',
    'heart-o',
    'moon-o',
    'bicycle',
    'paperclip',
    'star-o',
    'square-o',
    'bell-o',
    'lightbulb-o',
    'sun-o',
    'umbrella'
  ],
  fill: [
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
  ]
};

// * * * * * * * * * * * * * * * * * * * *
// * * *  Setup Functions
// * * * * * * * * * * * * * * * * * * * *

$( '.game-start' ).hide();
$( '.game-active' ).hide();
$( '.game-complete' ).hide();
$( '.controls' ).hide();

// * * *  Game Settings  * * *

// reset all the variables, stage the gameboard, apply the user's game settings
function resetGame(){

  // reset the counters
  colorResults = [];
  shapeResults = [];
  currentObject = 0;
  // empty souvenirs
  souvenirs = [];

  // collapse the header on small and medium devices
  if ($(window).width() <= 823) {  

    $( '.logo' ).addClass( 'collapsed' );
    $( '.slogan' ).fadeOut().slideUp();    

  }     
  
  // hide the scoreboard
  $( '.game-complete' ).hide();
  // disable the play and replay buttons
  $( 'button.play').attr('disabled', 'disabled');
  $( 'button.replay').attr('disabled', 'disabled');
  // swap the game board
  $( '.game-ready' ).hide();
  $( '.game-start' ).show();
  $( '.controls' ).fadeIn(1000);
  $( '.color' ).addClass( 'not-ready' );
  $( '.shape' ).addClass( 'not-ready' );

  // Apply the user's game settings
  trials = 25;
  n = $( '#n-equals' ).html();
  n = parseInt( n );
  trials += n;

  if ( n >= 2 ) {
    tutorial = false;
  }

  colors = colorSet.highContrast;
  shapes = shapeSet.line;

  generateSouvenirs();

}

// **** Moved to resetGame
// function setSettings(){
// }

// a souvenir object constructor, which will later have it's own settings 
function Souvenir( color, shape ) {
    this.color = color;
    this.shape = shape;
}

// a function used to shuffle the colors & shapes arrays
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

  // shuffle the colors and shapes arrays
  shuffle(colors);
  shuffle(shapes);

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

  addMatches();

}

// **** What is this? Clean it up.
function addMatchGeneric5000( index, property ){
  
  var object = souvenirs[index];
  var nBackObject = souvenirs[index - n];

  object.match = property;
  nBackObject.match = property;
  object[property] = nBackObject[property];

}

function addMatches(){

  var shapeMatch = 0;
  var colorMatch = 0;

  // 'start' is the while loop start index value, which is used to  for the tutorial and regular game
  var start = 0;

  // rig the first few matches if it's the tutorial
  if ( tutorial == true ) {

    for ( var p = 0; p < 9; p++ ){

      if ( p == 1){

        souvenirs[0].shape = 'star-o';
        addMatchGeneric5000( p, 'shape' );
        shapeMatch++;

      }else if( p == 3 ){
        souvenirs[2].shape = 'bicycle';
        addMatchGeneric5000( p, 'shape' );
        shapeMatch++;
      }else if( p == 2 || p == 4 || p == 6 ){
        // pass on these numbers
      }else if( p == 5 ){

        souvenirs[4].shape = 'sun-o';
        souvenirs[4].color = '#55bdff';
        souvenirs[5].shape = 'moon-o';
        addMatchGeneric5000( p, 'color' );
        colorMatch++;
      }else if( p == 7 ){

        souvenirs[6].color = '#60ff00';
        addMatchGeneric5000( p, 'color' );
        colorMatch++;

      }

      start = p;
      console.log( 'p equals' + p );

    }

  }

  // add shape matches until we have 5
  while ( shapeMatch < 5 ){

    for ( var p = start; p < souvenirs.length; p++ ){
      if ( p >= n && shapeMatch < 5 ){

        if ( Math.random() >= 0.8 ){

          if ( 'match' in souvenirs[p] !== true ){

            addMatchGeneric5000( p, 'shape' );
            shapeMatch++;

          }
        }
      }
    }

  }

  // add color matches until we have 5
  while ( colorMatch < 5 ){

    for ( var p = start; p < souvenirs.length; p++ ){
      if ( p >= n && colorMatch < 5 ){

        if ( Math.random() >= 0.8 ){

          if ( 'match' in souvenirs[p] !== true ){

            addMatchGeneric5000( p, 'color' );
            colorMatch++;

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

// **** Merged with startGame
// function startCountdown(){
//}

// show a countdown before the timer starts 
function startGame(){

  // Get the settings, generate the objects and start the countdown

  resetGame();
  console.log('Game Start');

  //  setSettings();
  //  startCountdown();
  // $( '.cbp-hsmenu' ).addClass( 'disabled' );
  // $( '.cbp-hsmenu li a' ).addClass( 'disabled' );

  if ( tutorial !== true ){
    // start countdown
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

    runTutorial( n, trials, 3000 );

  }
 
}

// * * *  Game Tutorial  * * * 

// animate match button hint arrow
function hintArrow( nudge ){
  nudge.animate({opacity: '0.2'}, 'fast');
  nudge.animate({opacity: '1.0'}, 'fast');
  nudge.fadeOut();
}

// queue match button hint arrow
function tutorialHint( button ){

  setTimeout( function(){
    if ( button.attr('disabled') !== 'disabled' ){
      var arrow = button.find( 'span' );
      arrow.fadeIn( 500, function(){
        hintArrow( arrow );
      });
    }
  }, 1500 )

}


// basic shape instructions
function tutorialStageOne(){

  var tutorialOneStrings = [

    '<p>So, you want to be a genius.</p>',
    '<p>Step 1:<br>We show you some shapes.</p>',
    '<p>Step 2:<br>You tell us when you see a match.</p>',
    '<p>Let&rsquo;s try it...</p>',

  ];

  var i = 0;
  $( '.counter' ).html( tutorialOneStrings[i] );

  var tutorialOne = setInterval( function(){
    i++
    if ( i < tutorialOneStrings.length ) {
      $( '.counter' ).html( tutorialOneStrings[i] );
    }else{
      clearInterval( tutorialOne );
      tutorialStageTwo();
    }

  }, 2500 );

}

function tutorialStageTwo(){

  $( '.game-start' ).hide();
  $( '.game-active' ).show(); 

  var tutorialTwoStrings = [

    '<p>Hark! A shining star.</p>',
    '<p>Press the button if this shape matches the one before.</p>',
    '<p>Look for shapes that match the one before.</p>',
    '<p>Look for shapes that match the one before.</p>'

  ];

  var i = 0;
  $( '.tutorial' ).html( tutorialTwoStrings[i] );
  drawObject();

  var tutorialTwo = setInterval( function(){

    i++
    updateScore( 'color', 'time' );
    updateScore( 'shape', 'time' );
    currentObject++;
    drawObject();

    // enable the shape match button when we reach 'n'
    if ( currentObject >= n ){
      $( 'button.shape' ).removeAttr( 'disabled' );
      $( 'button.shape' ).removeClass( 'not-ready' );
    }

    if ( i < tutorialTwoStrings.length ) {
      $( '.tutorial' ).html( tutorialTwoStrings[i] );

      if ( i == 1 || i == 3 ){
        tutorialHint( $( 'button.shape' ) );
      }

    }else{
      clearInterval( tutorialTwo );
      tutorialStageThree();
    }

  }, 3000 );

}

function tutorialStageThree(){

  $( '.game-start' ).show();
  $( '.game-active' ).hide();
  $( 'button.shape').attr('disabled', 'disabled');
  $( 'button.shape' ).addClass( 'not-ready' );

  var tutorialThreeStrings = [

    '<p>Child&rsquo;s play, right?</p>',
    '<p>Let&rsquo;s add color to the mix.</p>',
    '<p>This time, watch for color and shape matches.</p>',
    '<p>Let&rsquo;s try it out...</p>',

  ];

  var i = 0;
  $( '.counter' ).html( tutorialThreeStrings[i] );

  var tutorialThree = setInterval( function(){
    i++
    if ( i < tutorialThreeStrings.length ) {
      $( '.counter' ).html( tutorialThreeStrings[i] );
    }else{
      clearInterval( tutorialThree );
      tutorialStageFour();
    }

  }, 2500 );

}

function tutorialStageFour(){

  $( '.game-start' ).hide();
  $( '.game-active' ).show(); 

  var tutorialFourStrings = [

    '<p>A blue sun...</p>',
    '<p>And a blue moon. Aha!</p>',
    '<p>Look for colors and shapes that match the one before.</p>',
    '<p>Look for colors and shapes that match the one before.</p>'

  ];

  var i = 0;
  $( '.tutorial' ).html( tutorialFourStrings[i] );
  drawObject();

  var tutorialFour = setInterval( function(){

    i++
    updateScore( 'color', 'time' );
    updateScore( 'shape', 'time' );
    currentObject++;
    drawObject();

    // enable the color match button when we reach 'n'
    if ( currentObject >= n ){
      $( 'button.shape').removeAttr('disabled');
      $( 'button.color').removeAttr('disabled');
      $( 'button.color' ).removeClass( 'not-ready' );
    }

    if ( i < tutorialFourStrings.length ) {
      $( '.tutorial' ).html( tutorialFourStrings[i] );

      if ( i == 1 || i == 3 ){
        tutorialHint( $( 'button.color' ) );
      }

    }else{
      endGame();
      clearInterval( tutorialFour );
      tutorial = false;
    }

  }, 3000 );

}

// progress the game at an interval or end the game
function runTutorial( start, end, interval ) {

  console.log('Game Active, Start Tutorial');
  tutorialStageOne();

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
        $( 'button.color' ).removeClass( 'not-ready' );
        $( 'button.shape' ).removeClass( 'not-ready' );

      }

    }else{
      endGame();
      clearInterval(timer);
    }

  }, interval );

}

// draw the currentObject on the gameboard
function drawObject(){
      
  $( '.souvenir' ).animate({ opacity: 1.0 }, 300);
  $( '.souvenir' ).css( 'color', souvenirs[currentObject].color );
  $( '.souvenir .fa' ).removeClass().addClass('fa fa-' + souvenirs[currentObject].shape );
  
  setTimeout( function(){
    $( '.souvenir' ).animate({ opacity: 0.0 }, 300);
  }, trialDisplay );

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
  $( 'button.color' ).addClass( 'not-ready' );
  $( 'button.shape' ).addClass( 'not-ready' );

  $( '.game-active' ).hide();
  $( '.game-complete' ).show();
  $( '.controls' ).fadeOut(1000);
  $( '.tutorial' ).empty();

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