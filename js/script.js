// Create global variables 
// n is the number of steps back for the n-back game
var n;

//Get settings and store them in global variables
$( 'form.settings' ).on('submit', function(e){

  e.preventDefault();
  n = $( '.nequals' ).val();
  getSettings(n);

});

function getSettings(n){

  generateObjects();

  startGame();

}

// Create a generateObjects function which will populate my global array of objects
function generateObjects(){

};

// Create a startGame function 
function startGame(){

  //set correct and incorrect counters, both at 0
  var correct = 0;
  var incorrect = 0;

  //set counter, number of nbackIndex, which starts at 0 and specifies which section of the nback array to look at
  var nbackIndex = 0;

  nextStep();

};

// Create nextStep method, which decides if it should keep showing stuff
function nextStep(){

};


