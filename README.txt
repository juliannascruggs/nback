Logic behind an n-back game

Game:
	display x # of objects sequentially
	randomize the value of the object properties
	user selects which properties they believe they saw n # of intances ago
	compare user selection to object property n # instances ago
	deem it right or wrong, message that immediately
	calculate a percentage of how much the user remembered correctly vs. not for each property type

Game settings:
	Number of objects to play: trials
	Object properties: object constructor
	n-back: n
	score: boolean?

Properties:
	color
	shape
	sound
	position[0,0]

Sequence
	create objects with random properties
		later, create matches, lures and fillers
	store the objects
	show the objects
	* compare the object's properties to the properties of object n
		does this work differently if we generate properties as matches, lures and fillers?
	listen to the user's input on	
	compare the user's property guesses to the object's properties
	store

Layout
	Status
		Game ready
		Game active
		Game paused
		Game complete	
	Gameboard
		Stage
		Controls
	Settings
		Object property toggle
		N value
		Speed (time between objects)
		Flash time (% of time window in which the object is visible)

To do:
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
X have a submit button that will check logic to do the comparison to figure out if you're right or wrong

	var nbacks = []
	var nbackIndex = 0
	nbacks[nbackIndex]

To do:
X the generateObjects function should be populated programatically from other arrays
X create an array of colors
X choose a random color by getting a random position in the array

------------
After the whole thing works, end to end...

the generateObjects function should be comprised of matches, fillers and lures

1/5 of the objects must be matches; the rest are fillers or lures

lvl0 0 lures
lvl1 5 lures; 'lure.property' = 'n.property'; lure is located at n+1
lvl2 lure is located at either n+1 or n-1
'filler.property' != previous 10 'n.property's

http://mindmodeling.org/cogsci2012/papers/0290/paper0290.pdf

To do:
X disable play button during the game, reenable on endGame
add logic to calculate incorrect "misses"
X disable match button on click, renable match button at the start of each interval
make object fade away between intervals
design logic for 1/5 matches
message correct/incorrect on match button click

Design my responsive game board
Build a responsive gameboard
Add position

Add shapes
Add sounds

Move settings into their own module
Split out the play button from the save settings button
Add pause functionality
Add a tutorial



----------

If I decide to use chance.js:
add chance.js to my js folder
add this to my index.html: <script type="text/javascript" src="js/chance.js"></script>
Add this to my script.js:
	var my_chance = new Chance();
	console.log(my_chance.bool());







