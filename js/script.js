// Create global variables 
// n is the number of steps back for the n-back game
var n;

//Get settings and store them in global variables
$( 'form.settings' ).on('submit', function(e){

  e.preventDefault();
  n = $( '.nequals' ).val();

});