Logic behind an n-back game

Game:
	X display x # of objects sequentially
	X randomize the value of the object properties
	X user selects which properties they believe they saw n # of intances ago
	X compare user selection to object property n # instances ago
	X deem it right or wrong
	message that immediately
	X calculate a percentage of how much the user remembered correctly vs. not for each property type

Game settings:
	X Number of objects to play: trials
	X Object properties: object constructor
	X n-back: n
	X score: incorrect/correct counts

Properties:
	X color
	position[0,0]
	X shape
	sound

Sequence
	X create objects with random properties
		X create matches
		X create fillers
		  create lures
	X store the objects
	X show the objects
	X compare the object's properties to the properties of object n
	X listen to the user's input on click
	X compare the user's property guesses to the object's properties for incorrect/correctness
	X store the correct and incorrect values

Layout
	X Status
		X Game ready
		X Game active
		X Game paused
		X Game complete	
	X Gameboard
		X Stage
		Controls
	Settings
		Object property toggle
		X N value
		Speed (time between objects)
		Flash time (% of time window in which the object is visible)


X display a settings page
X user sets the setting for "n"
X call getSettings function
X store the inputs in global variables
X call a generateObjects function which will populate my global array of objects
X call startGame function

X set correct and incorrect counters, both at 0
X set counter, number of nbackIndex, which starts at 0 and is the section of the array to look at
X call nextStep method, which decides if it should keep showing stuff
X draw the first object
X check and see if: nbackIndex is < nbacks.length
X then, show an nback and + 1 to the nbackIndex counter
	(nbacksToShow is game length, ex. 20)
X else: call endGame method, which shows correct and incorrect values

X use a button to call nextStep, and display your nbackIndex value

then focus on gettin renderNback to:
X have a timer 
X have a submit button that calls a function to check if you're right or wrong

	var nbacks = []
	var nbackIndex = 0
	nbacks[nbackIndex]

X the generateObjects function should be populated programatically from other arrays
X create an array of colors
X choose a random color by getting a random position in the array

X disable play button during the game, reenable on endGame
X disable match button on click, renable match button at the start of each interval


X add logic to calculate incorrect "misses"
X 	write a function to check if current objectIndex.property == nBackObject.property

X if it is, and 
X      the user clicks match button, increment score correct
X      the user doesn’t click match button, increment score incorrect

X if it isn’t, and 
X      the user clicks match button, increment score incorrect
X      the user doesn’t click match button, increment score correct

---------------

Adding shapes

X get some shapes by adding font.awesome to my index.html file
X how would I get a shape to occupy the entirety of my gameboard div?

To do: 
X design logic for 1/5 matches
X take my souvenirs array and replace 5 of them with their n-back

message correct/incorrect on match button click
make object fade away between intervals

Design my responsive game board
Build a responsive gameboard
Add position

X Add shapes
Add sounds

X Move settings into their own module
X Split out the play button from the save settings button
Add pause functionality
Add a tutorial

----------

After the whole thing works, end to end...

X the generateObjects function should be comprised of matches, fillers and lures

X 1/5 of the objects must be matches; the rest are fillers or lures

X lvl0 0 lures
lvl1 5 lures; 'lure.property' = 'n.property'; lure is located at n+1
lvl2 lure is located at either n+1 or n-1
X 'filler.property' != previous 10 'n.property's

http://mindmodeling.org/cogsci2012/papers/0290/paper0290.pdf

----------

If I decide to use chance.js:
add chance.js to my js folder
add this to my index.html: <script type="text/javascript" src="js/chance.js"></script>
Add this to my script.js:
	var my_chance = new Chance();
	console.log(my_chance.bool());

----------




