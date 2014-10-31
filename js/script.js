// Global variables 
// n is the number of steps back for the n-back game
var n;

// souvenirs is the global array of objects whose properties the user must try to remember
var souvenirs;

// keep track of the user's score
var correct;
var incorrect;

// specifies which section of the souvenirs array to look at in the nextStep function
var objectIndex;

// Function that saves the game variables
function getSettings(){
  n = $( '.nback' ).val();
}

// Create a generateObjects function which will populate my global array of objects
function generateObjects(){

  souvenirs = [
    {
      color: 'red'
    },
    {
      color: 'yellow'
    },
    {
      color: 'blue'
    },
    {
      color: 'purple'
    },
    {
      color: 'green'
    },
    {
      color: 'aqua'
    },
    {
      color: 'orange'
    },
    {
      color: 'brown'
    }
  ];

  console.log(souvenirs);

};

// Create a startGame function 
function startGame(){

  // set both the correct and incorrect counters to 0
  correct = 0;
  incorrect = 0;

  // set another counter, number of objectIndex, to start at 0 
  // recall, objectIndex specifies which section of the souvenirs array to look at
  objectIndex = 0;

  if ( objectIndex < souvenirs.length ){
    nextStep();
  }else{
    endGame();
  };

};

// Create nextStep method, which decides if it should keep showing stuff
function nextStep(){

  drawObject();
  objectIndex += 1;

};

// Create a drawObject function, which draws the object of a particular index on the page.
function drawObject(){

  console.log(souvenirs[objectIndex]);
  $()

};

// Create an endGame function, which shows the values of correct and incorrect
function endGame(){

};

// When the user clicks 'Play', get the settings, generate the objects and start the game.
$( 'form.settings' ).on('submit', function(e){
  e.preventDefault();

  getSettings();
  generateObjects();
  startGame();

});

