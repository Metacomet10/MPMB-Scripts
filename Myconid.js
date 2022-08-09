var iFileName = "Myconid.js";
RequiredSheetVersion("13.1.0");
// This file adds the homebrew race Myconid to MPMB's Character Record Sheet. This race was developed for a specific campaign and is not endorsed for play without scrutiny.

// Define the source
SourceList.MYC={
	name : "Myconid (Metacomet10)",
	abbreviation : "MYC",
	group : "Homebrew",
	date : "2022/07/30"
};

//Race
RaceList["myconid"] = {
	regExpSearch : /myconid/i,
	name : "Myconid",
	source : [["MYC", 1]],
	plural : "Myconids",
	size : 4,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common"],
	vision : [["Tremorsense", 30]],
	savetxt : { adv_vs : ["poison"] },
	dmgres : ["Poison"],
	age : " are considered young until they are 50 and live about 350 years",
	height : " stand between 3 and 4 feet tall (3' + 2d4\")",
	weight : " weigh around 100 lb (130 + 2d4 \xD7 2d6 lb)",
	heightMetric : " stand between 0,9 and 1,2 metres tall (90 + 5d4 cm)",
	weightMetric : " weigh around 45 kg (30 + 5d4 \xD7 4d6 / 10 kg)",
	scorestxt : "+2 to one ability score and +1 to a different score of my choice, -or- +1 to three different scores of my choice",
	trait : "Myconid"+
    "\n \u2022 Grounding: Myconids don't need to sleep. They recharge semiconsciously for 4 hours a day. This gives the same benefit as a human gets from 8 hours of sleep (long rest takes only 4 hours)."+
    "\n \u2022 Speech of Beast and Leaf: I can make my words understood, in a limited manner, by beasts and plants. I have advantage on Charisma checks to influence them."+
    "\n \u2022 Solid Ground: I have advantage on checks or saves against moving unwillingly when I am touching dirt, stone, or the ground.",
    spellcastingAbility : 3,
    features : {
		"sleep spell" : {
			name : "Spore Influence",
			limfeaname : "Sleep Spell",
			minlevel : 1,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Spore Influence",
				spells : ["sleep"],
				selection : ["sleep"],
				firstCol : "oncelr"
			}
		}
	}
};