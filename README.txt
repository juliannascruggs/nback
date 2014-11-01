Logic behind an n-back game

Game:
	display x # of objects, sequentially
	randomize the value of the object properties
	user selects which properties they believe they saw n # of intances ago
	compare user selection to object property n # instances ago
	deem it right or wrong, message that immediately
	calculate a percentage of how much the user got correctly vs. not for each property type

Round settings:
	Number of objects to play: setting?
	Object properties: object
	n for 'n-back': number
	score: boolean

Properties:
	[color]
	[shape]
	[sound]
	[position]

Sequence
	create an object with random properties
	store the object properties
	show the random object
	compare the object's properties to the properties of object n
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
X check and see if: nbackIndex is < nbacks.length, then show an nback and + 1 to the nbackIndex counter
(nbacksToShow is game length, ex. 20)
X else: call endGame method, which shows correct and incorrect values

X use a button to call nextStep, and display your nbackIndex value

then focus on gettin renderNback to
have a timer and have a submit button that will check logic to do the comparison to figure out if you're right or wrong

var nbacks = []
var nbackIndex = 0
nbacks[nbackIndex]

To do:
the generateObjects function should be populated programatically from other arrays
create an array of colors
choose a random color by getting a random position in the array

------------
After the whole thing works, end to end...

To do:
the generateObjects function should be comprised of matches fillers and lures
20% of the objects should be matches
the other 80% should be fillers and lures
lures are objects with any property within the context vector,
the context vector is the vector between the current object and the n-back object
http://mindmodeling.org/cogsci2012/papers/0290/paper0290.pdf

If I decide to use chance.js:
add chance.js to my js folder
add this to my index.html: <script type="text/javascript" src="js/chance.js"></script>
Add this to my script.js:
	var my_chance = new Chance();
	console.log(my_chance.bool());







