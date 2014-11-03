// Global variables 

// Settings variables
// n is the number of steps back for the n-back game
var n;

// the number times we display an object per game
var trials = 25;

// the the duration of each trial in ms, defines tmer duration in startTrials function
var trialDuration = 1000;

// souvenirs is the global array of objects whose properties the user must try to remember
var souvenirs = [];

// keep track of the user's score
var correct;
var incorrect;
var results = []

// specifies which section of the souvenirs array to look at in the nextStep function
var currentObject;

// Function that saves the game variables
function getSettings(){

  n = $( '.nback' ).val();

}

// Create a color array
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
  '#B60040',
  '#D7EF08',
  '#BD7B8A',
  '#341709'
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

  // Later, add lures to currentObject nBack +1
  // Then, add lures to currentObject nBack -1 

};

// Create a startGame function 
function startGame(){
  // set both the correct and incorrect counters to 0
  correct = 0;
  incorrect = 0;
  // set another counter, number of currentObject, to start at 0 
  // recall, 'currentObject' specifies which section of the souvenirs array to look at
  currentObject = 0;
  results = [];
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
// TODO: set this back to 1000 later
  }, 10);

};


// Progress the game at an interval or ends the game
function startTrials( start, end, interval ) {

  $( '.counter' ).html( 'GOH!!' )
  // Draw the first object
  drawObject();
  // Start the trials timer
  var timer = setInterval( function(){
    // increment the currentObject here, so currentObject is always the index of the object on screen;
    updateScore( 'color', 'time' );
    
    currentObject++;
    $( '.counter' ).html( currentObject );

    
    if ( currentObject < trials ){
      drawObject();
      // enable the color match button if we've reached n
      if ( currentObject >= n ){
        $( 'input.color').removeAttr('disabled');
    }

    }else{
      endGame();
      clearInterval(timer);
    };

  }, interval );

};

// draw the current souvenir on the gameboard
function drawObject(){
  $( '.souvenir' ).css( 'background-color', souvenirs[currentObject].color )
};

// Show the values of correct and incorrect
function endGame(){

  $( '.scoreboard' ).append('<p> Correct: ' + correct + '<br>Incorrect: ' + incorrect + '</p>')
  //reset the buttons
  $( 'input.settings').removeAttr('disabled');
  $( 'input.color').attr('disabled', 'disabled');

};

// checks if the currentObject.property is equal to nBackObject.property
function compareNback( property ){

  // console.log('property to compare is: ' + property)
  // console.log(souvenirs[currentObject - n][property] + ' is a ' + property)
  if(currentObject < n){
    return false;
  }
  // if (souvenirs[currentObject][property] == souvenirs[currentObject - n][property]){
  //   console.log('Correct, ' + souvenirs[currentObject - n][property] + ' is a ' + property + ' match!')
  // }else{
  //   console.log('Fay-yullll, we do not have a ' + property + ' match.')
  // }

  return souvenirs[currentObject][property] == souvenirs[currentObject - n][property];


};

function updateScore( property, action ){
//  console.log( 'updatescore called for: ' + button.attr( 'class' ) )
  
  console.log( compareNback( property ));
  if(results[currentObject] != null){
    return false;  
  } 

  if ( compareNback( property ) == true && action == 'click' ){
    console.log('Correct click');
    results[currentObject] = true;
    correct++;
  }else if(compareNback( property ) == false && action == 'time'){
    console.log('Correct time');
    results[currentObject] = true;
    correct++;
  }else{
    console.log('Incorrect ' + action);
    results[currentObject] = false;
    incorrect++;
  };

};

  // if it is, and 
  //      the user clicks match button, increment score correct
  //      the user doesn’t click match button, increment score incorrect

  // if it isn’t, and 
  //      the user clicks match button, increment score incorrect
  //      the user doesn’t click match button, increment score correct


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
$( 'input.color' ).on('click', function(e){
  e.preventDefault();
  $( this ).attr('disabled', 'disabled');

  var inputClass = $( this ).attr( 'class' );
  updateScore( inputClass, 'click' );


  // if ( 'match' in souvenirs[currentObject] ){
  //   console.log('CORRECT');
  //   correct++;
  // }else{
  //   console.log('INCORRECT');
  //   incorrect++;
  // }

});





