// Global variables 

// Settings variables
// n is the number of steps back for the n-back game
var n;

// the number of objects displayed per game
var trials = 20;

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
  trials += parseInt(n);
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

  nextStep();

};

// Create nextStep method, which decides if it should keep showing stuff
function nextStep(){

  if ( objectIndex < souvenirs.length ){
    drawObject();
    objectIndex += 1;
  }else{
    endGame();
  };

};

// Create a drawObject function, which draws the object of a particular index on the page.
function drawObject(){

  console.log(souvenirs[objectIndex]);
  $( '.souvenir' ).css( 'background-color', souvenirs[objectIndex].color )

};

// Create an endGame function, which shows the values of correct and incorrect
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

  nextStep();

});









