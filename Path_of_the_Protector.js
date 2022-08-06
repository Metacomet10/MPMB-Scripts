var iFileName = "Path_of_the_Protector.js";
RequiredSheetVersion("13.1.0");
// This file adds the homebrew subclass Path of the Protector to MPMB's Character Record Sheet. This subclass was developed for a specific campaign and is not endorsed for play without scrutiny.

// Define the source
SourceList.H={
	name : "Protector",
	abbreviation : "HB",
	abbreviationSpellsheet: "HB",
	group : "Homebrew",
	date : "2022/04/08"
};

// Add 3 subclasses for the Barbarian
AddSubClass("barbarian", "protector", {
	regExpSearch : /protector/i,
	subname : "Path of the Protector",
	source : ["HB", 11],
	fullname : "Protector",
	features : {
		"subclassfeature3" : {
			name : "Ancestral Protectors",
			source : ["HB", 1],
			minlevel : 3,
			description : desc([
				"While raging, the first creature I hit with an attack on my turn becomes distracted",
				"While distracted, it has disadvantage on attack rolls that don't target me",
				"In addition, everybody but me counts as having resistance to all of the target's attacks",
				"This lasts until the start of my next turn, or until my rage ends"
			])
		},
		"subclassfeature3.1" : {
			name : "Warrior of the Gods",
			source : ["HB", 1],
			minlevel : 3,
			description : "\n   " + "Spells restoring me to life (not undeath or anything else) don't require material comp."
		},
		"subclassfeature6" : {
			name : "Healing Light",
			source : ["HB", 1],
			minlevel : 6,
			description : desc([
				"As a bonus action, I can heal a creature (not me) I can see within 60 ft by expending dice",
				"I can expend up to my Charisma modifier (min 1) of dice from my pool at a time",
				"The target heals HP equal to the roll of the dice; I regain all expended dice on a long rest"
			]),
			usages : levels.map(function (n) { return (n) + "d6 per "; }),
			usagescalc : "event.value = !classes.known.barbarian ? '' : (classes.known.barbarian.level) + 'd6';",
			recovery : "long rest",
			action : ["bonus action", ""]
		},
		"subclassfeature6.1" : {
			name : "Protector's Magic",
			source : ["HB", 1],
			minlevel : 6,
			description : "\n   " + "I can cast spells gained from the Aberrant Dragonmark feat during rage"
		},
		"subclassfeature6.2" : {
			name : "Bound Weapon",
			source : ["HB", 1],
			minlevel : 6,
			description : desc([
				"I can bind a weapon to me through an hour-long ritual that I can perform during a short rest",
				"I can summon and dismiss it during my turn as a free action",
				"The weapon disappears if it is more than 5 ft away from me for 1 minute"
			])
		},
		"subclassfeature10" : {
			name : "Searing Vengeance",
			source : ["HB", 1],
			minlevel : 10,
			description : desc([
				"At the start of my turn when I would make a death save, I can instead spring back up",
				"I recover HP equal to one quarter my current HP maximum, and can then stand up if I choose",
				"When I do, creatures of my choice within 30 ft take 2d8 + Cha mod in radiant damage",
				"Damaged creatures are blinded until the end of my current turn"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Rage Beyond Death",
			source : ["HB", 1],
			minlevel : 14,
			description : desc([
				"While raging, having 0 hit points doesn't knock me unconscious",
				"I still must make death saves, and I suffer the normal effects of taking damage",
				"I only die due to failed death saves if my rage ends while I'm at 0 HP"
			])
		}
	}
});