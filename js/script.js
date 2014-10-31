// Global variables 
// n is the number of steps back for the n-back game
var n;

// souvenirs is the global array of objects whose properties the user must try to remember
var souvenirs;

// Function that saves the game variables
function getSettings(){
  n = $( '.nequals' ).val();
}

// Create a generateObjects function which will populate my global array of objects
function generateObjects(){

  souvenirs = [
    {
      color: red
    },
    {
      color: yellow
    },
    {
      color: blue
    },
    {
      color: purple
    },
    {
      color: green
    },
    {
      color: aqua
    },
    {
      color: orange
    },
    {
      color: brown
    }
  ];

};

// Create a startGame function 
function startGame(){

  //set correct and incorrect counters, both at 0
  var correct = 0;
  var incorrect = 0;

    nextStep();

};

// Create nextStep method, which decides if it should keep showing stuff
function nextStep(){

  //set counter, number of objectIndex, which starts at 0 and specifies which section of the souvenirs array to look at
  var objectIndex = 0;

};


// When the user clicks 'Play', get the settings, generate the objects and start the game.
$( 'form.settings' ).on('submit', function(e){
  e.preventDefault();

  getSettings();
  generateObjects();
  startGame();

});

