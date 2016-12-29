/////////////
//	MODEL  //
/////////////

//Creates a JSON object with the information provided for the restaurants to be included in the app. The lat/lng will be used to place markers and the address and zip will be used with the Yelp API
//Keywords are also provided for improved searching

var boxStatus = [
	'You are in the field you were marooned in. The strange crate is here. There are small stones everywhere in the field. You consider gathering some wood from the forest to try to build a fire.',
	'You don\'t make much of a dent in it.',
	'You\'ve loosened the lid a bit. You hear a skittering noise inside.',
	'The lid is loose enough to leave an inch of space. A totally foreign smell fills your nostrils.',
	'The lid creaks open and three strange wormlike creatures, each about the size of your forearm, slither out rapidly. You fall backwards, terrified, but the creatures are totally unconcerned with you. They move behind you and burrow into the ground, leaving three holes in a triangle pattern.'
]

var introText = [
	'You wake up groggy in a grassy plain on the edge of a forest, angry.',
	'Overhead you see the prison ship enter the star gate and turn into nothingness, hurtled across the galaxy by ancient technology.',
	'As soon as the ship is gone, the star gate erupts in a massive explosion. You are temporarily blinded both by the brightness and cruel extravagance of the act.',
	'Beside you is a crate with warnings scrawled in strange languages, an odd companion to be marooned with.',
	'Your only remaining posessions are a notepad and pen.',
	'As hopeless as your situation is, you swear that if by some miracle you receive the opportunity, you will make the people who put you here pay.',
	'TRIAD',
	'Chapter One: To the Stars'
]

/////////////////
//  VIEWMODEL  //
/////////////////

//These functions help create an observable array of markers for binding to the HTMl and filtering

//Sets variables for MyViewVariable
var myViewModel = {
	rock: ko.observable(0),
	ore: ko.observable(0),
	wood: ko.observable(0),
	boxTries: ko.observable(0),
	textIndex: ko.observable(0),
	gameStage: ko.observable(0)
}

myViewModel.boxMessage = ko.pureComputed(function() {
	return boxStatus[myViewModel.boxTries()];
}, myViewModel);

myViewModel.introOver = ko.pureComputed(function() {
	if (myViewModel.gameStage() > 0) {
		return true;
	}
	else {
		return false;
	}
}, myViewModel);

function openBox() {
	myViewModel.boxTries(myViewModel.boxTries() + 1);
	buttonCooldown('#boxButton');
	if (myViewModel.boxTries() > 3) {
		$('#boxButton').hide();
	}
}

myViewModel.messageText = ko.pureComputed(function() {
	if (myViewModel.gameStage() == 0) {
		return introText[myViewModel.textIndex()];
	}
	else if (myViewModel.gameStage() == 1) {
		return boxStatus[myViewModel.boxTries()];
	}
}, myViewModel);

function moreRock() {
	myViewModel.rock(myViewModel.rock() + 1);
	buttonCooldown('#rock');
}

function moreWood() {
	myViewModel.wood(myViewModel.wood() + 1);
	buttonCooldown('#wood');
}

function advance() {
	myViewModel.textIndex(myViewModel.textIndex() + 1);
	if (myViewModel.textIndex() == introText.length) {
		$('#advanceButton').hide();
		myViewModel.gameStage(myViewModel.gameStage() + 1);
	}
}

function buttonCooldown(tag) {
	$(tag).attr("disabled",true);
	var time = 0;
	var id = setInterval(function() {
		var width = 100 - time;
		time++;
		if (time > 99) {
			$(tag).attr("disabled",false);
			clearInterval(id);
		}
		$(tag).css("background", "-webkit-linear-gradient(left, gray "+ time +"%, white " + (100 - time) + "%)");
    	$(tag).css("background", "-moz-linear-gradient(left, gray "+ time +"%, white " + (100 - time) + "%)");
    	$(tag).css("background", "-ms-linear-gradient(left, gray "+ time +"%, white " + (100 - time) + "%)"); 
	}, 100);
}

ko.applyBindings(myViewModel);