var iFileName = "Bilmops Compendium of Notes.js";
RequiredSheetVersion("13.1.0");
// This file adds limited parts of Metacomet10's homebrew to MPMB's Character Record Sheet. The material is not endorsed for play without scrutiny and has missing pieces. For the full ruleset, see https://homebrewery.naturalcrit.com/share/cc4sZaPa79Xd .

// Define the source
SourceList.BCN={
	name : "Bilmop's Compendium of Notes",
	abbreviation : "BCN",
	abbreviationSpellsheet: "B",
	group : "Homebrew",
	date : "2022/07/30"
};


// Change the healing spells so ranged healing takes an action and touch healing takes a bonus action. 
// Not listed here is the accompanying change to Lay on Hands
SpellsList["cure wounds"] = {
	name : "Cure Wounds",
	//removed paladin 
	classes : ["artificer", "bard", "cleric", "druid", "ranger"],
	source : [["SRD", 132], ["P", 230]],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "1 living creature heals 1d8+1d8/SL+spellcasting ability modifier HP",
	descriptionFull : "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st."
};

SpellsList["healing word"] = {
	name : "Healing Word",
	classes : ["bard", "cleric", "druid"],
	source : [["SRD", 153], ["P", 250]],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V",
	duration : "Instantaneous",
	description : "1 living creature heals 1d4+1d4/SL+spellcasting ability modifier HP",
	descriptionFull : "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d4 for each slot level above 1st."
};

SpellsList["mass healing word"] = {
	name : "Mass Healing Word",
	classes : ["cleric"],
	source : [["SRD", 163], ["P", 258]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V",
	duration : "Instantaneous",
	description : "6 living creatures heal 1d4+1d4/SL+spellcasting ability modifier HP",
	descriptionFull : "As you call out words of restoration, up to six creatures of your choice that you can see within range regain hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the healing increases by 1d4 for each slot level above 3rd."
};

