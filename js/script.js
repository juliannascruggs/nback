$(document).ready(function(){
  $('#slides').slick({
     autoplay: true, 
     autoplaySpeed: 2000, 
     fade: true, 
     cssEase: 'linear' 
  });
});

$( function() {

  // TODO #1 Set an event listener to listen for clicks on each menu section
  // heading anchor

  // Note: my menu section headings look like this:
  //
  // <div class="menu-section">
  //   <h3>
  //     <a href="#" class="menu-section-item" id="dinner">
  //       Dinner
  //     </a>
  //   </h3>
  //   ...

  // I've given all of the anchors the same class so that I can easily target
  // all of them with jQuery

  $( document ).on( 'click', '.menu-section-item', function( event ) {
    // Prevent the default action of the event
    event.preventDefault();

    // Assign the id of the clicked element (this) to a variable named id
    var id = $( this ).attr( "id" );

    // Once you're started with TODO #2, call the getMenu function here,
    // passing id as the argument
    getMenu( id );
  });



  // TODO #2 Create a function, getMenu, to get the menu for a course

  // There are menus available for each course:
  // - ./json/menu-breakfast.json
  // - ./json/menu-lunch.json
  // - ./json/menu-dinner.json
  // - ./json/menu-dessert.json
  // - ./json/menu-cocktails.json
  // - ./json/menu-wine.json

  // By setting a parameter of `course`, we can pass the course we want the
  // menu for into this function

  function getMenu( course ) {
    // Use `$.getJSON` to get the menu for whatever menu heading was clicked
    $.getJSON( 'json/menu-' + course + '.json', function( json ) {
      populateMenu( json );
      // Once you're started with TODO #3, call the populateMenu function here
      // and pass json as the argument
    });

    // Remove the class 'is-active' from all menu item headings
    $( '.menu-section-item' ).removeClass( 'is-active' );

    // Add 'is-active' to this specific action that was clicked (this). is-active
    // provides the visual cue for what's active via CSS
    $( '#' + course ).addClass( 'is-active' );

  }




  // TODO #3 Create a function, populateMenu, to add a menu to the DOM

  function populateMenu( json ) {
    html = '';

    // start a for loop that iterates through json.length
    // add json.length into this for loop code
    for( var i = 0; i < json.length; i++ ){
      // wrap each section in a menu-group div
      html += '<div class="menu-group columns small-12 medium-4">';
      // append inside the menu-group div a h4 with the json section name in it
      // all the content in this for loop will follow this same model:
      // put the correct content in between the blank + + signs.
      html += '<h4>' + json[i].section + '</h4>';

      // inside each menu-group section, start a for loop that
      // prints out each menu-item div
      for( var j = 0; j < json[i].content.length; j++ ) {
        // for each menu item in json[i].content, create a menu-item div
        html += '<div class="menu-item clearfix">';
        // inside each menu-item div, create a div for dish, ingredients, and price
        // add json[i]content[j].THING where THING is dish, ingredient, price.
        html += '<div class="menu-item-dish">' + json[i].content[j].dish + '</div>';
        html += '<p class="menu-item-ingredients">' + json[i].content[j].ingredients + '</p>';
        html += '<div class="menu-item-price">' + json[i].content[j].price + '</div>';
        html += '</div>';
      }

      html += '</div>';
    }

    // Use `.html` to replace the contents of `.menu-section-content`
    $( '.menu-section-content' ).html( html );
  }

    // TODO #4 Call getMenu with a menu of your choice and set that menu's
    // header to active so that a menu is loaded with the page by default

    getMenu('breakfast');
});
