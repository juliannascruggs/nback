// Global variables 

// Settings variables
// n is the number of steps back for the n-back game
var n;

// the number times we display an object per game
var trials = 25;

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

  for ( var i = 0; i < trials; i++ ){

    var newSouvenir = new souvenir( colors[Math.floor(Math.random()*colors.length)] );
    souvenirs.push(newSouvenir);

  }

};

// Create a startGame function 
function startGame(){

  // set both the correct and incorrect counters to 0
  correct = 0;
  incorrect = 0;

  // set another counter, number of objectIndex, to start at 0 
  // recall, objectIndex specifies which section of the souvenirs array to look at
  objectIndex = 0;

  startTrials(n, trials, trialDuration)

};

// Create an interval timer that takes the game settings as arguments and changes out the objects
function startTrials(start, end, interval) {

  var timer = setInterval(function(){
    $(".counter").html(objectIndex);

    if ( objectIndex < souvenirs.length ){

      drawObject();
      objectIndex++;

    }else{
      endGame();
      clearInterval(timer);
    };

  }, interval);

};

// Create nextStep method, which decides if it should keep showing stuff
// function nextStep(){

//     drawObject();
//     objectIndex += 1;

// };

// function nextStep(){

//   if ( objectIndex < souvenirs.length ){
//     drawObject();
//     objectIndex += 1;
//   }else{
//     endGame();
//   };

// };

// Create a drawObject function, which draws the object of a particular index on the page.
function drawObject(){

  console.log(souvenirs[objectIndex]);
  $( '.souvenir' ).css( 'background-color', souvenirs[objectIndex].color )

};

// Create an endGame function, which shows the values of correct and incorrect
function endGame(){

  $( '.scoreboard' ).append('<p> Correct: ' + correct + '<br>Incorrect: ' + incorrect + '</p>')

};
  
// $("main").on("click", "button", function(){
//   startTrials(n, trials, trialDuration);
// });

// When the user clicks 'Play', get the settings, generate the objects and start the game.
$( 'form.settings' ).on('submit', function(e){
  e.preventDefault();

  getSettings();
  generateObjects();
  startGame();

});

$( 'form.controls' ).on('submit', function(e){
  e.preventDefault();

  // nextStep();

});









