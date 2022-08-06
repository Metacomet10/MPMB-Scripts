/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class, called "Intlock", that replicates all functions of the Warlock class with Int as the primary ability.
				No additional (non-SRD) spells are included. It is therefore required to have the PHB and XGE scripts already imported.
				It also adds the "Unearthed Arcana: Class Feature Variants" enhanced feature set for Warlocks translated to Intlock.

				Any error or bug encountered most likely the fault of Metacomet10 and not MPMB.
	Code by:	MorePurpleMoreBetter, (poorly translated to Int by Metacomet10)
	Date:		2020-09-13 (sheet v13.0.0beta31)

	!CAUTION! Don't multiclass Intlock and Warlock, they will conflict and cause errors.

	!CAUTION! This script REQUIRES the "PHB", "XGE", and "UA:CFV" additional content to already be loaded in the sheet.
*/

var iFileName = "Intlock [WotC's work, transcribed by MPMB and Metacomet10].js";
RequiredSheetVersion(13);

ClassList["intlock"] = {
	regExpSearch : /intlock/i,
	name : "Intlock",
	source : [["SRD", 46], ["P", 105]],
	primaryAbility : "Intelligence",
	abilitySave : 4,
	prereqs : "Intelligence 13",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Wis", "Int"],
	skillstxt : {
		primary : "Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion"
	},
	armorProfs : {
		primary : [true, false, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false],
		secondary : [true, false]
	},
	equipment : "Intlock starting equipment:" +
		"\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;" +
		"\n \u2022 A component pouch -or- an arcane focus;" +
		"\n \u2022 A scholar's pack -or- a dungeoneer's pack;" +
		"\n \u2022 Leather armor, any simple weapon, and two daggers." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Otherworldly Patron", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "warlock1",
	spellcastingKnown : {
		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
	},
	spellcastingList : {
		"class" : "warlock",
		level : [0, 5] //lower and higher limit
	},
	features : {
		"pact magic" : {
			name : "Pact Magic",
			source : [["SRD", 46], ["P", 107]],
			minlevel : 1,
			description : "\n   " + "I can cast intlock cantrips/spells that I know, using Intelligence as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus for my intlock spells" + "\n   " + "I regain these spell slots on a short rest",
			additional : levels.map(function (n, idx) {
				var cantr = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx];
				var splls = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15][idx];
				var slots = n < 2 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4;
				var sllvl = n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : 5;
				return cantr + " cantrips \u0026 " + splls + " spells known; " + slots + "\u00D7 " + Base_spellLevelList[sllvl] + " spell slot";
			})
		},
		"subclassfeature1" : {
			name : "Otherworldly Patron",
			source : [["SRD", 46], ["P", 107]],
			minlevel : 1,
			description : "\n   " + "Choose the Otherworldly Patron you have a bargain with and put it in the \"Class\" field" + "\n   " + "Choose either the Archfey, the Celestial, the Fiend, the Great Old One, the Hexblade, or the Undying"
		},
		"eldritch invocations" : {
			name : "Eldritch Invocations",
			source : [["SRD", 47], ["P", 107]],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Feature\" button above to add Eldritch Invocations to the third page" + "\n   " + "Whenever I gain an intlock level, I can replace an invocation I know with another",
			additional : levels.map(function (n) {
				return n < 2 ? "" : (n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8) + " invocations known";
			}),
			extraname : "Eldritch Invocation",
			extrachoices : ["Agonizing Blast (prereq: Eldritch Blast cantrip)", "Armor of Shadows", "Ascendant Step (prereq: level 9 intlock)", "Beast Speech", "Beguiling Influence", "Bewitching Whispers (prereq: level 7 intlock)", "Book of Ancient Secrets (prereq: Pact of the Tome)", "Chains of Carceri (prereq: level 15 intlock, Pact of the Chain)", "Devil's Sight", "Dreadful Word (prereq: level 7 intlock)", "Eldritch Sight", "Eldritch Spear (prereq: Eldritch Blast cantrip)", "Eyes of the Rune Keeper", "Fiendish Vigor", "Gaze of Two Minds", "Lifedrinker (prereq: level 12 intlock, Pact of the Blade)", "Mask of Many Faces", "Master of Myriad Forms (prereq: level 15 intlock)", "Minions of Chaos (prereq: level 9 intlock)", "Mire the Mind (prereq: level 5 intlock)", "Misty Visions", "One with Shadows (prereq: level 5 intlock)", "Otherworldly Leap (prereq: level 9 intlock)", "Repelling Blast (prereq: Eldritch Blast cantrip)", "Sculptor of Flesh (prereq: level 7 intlock)", "Sign of Ill Omen (prereq: level 5 intlock)", "Thief of Five Fates", "Thirsting Blade (prereq: level 5 intlock, Pact of the Blade)", "Visions of Distant Realms (prereq: level 15 intlock)", "Voice of the Chain Master (prereq: Pact of the Chain)", "Whispers of the Grave (prereq: level 9 intlock)", "Witch Sight (prereq: level 15 intlock)"],
			extraTimes : levels.map(function (n) {
				return n < 2 ? 0 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8;
			}),
			"agonizing blast (prereq: eldritch blast cantrip)" : {
				name : "Agonizing Blast",
				description : "\n   " + "I can add my Intelligence modifier to every hit with my Eldritch Blast cantrip",
				source : [["SRD", 48], ["P", 110]],
				prereqeval : function(v) { return v.hasEldritchBlast; },
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.baseWeaponName == 'eldritch blast') output.extraDmg += What('Int Mod');
						},
						"I add my Intelligence modifier to the damage of every beam of my Eldritch Blast cantrip."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (spellKey == "eldritch blast") {
								spellObj.description = spellObj.description.replace("1d10 Force damage", "1d10+" + What("Int Mod") + " Force dmg");
								return true;
							};
						},
						"I add my Intelligence modifier to the damage of every beam of my Eldritch Blast cantrip."
					]
				}
			},
			"armor of shadows" : {
				name : "Armor of Shadows",
				description : "\n   " + "I can cast Mage Armor on myself at will, without using a spell slot or material components",
				source : [["SRD", 48], ["P", 110]],
				spellcastingBonus : {
					name : "Armor of Shadows",
					spells : ["mage armor"],
					selection : ["mage armor"],
					firstCol : "atwill"
				},
				spellChanges : {
					"mage armor" : {
						range : "Self",
						components : "V,S",
						compMaterial : "",
						description : "If I'm not wearing armor, I gain AC 13 + Dex modifier for the duration; spell ends if I don armor",
						changes : "With the Armor of Shadows invocation I can cast Mage Armor without a material component, but only on myself."
					}
				}
			},
			"ascendant step (prereq: level 9 intlock)" : {
				name : "Ascendant Step",
				description : "\n   " + "I can cast Levitate on myself at will, without using a spell slot or material components",
				source : [["SRD", 48], ["P", 110]],
				spellcastingBonus : {
					name : "Ascendant Step",
					spells : ["levitate"],
					selection : ["levitate"],
					firstCol : "atwill"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 9; },
				spellChanges : {
					"levitate" : {
						range : "Self",
						components : "V,S",
						compMaterial : "",
						description : "I rise vertically, up to 20 ft; during my move, I can move up/down up to 20 ft",
						changes : "With the Ascendant Step invocation I can cast Levitate without a material component, but only on myself."
					}
				}
			},
			"beast speech" : {
				name : "Beast Speech",
				description : "\n   " + "I can cast Speak with Animals at will, without using a spell slots",
				source : [["SRD", 48], ["P", 110]],
				spellcastingBonus : {
					name : "Beast Speech",
					spells : ["speak with animals"],
					selection : ["speak with animals"],
					firstCol : "atwill"
				}
			},
			"beguiling influence" : {
				name : "Beguiling Influence",
				description : "\n   " + "I gain proficiencies with the Deception and Persuasion skills",
				source : [["SRD", 48], ["P", 110]],
				skills : ["Deception", "Persuasion"]
			},
			"bewitching whispers (prereq: level 7 intlock)" : {
				name : "Bewitching Whispers",
				description : "\n   " + "Once per long rest, I can cast Compulsion using an intlock spell slot",
				source : [["SRD", 48], ["P", 110]],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Bewitching Whispers",
					spells : ["compulsion"],
					selection : ["compulsion"],
					firstCol : "oncelr"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 7; }
			},
			"book of ancient secrets (prereq: pact of the tome)" : {
				name : "Book of Ancient Secrets",
				description : desc([
					"I can add any two 1st-level spells that have the ritual tag to my Book of Shadows",
					"If I come across spells with the ritual tag, I can transcribe them into my book, as well",
					"I can cast any of these spells in my Book of Shadows as rituals, but not as normal spells",
					"I can cast my known intlock spells as rituals if they have the ritual tag"
				]),
				source : [["SRD", 48], ["P", 110]],
				eval : function() {
					CurrentSpells['intlock-book of ancient secrets'] = {
						name : 'Book of Ancient Secrets',
						ability : 4,
						list : {class : 'any', ritual : true},
						known : {spells : 'book'},
						refType : "feat"
					};
					if (CurrentSpells['book of ancient secrets'] && CurrentSpells['book of ancient secrets'].selectSp) {
						// v12.999 style is present, so transfer chosen spells over and remove it
						CurrentSpells['intlock-book of ancient secrets'].offsetBo = CurrentSpells['book of ancient secrets'].offsetBo;
						CurrentSpells['intlock-book of ancient secrets'].selectBo = CurrentSpells['book of ancient secrets'].selectBo;
						CurrentSpells['intlock-book of ancient secrets'].selectSp = CurrentSpells['book of ancient secrets'].selectSp;
						delete CurrentSpells['book of ancient secrets'];
					}
					SetStringifieds('spells'); CurrentUpdates.types.push('spells');
				},
				removeeval : function() {
					delete CurrentSpells['intlock-book of ancient secrets'];
					SetStringifieds('spells'); CurrentUpdates.types.push('spells');
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 3 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the tome'; },
				calcChanges : {
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (spName == "book of ancient secrets") {
								spellObj.firstCol = "(R)";
								if (!(/.*(\d+ ?h\b|special|see b).*/i).test(spellObj.time)) {
									var numMinutes = Number(spellObj.time.replace(/(\d+) ?min.*/, "$1"));
									if (isNaN(numMinutes)) numMinutes = 0;
									spellObj.time = (numMinutes + 10) + " min";
								}
								return true;
							};
						},
						"By the Book of Ancient Secrets invocation, I can cast ritual spells from my Book of Shadows. Ritual spell always have a casting time of 10 minutes or more."
					]
				}
			},
			"chains of carceri (prereq: level 15 intlock, pact of the chain)" : {
				name : "Chains of Carceri",
				description : "\n   " + "I can cast Hold Monster at will if the target is a celestial, fiend, or elemental" + "\n   " + "This uses no spell slots/material comp.; I can only target an individual once per long rest",
				source : [["SRD", 49], ["P", 110]],
				spellcastingBonus : {
					name : "Chains of Carceri",
					spells : ["hold monster"],
					selection : ["hold monster"],
					firstCol : "atwill"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 15 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the chain'; },
				spellChanges : {
					"speak with animals" : {
						components : "V,S",
						compMaterial : "",
						description : "1 celestial, fiend, or elemental, save or paralyzed; extra save at end of each turn",
						changes : "With the Chains of Carceri invocation I can cast Hold Monster without a material component, but only on a celestial, fiend, or elemental."
					}
				}
			},
			"devil's sight" : {
				name : "Devil's Sight",
				description : "\n   " + "I can see in magical and nonmagical darkness out to 120 ft",
				source : [["SRD", 49], ["P", 110]],
				vision : [["Devil's sight", 120]]
			},
			"dreadful word (prereq: level 7 intlock)" : {
				name : "Dreadful Word",
				description : "\n   " + "Once per long rest, I can cast Confusion using an intlock spell slot",
				source : [["SRD", 49], ["P", 110]],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Dreadful Word",
					spells : ["confusion"],
					selection : ["confusion"],
					firstCol : "oncelr"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 7; }
			},
			"eldritch sight" : {
				name : "Eldritch Sight",
				description : "\n   " + "I can cast Detect Magic at will, without using a spell slot",
				source : [["SRD", 49], ["P", 110]],
				spellcastingBonus : {
					name : "Eldritch Sight",
					spells : ["detect magic"],
					selection : ["detect magic"],
					firstCol : "atwill"
				}
			},
			"eldritch spear (prereq: eldritch blast cantrip)" : {
				name : "Eldritch Spear",
				description : "\n   " + "My Eldritch Blast cantrip has a range of 300 ft",
				source : [["SRD", 49], ["P", 111]],
				prereqeval : function(v) { return v.hasEldritchBlast; },
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.baseWeaponName == 'eldritch blast') fields.Range = 300 * (v.rangeM ? v.rangeM : 1) + ' ft';
						},
						"My Eldritch Blast cantrip has a range of 300 ft."
					]
				},
				spellChanges : {
					"eldritch blast" : {
						range : "300 ft",
						changes : "My Eldritch Blast cantrip has a range of 300 ft."
					}
				}
			},
			"eyes of the rune keeper" : {
				name : "Eyes of the Rune Keeper",
				description : "\n   " + "I can read all writing",
				source : [["SRD", 49], ["P", 111]]
			},
			"fiendish vigor" : {
				name : "Fiendish Vigor",
				description : "\n   " + "I can cast False Life on myself at will, without using a spell slot or material components",
				source : [["SRD", 49], ["P", 111]],
				spellcastingBonus : {
					name : "Fiendish Vigor",
					spells : ["false life"],
					selection : ["false life"],
					firstCol : "atwill"
				},
				spellChanges : {
					"false life" : {
						components : "V,S",
						compMaterial : "",
						description : "I gain 1d4+4 temporary hit points for the duration",
						changes : "With the Fiendish Vigor invocation I can cast False Life without a material component."
					}
				}
			},
			"gaze of two minds" : {
				name : "Gaze of Two Minds",
				description : "\n   " + "As an action, I can touch a willing creature and perceive through its senses (not my own)" + "\n   " + "This lasts until the end of my next turn, but I can use an action to extend the duration",
				source : [["SRD", 49], ["P", 111]]
			},
			"lifedrinker (prereq: level 12 intlock, pact of the blade)" : {
				name : "Lifedrinker",
				description : "\n   " + "My pact weapon does extra necrotic damage equal to my Intelligence modifier",
				source : [["SRD", 49], ["P", 111]],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.pactWeapon || ((v.isMeleeWeapon || v.theWea.isMagicWeapon || v.thisWeapon[1]) && (/\bpact\b/i).test(v.WeaponText))) fields.Description += (fields.Description ? '; ' : '') + '+Int mod necrotic damage (included above)';
						},
						"If I include the word 'Pact' in a melee or magic weapon's name or description, the calculation will add my Intelligence modifier to its damage. However, it won't say in the damage box that this added damage is of the necrotic type, as it can only display a single damage type."
					],
					atkCalc : [
						function (fields, v, output) {
							if (v.pactWeapon || ((v.isMeleeWeapon || v.theWea.isMagicWeapon || v.thisWeapon[1]) && (/\bpact\b/i).test(v.WeaponText))) output.extraDmg += What('Int Mod');
						}, ""
					]
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 12 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the blade'; }
			},
			"mask of many faces" : {
				name : "Mask of Many Faces",
				description : "\n   " + "I can cast Disguise Self on myself at will, without using a spell slot",
				source : [["SRD", 49], ["P", 111]],
				spellcastingBonus : {
					name : "Mask of Many Faces",
					spells : ["disguise self"],
					selection : ["disguise self"],
					firstCol : "atwill"
				}
			},
			"master of myriad forms (prereq: level 15 intlock)" : {
				name : "Master of Myriad Forms",
				description : "\n   " + "I can cast Alter Self at will, without using a spell slot",
				source : [["SRD", 49], ["P", 111]],
				spellcastingBonus : {
					name : "Mask of Myriad Forms",
					spells : ["alter self"],
					selection : ["alter self"],
					firstCol : "atwill"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 15; }
			},
			"minions of chaos (prereq: level 9 intlock)" : {
				name : "Minions of Chaos",
				description : "\n   " + "Once per long rest, I can cast Conjure Elemental using an intlock spell slot",
				source : [["SRD", 49], ["P", 111]],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Minions of Chaos",
					spells : ["conjure elemental"],
					selection : ["conjure elemental"],
					firstCol : "oncelr"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 9; }
			},
			"mire the mind (prereq: level 5 intlock)" : {
				name : "Mire the Mind",
				description : "\n   " + "Once per long rest, I can cast Slow using an intlock spell slot",
				source : [["SRD", 49], ["P", 111]],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Mire the Mind",
					spells : ["slow"],
					selection : ["slow"],
					firstCol : "oncelr"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 5; }
			},
			"misty visions" : {
				name : "Misty Visions",
				description : "\n   " + "I can cast Silent Image at will, without using a spell slot or material components",
				source : [["SRD", 49], ["P", 111]],
				spellcastingBonus : {
					name : "Misty Visions",
					spells : ["silent image"],
					selection : ["silent image"],
					firstCol : "atwill"
				},
				spellChanges : {
					"silent image" : {
						components : "V,S",
						compMaterial : "",
						changes : "With the Misty Visions invocation I can cast Silent Image without a material component."
					}
				}
			},
			"one with shadows (prereq: level 5 intlock)" : {
				name : "One with Shadows",
				description : "\n   " + "As an action, when I'm in an area of dim light or darkness, I can become invisible" + "\n   " + "I become visible again when I move or take an action or reaction",
				source : [["SRD", 49], ["P", 111]],
				action : ["action", ""],
				prereqeval : function(v) { return classes.known.intlock.level >= 5; }
			},
			"otherworldly leap (prereq: level 9 intlock)" : {
				name : "Otherworldly Leap",
				description : "\n   " + "I can cast Jump on myself at will, without using a spell slot or material components",
				source : [["SRD", 49], ["P", 111]],
				spellcastingBonus : {
					name : "Otherworldly Leap",
					spells : ["jump"],
					selection : ["jump"],
					firstCol : "atwill"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 9; },
				spellChanges : {
					"jump" : {
						range : "Self",
						components : "V,S",
						compMaterial : "",
						description : "My jump distance is tripled for the duration",
						changes : "With the Otherworldly Leap invocation I can cast Jump without a material component, but only on myself."
					}
				}
			},
			"repelling blast (prereq: eldritch blast cantrip)" : {
				name : "Repelling Blast",
				description : "\n   " + "I can have creatures hit by my Eldritch Blast cantrip be pushed 10 ft away from me",
				source : [["SRD", 49], ["P", 111]],
				prereqeval : function(v) { return v.hasEldritchBlast; },
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.baseWeaponName == 'eldritch blast') fields.Description += '; Target pushed back 10 ft';
						},
						"When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."
					]
				},
				spellChanges : {
					"eldritch blast" : {
						description : "Spell attack beam 1d10 Force damage \u0026 push 10 ft; beams can be combined; +1 beam at CL5,11,17",
						changes : "When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."
					}
				}
			},
			"sculptor of flesh (prereq: level 7 intlock)" : {
				name : "Sculptor of Flesh",
				description : "\n   " + "Once per long rest, I can cast Polymorph using an intlock spell slot",
				source : [["SRD", 50], ["P", 111]],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Sculptor of Flesh",
					spells : ["polymorph"],
					selection : ["polymorph"],
					firstCol : "oncelr"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 7; }
			},
			"sign of ill omen (prereq: level 5 intlock)" : {
				name : "Sign of Ill Omen",
				description : "\n   " + "Once per long rest, I can cast Bestow Curse using an intlock spell slot",
				source : [["SRD", 50], ["P", 111]],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Sign of Ill Omen",
					spells : ["bestow curse"],
					selection : ["bestow curse"],
					firstCol : "oncelr"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 5; }
			},
			"thief of five fates" : {
				name : "Thief of Five Fates",
				description : "\n   " + "Once per long rest, I can cast Bane using an intlock spell slot",
				source : [["SRD", 50], ["P", 111]],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Thief of Five Fates",
					spells : ["bane"],
					selection : ["bane"],
					firstCol : "oncelr"
				}
			},
			"thirsting blade (prereq: level 5 intlock, pact of the blade)" : {
				name : "Thirsting Blade",
				description : "\n   " + "When taking the attack action, I can attack twice with my pact weapon",
				source : [["SRD", 50], ["P", 111]],
				action : ['action', 'Pact Weapon (2 attacks per action)'],
				prereqeval : function(v) { return classes.known.intlock.level >= 5 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the blade'; }
			},
			"visions of distant realms (prereq: level 15 intlock)" : {
				name : "Visions of Distant Realms",
				description : "\n   " + "I can cast Arcane Eye at will, without using a spell slot",
				source : [["SRD", 50], ["P", 111]],
				spellcastingBonus : {
					name : "Visions of Distant Realms",
					spells : ["arcane eye"],
					selection : ["arcane eye"],
					firstCol : "atwill"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 15; }
			},
			"voice of the chain master (prereq: pact of the chain)" : {
				name : "Voice of the Chain Master",
				description : "\n   " + "While on the same plane as my familiar, I can communicate telepathically with it" + "\n   " + "Also, I can perceive through its senses and have it speak with my voice while doing so",
				source : [["SRD", 50], ["P", 111]],
				prereqeval : function(v) { return classes.known.intlock.level >= 3 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the chain'; }
			},
			"whispers of the grave (prereq: level 9 intlock)" : {
				name : "Whispers of the Grave",
				description : "\n   " + "I can cast Speak with Dead at will, without using a spell slot",
				source : [["SRD", 50], ["P", 111]],
				spellcastingBonus : {
					name : "Whispers of the Grave",
					spells : ["speak with dead"],
					selection : ["speak with dead"],
					firstCol : "atwill"
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 9; }
			},
			"witch sight (prereq: level 15 intlock)" : {
				name : "Witch Sight",
				description : "\n   " + "I can see the true form of creatures (shapechangers/illusions/transmutations) within 30 ft",
				source : [["SRD", 50], ["P", 111]],
				vision : [["Witch sight", 30]],
				prereqeval : function(v) { return classes.known.intlock.level >= 15; }
			},
			"Aspect of the Moon (prereq: Pact of the Tome)" : {
				name : "Aspect of the Moon",
				description : "\n   " + "I don't need sleep nor can be forced to by any means; I can rest while doing light activity",
				source : [["X", 56], ["UA:RCO", 5]],
				prereqeval : function(v) { return GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the tome'; },
				savetxt : { text : ["Nothing can force me to sleep"] }
			},
			"Cloak of Flies (prereq: level 5 intlock)" : {
				name : "Cloak of Flies",
				description : desc([
					"As a bonus action, I can surround myself with a 5-ft radius magical aura of buzzing flies",
					"It lasts until I'm incapacitated or dismiss it as a bonus action; Total cover block the aura",
					"The aura grants me adv. on Cha (Intimidation), but disadv. on all other Cha checks",
					"Creatures starting their turn in the aura take my Int mod (min 0) in poison damage"
				]),
				source : [["X", 56], ["UA:RCO", 5]],
				prereqeval : function(v) { return classes.known.intlock.level >= 5; },
				recovery : "short rest",
				usages : 1,
				action : ["bonus action", " (start/stop)"]
			},
			"Eldritch Smite (prereq: level 5 intlock, Pact of the Blade)" : {
				name : "Eldritch Smite",
				description : desc([
					"Once per turn when I hit a creature with my pact weapon, I can empower the strike",
					"By expending an intlock spell slot, the creature takes extra damage and is knocked prone",
					"It takes 1d8 force damage and another 1d8 force damage per level of the spell slot",
					"The target is only knocked prone if it is Huge or smaller"
				]),
				source : ["X", 56],
				prereqeval : function(v) { return classes.known.intlock.level >= 5 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the blade'; }
			},
			"Ghostly Gaze (prereq: level 7 intlock)" : {
				name : "Ghostly Gaze",
				description : desc([
					"As an action, I can gain darkvision, and the ability to see through solid objects, out to 30 ft",
					"Objects appear ghostly to me; This lasts up to 1 minute, while I'm concentrating on this"
				]),
				source : ["X", 56],
				prereqeval : function(v) { return classes.known.intlock.level >= 7; },
				recovery : "short rest",
				usages : 1,
				action : ["action", ""]
			},
			"Gift of the Depths (prereq: level 5 intlock)" : {
				name : "Gift of the Depths",
				description : desc([
					"I can breathe underwater and I have a swim speed equal to my walking speed",
					"Once per long rest, I can cast Water Breathing without using a spell slot (PHB 287)"
				]),
				source : [["X", 57], ["UA:RCO", 6]],
				spellcastingBonus : {
					name : "Gift of the Depths",
					spells : ["water breathing"],
					selection : ["water breathing"],
					firstCol : 'oncelr'
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 5; },
				speed : { swim : { spd : "walk", enc : "walk" } }
			},
			"Gift of the Ever-Living Ones (prereq: Pact of the Chain)" : {
				name : "Gift of the Ever-Living Ones",
				description : "\n   " + "When I regain HP while my familiar is within 100 ft, I regain the max the dice can roll",
				source : [["X", 57], ["UA:RCO", 6]],
				prereqeval : function(v) { return GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the chain'; }
			},
			"Grasp of Hadar (prereq: Eldritch Blast cantrip)" : {
				name : "Grasp of Hadar",
				description : "\n   " + "When my Eldritch Blast hits a creature once or more, I can move it 10 ft closer to me",
				source : [["X", 57], ["UA:RCO", 6]],
				prereqeval : function(v) { return v.hasEldritchBlast; },
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.baseWeaponName == 'eldritch blast') fields.Description += '; Target moved 10 ft to me';
						},
						"When I hit a creature with my Eldritch Blast cantrip once or more times in a turn, I can move it in a straight line 10 ft closer to me."
					]
				}
			},
			"Improved Pact Weapon (prereq: Pact of the Blade)" : {
				name : "Improved Pact Weapon",
				description : desc([
					"I can use any pact weapon I create as my spellcasting focus for intlock spells",
					"Any pact weapon I create has a +1 magic weapon, if it isn't already a magic weapon",
					"I can now also conjure a shortbow, longbow, or light or heavy crossbow as my pact weapon"
				]),
				source : ["X", 57],
				prereqeval : function(v) { return GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the blade'; },
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if ((/^(shortbow|longbow|light crossbow|heavy crossbow)$/).test(v.baseWeaponName) && (/\bpact\b/i).test(v.WeaponText)) {
								v.pactWeapon = true;
							}
							if (!v.theWea.isMagicWeapon && !v.thisWeapon[1] && v.pactWeapon) {
								v.pactMag = v.pactMag !== undefined ? 1 - v.pactMag : 1;
								output.magic += v.pactMag;
							};
						},
						"If I include the word 'Pact' in a the name of a melee weapon, shortbow, longbow, light crossbow, or heavy crossbow, it will be treated as my Pact Weapon.\n \u2022 If it doesn't already include a magical bonus in its name, the calculation will add +1 to its To Hit and Damage."
					],
					atkAdd : [
						function (fields, v) {
							if ((/^(shortbow|longbow|light crossbow|heavy crossbow)$/).test(v.baseWeaponName) && (/\bpact\b/i).test(v.WeaponText)) {
								v.pactWeapon = true;
								fields.Proficiency = true;
								if (!v.thisWeapon[1] && !v.theWea.isMagicWeapon && !(/counts as( a)? magical/i).test(fields.Description)) fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
							};
						}, ""]
				}
			},
			"Lance of Lethargy (prereq: Eldritch Blast cantrip)" : {
				name : "Lance of Lethargy",
				description : desc([
					"Once per turn when my Eldritch Blast hits a creature, I can reduce its speed by 10 ft",
					"This speed reduction lasts until the end of my next turn"
				]),
				source : ["X", 57],
				prereqeval : function(v) { return v.hasEldritchBlast; },
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.baseWeaponName == 'eldritch blast') fields.Description += '; 1 target -10 ft speed';
						},
						"Once on each of my turns when I hit a creature with my Eldritch Blast cantrip, I can reduce its speed by 10 ft until the end of my next turn."
					]
				}
			},
			"Maddening Hex (prereq: level 5 intlock, Hex spell or intlock feature that curses)" : {
				name : "Maddening Hex",
				description : desc([
					"As a bonus action, I cause pain around a target hexed by me within 30 ft that I can see",
					"It and any within 5 ft of it that I can see take my Int mod (min 1) in psychic damage",
					"The Hex spell and any of my intlock features that curse are considered a hex for this"
				]),
				source : ["X", 57],
				prereqeval : function(v) { return classes.known.intlock.level >= 5 && (isSpellUsed('hex', true) || (/hexblade/).test(classes.known.intlock.subclass)); },
				action : ["bonus action", ""]
			},
			"Relentless Hex (prereq: level 7 intlock, Hex spell or intlock feature that curses)" : {
				name : "Relentless Hex",
				description : desc([
					"As a bonus action, I can teleport to a target hexed by me within 30 ft that I can see",
					"I teleport up to 30 ft to an unoccupied space that I can see within 5 ft of the target"
				]),
				source : ["X", 57],
				prereqeval : function(v) { return classes.known.intlock.level >= 7 && (isSpellUsed('hex', true) || (/hexblade/).test(classes.known.intlock.subclass)); },
				action : ["bonus action", ""]
			},
			"Shroud of Shadow (prereq: level 15 intlock)" : {
				name : "Shroud of Shadow",
				description : "\n   " + "I can cast Invisibility at will, without using spell slots (PHB 254)",
				source : [["X", 57], ["UA:RCO", 6]],
				spellcastingBonus : {
					name : "Shroud of Shadow",
					spells : ["invisibility"],
					selection : ["invisibility"],
					firstCol : 'atwill'
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 15; },
				spellChanges : {
					"invisibility" : {
						description : "1 crea invisible; attacking/casting makes the crea visible; anything worn/carried also invisible",
						changes : "With the Shroud of Shadow invocation I can cast Invisibility at will, but when I do so I am unable to cast it using a higher level spell slot."
					}
				}
			},
			"Tomb of Levistus (prereq: level 5 intlock)" : {
				name : "Tomb of Levistus",
				description : desc([
					"As a reaction when I take damage, I can entomb myself in ice until the end of my turn",
					"During, I get 10 temp. HP per intlock level, which I use to absorb the triggering damage",
					"After, till the ice is gone, I also get vulnerability to fire, 0 speed, and am incapacitated"
				]),
				source : [["X", 57], ["UA:RCO", 6]],
				prereqeval : function(v) { return classes.known.intlock.level >= 5; },
				recovery : "short rest",
				usages : 1,
				action : ["reaction", ""],
				additional : levels.map( function(n) { return (n * 10) + " temp HP"; })
			},
			"Trickster's Escape (prereq: level 7 intlock)" : {
				name : "Trickster's Escape",
				description : "\n   " + "Once per long rest, I can cast Freedom of Movement on myself without using a spell slot",
				source : [["X", 57], ["UA:RCO", 7]],
				spellcastingBonus : {
					name : "Trickster's Escape",
					spells : ["freedom of movement"],
					selection : ["freedom of movement"],
					firstCol : 'oncelr'
				},
				prereqeval : function(v) { return classes.known.intlock.level >= 7; },
				spellChanges : {
					"freedom of movement" : {
						range : "Self",
						description : "Magic can't reduce my speed, paralyze or restrain me; I can use 5 ft to escape nonmagical restrains",
						changes : "With the Trickster's Escape invocation I can cast Freedom of Movement, but only on myself."
					}
				}
			},
			"Bond of the Talisman (prereq: level 12 intlock, Pact of the Talisman)" : {
				name : "Bond of the Talisman",
				source : ["UA:CFV", 11],
				description : desc([
					"As an action, I can teleport to the unoccupied space closest to the wearer of my talisman",
					"The talisman's wearer can do the same to teleport to me; Only works if both on same plane"
				]),
				prereqeval : function(v) {
					return classes.known.intlock.level >= 12 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the talisman';
				},
				action : [["action", ""]]
			},
			"Chain Master's Fury (prereq: level 9 intlock, Pact of the Chain)" : {
				name : "Chain Master's Fury",
				source : ["UA:CFV", 11],
				description : "\n   As a bonus action, I can command my familiar to make one attack",
				prereqeval : function(v) {
					return classes.known.intlock.level >= 9 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the chain';
				},
				action : [["bonus action", ""]]
			},
			"Eldritch Armor (prereq: Pact of the Blade)" : {
				name : "Eldritch Armor",
				source : ["UA:CFV", 11],
				description : desc([
					"As an action, I can touch an unattended suit of armor and instantly don it",
					"I am proficient with this suit of armor until it is removed"
				]),
				prereqeval : function(v) {
					return GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the blade';
				},
				action : [["action", ""]]
			},
			"Eldritch Mind (prereq: Pact of the Tome)" : {
				name : "Eldritch Mind",
				source : ["UA:CFV", 11],
				description : "\n   I have advantage on my Constitution saving throws to maintain concentration on a spell",
				prereqeval : function(v) {
					return GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the tome';
				},
				savetxt : { text : "Adv. on Con (Concentration) saves" }
			},
			"Far Scribe (prereq: level 5 intlock, Pact of the Tome)" : {
				name : "Far Scribe",
				source : ["UA:CFV", 11],
				description : desc([
					"My book of shadows has a new page; As an action, a creature can write its name on it",
					"This page can hold my Int mod (min 1) in creature names; I can remove one as an action",
					"I can cast Sending without a spell slot or material components, targeting one on the page",
					"Instead of saying the message, I write it on the page and any reply appears there as well",
					"This writing disappears after 1 minute; The target still hears the message in their mind"
				]),
				prereqeval : function(v) {
					return classes.known.intlock.level >= 5 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the tome';
				},
				action : [["action", " (erase name)"]],
				spellcastingBonus : {
					name : "Far Scribe",
					spells : ["sending"],
					selection : ["sending"],
					firstCol : "atwill"
				},
				spellChanges : {
					"sending" : {
						components : "V,S",
						compMaterial : "",
						description : "Send 25 word message to crea named in book of shadows; it recognizes me and can respond 25 words",
						changes : "By using Far Scribe, I can cast Sending without using a spell slot or material components, but only to target one of the creatures that wrote their name in my book of shadows. Instead of speaking the message, I write it in my book and any response appears there as well, lasting for 1 minute. The target still hears the message in their mind."
					}
				}
			},
			"Gift of the Protectors (prereq: level 9 intlock, Pact of the Tome)" : {
				name : "Gift of the Protectors",
				source : ["UA:CFV", 11],
				description : desc([
					"My book of shadows has a new page; As an action, a creature can write its name on it",
					"This page can hold my Int mod (min 1) in creature names; I can remove one as an action",
					"If a creature whose name is on the page drops to 0 HP, it magically drops to 1 HP instead",
					"This doesn't work if the creature would be killed outright"
				]),
				prereqeval : function(v) {
					return classes.known.intlock.level >= 9 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the tome';
				},
				action : [["action", " (erase name)"]],
				usages : 1,
				recovery : "long rest"
			},
			"Investment of the Chain Master (prereq: Pact of the Chain)" : {
				name : "Investment of the Chain Master",
				source : ["UA:CFV", 11],
				description : desc([
					"When I cast Find Familiar, the summoned create has additional benefits:",
					"\u2022 It gains a flying or swimming speed of 40 ft (my choice at casting)",
					"\u2022 It no longer needs to breathe",
					"\u2022 Its weapon attacks are considered magical for overcoming immunities and resistances",
					"\u2022 If it forces a creature to make a saving throw, it uses my spell save DC",
					"Note that the automation will only add this to current familiars and on a level change"
				]),
				prereqeval : function(v) {
					return GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the chain';
				},
				changeeval : function(lvlA) {
					var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
					if (!AScompA) return;
					var aStr = "My Investment of the Chain Master eldritch invocation grants my familiar the following:"+
					"\n\u2022 The familiar gains a flying or swimming speed of 40 ft (my choice at casting)"+
					"\n\u2022 The familiar no longer needs to breathe"+
					"\n\u2022 Its weapon attacks are considered magical for overcoming immunities and resistances"+
					"\n\u2022 If the familiar forces a creature to make a saving throw, it uses my spell save DC";
					var aFnc = !lvlA[1] ? RemoveString : AddString;
					for (var a = 1; a < AScompA.length; a++) {
						if (What(AScompA[a] + 'Comp.Type') == "Familiar") {
							aFnc(AScompA[a] + "Cnote.Left", aStr, true);
						}
					}
				}
			},
			"Protection of the Talisman (prereq: level 9 intlock, Pact of the Talisman)" : {
				name : "Protection of the Talisman",
				source : ["UA:CFV", 12],
				description : "\n   The wearer of my talisman adds 1d4 to saving throw rolls in which they lack proficiency",
				prereqeval : function(v) {
					return classes.known.intlock.level >= 9 && GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the talisman';
				},
				savetxt : { text : ["+1d4 to nonproficient saves"] }
			},
			"Rebuke of the Talisman (prereq: Pact of the Talisman)" : {
				name : "Rebuke of the Talisman",
				source : ["UA:CFV", 12],
				description : desc([
					"As a reaction when the wearer of my talisman is hit, I deal damage and push the attacker",
					"To be able to do this, I have to see the attacker and it has to be within 30 ft of me",
					"I deal my Int mod in psychic damage (min 1) and push it 10 ft away from the talisman"
				]),
				prereqeval : function(v) {
					return GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the talisman';
				},
				action : [["reaction", ""]]
			}

		},
		"pact boon" : {
			name : "Pact Boon",
			source : [["SRD", 47], ["P", 107]],
			minlevel : 3,
			description : "\n   " + "Choose a Pact Boon (Blade, Chain, Talisman, or Tome) using the \"Choose Feature\" button above",
			choices : ["Pact of the Blade", "Pact of the Chain", "Pact of the Talisman", "Pact of the Tome"],
			"pact of the blade" : {
				name : "Pact of the Blade",
				description : desc([
					"As an action, I can create a pact weapon in my empty hand; I'm proficient in its use",
					"I can choose the type of melee weapon every time I create it, and it has those statistics",
					"The weapon disappears if it is more than 5 ft away from me for 1 minute",
					"The weapon counts as magical; I can transform a magic weapon into my pact weapon",
					"This occurs over an hour-long ritual that I can perform during a short rest",
					"I can use an action to re-summon it in any form and can dismiss it as no action"
				]),
				action : ["action", ""],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.theWea.pactWeapon || ((v.isMeleeWeapon || v.theWea.isMagicWeapon || v.thisWeapon[1]) && (/\bpact\b/i).test(v.WeaponText))) {
								v.pactWeapon = true;
							}
						}, ""
					],
					atkAdd : [
						function (fields, v) {
							if (v.pactWeapon || v.theWea.pactWeapon || ((v.isMeleeWeapon || v.theWea.isMagicWeapon || v.thisWeapon[1]) && (/\bpact\b/i).test(v.WeaponText))) {
								v.pactWeapon = true;
								fields.Proficiency = true;
								if (!v.theWea.isMagicWeapon && !v.thisWeapon[1] && !(/counts as( a)? magical/i).test(fields.Description)) fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
							};
						},
						"If I include the word 'Pact' in a melee or magic weapon's name, it gets treated as my Pact Weapon."
					]
				}
			},
			"pact of the chain" : {
				name : "Pact of the Chain",
				description : "\n   " + "I can cast Find Familiar as a ritual and it can be a Pseudodragon, Imp, Quasit, or Sprite" + "\n   " + "When taking the attack action, I can forgo 1 attack to have my familiar attack instead" + "\n   " + "It makes this 1 attack by using its reaction",
				spellcastingBonus : {
					name : "Pact of the Chain",
					spells : ["find familiar"],
					selection : ["find familiar"],
					firstCol : "(R)"
				}
			},
			"pact of the talisman" :{
				name : "Pact of the Talisman",
				source : ["UA:CFV", 12],
				description : desc([
					"The wearer of this amulet adds 1d4 to checks with skills in which they lack proficiency",
					"I can give the talisman to others to use; The talisman turns to ash when I die",
					"If I lose my talisman, I can preform an 1-hour ceremony to gain a replacement",
					"This ceremony destroys the previous amulet and can be done during a short or long rest"
				])
			},
			"pact of the tome" : {
				name : "Pact of the Tome",
				source : [["SRD", 48], ["P", 108]],
				description : "\n   " + "I have a Book of Shadows with any three cantrips of my choosing" + "\n   " + "I can cast these cantrips as long as I have the book on my person" + "\n   " + "Regardless of the lists they come from, these count as intlock cantrips to me" + "\n   " + "I can get a replacement book with a 1-hour ceremony during a short or long rest",
				spellcastingBonus : {
					name : "Pact of the Tome",
					"class" : "any",
					level : [0, 0],
					times : 3
				}
			}
		},
		"mystic arcanum" : {
			name : "Mystic Arcanum",
			source : [["SRD", 48], ["P", 108]],
			minlevel : 11,
			description : "\n   " + "I can choose one spell from the intlock spell list of each level mentioned above" + "\n   " + "I can cast these spells each once per long rest without needing to use a spell slot",
			additional : ["", "", "", "", "", "", "", "", "", "", "6th level", "6th level", "6th and 7th level", "6th and 7th level", "6th, 7th, and 8th level", "6th, 7th, and 8th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level"],
			spellcastingBonus : [{
				name : "Mystic Arcanum (6)",
				"class" : "intlock",
				level : [6, 6],
				firstCol : "oncelr"
			}, {
				name : "Mystic Arcanum (7)",
				"class" : "intlock",
				level : [7, 7],
				firstCol : "oncelr",
				times : levels.map(function (n) { return n < 13 ? 0 : 1; })
			}, {
				name : "Mystic Arcanum (8)",
				"class" : "intlock",
				level : [8, 8],
				firstCol : "oncelr",
				times : levels.map(function (n) { return n < 15 ? 0 : 1; })
			}, {
				name : "Mystic Arcanum (9)",
				"class" : "intlock",
				level : [9, 9],
				firstCol : "oncelr",
				times : levels.map(function (n) { return n < 17 ? 0 : 1; })
			}]
		},
		"eldritch master" : {
			name : "Eldritch Master",
			source : [["SRD", 48], ["P", 108]],
			minlevel : 20,
			description : "\n   " + "I can regain all used pact magic spells slots by spending 1 minute entreating my patron",
			recovery : "long rest",
			usages : 1
		}
	}
}

//SRD, PHB, and XGE subclasses
AddSubClass("intlock", "the fiend", {
	regExpSearch : /^(?=.*(fiend|devil|demon|daemon|hell|abyss))(?=.*intlock).*$/i,
	subname : "the Fiend",
	source : [["SRD", 50], ["P", 109]],
	spellcastingExtra : ["burning hands", "command", "blindness/deafness", "scorching ray", "fireball", "stinking cloud", "fire shield", "wall of fire", "flame strike", "hallow"],
	features : {
		"subclassfeature1" : {
			name : "Dark One's Blessing",
			source : [["SRD", 50], ["P", 109]],
			minlevel : 1,
			description : "\n   " + "When I reduce a hostile to 0 HP, I gain Int mod + intlock level temporary HP (min 1)"
		},
		"subclassfeature6" : {
			name : "Dark One's Own Luck",
			source : [["SRD", 50], ["P", 109]],
			minlevel : 6,
			description : "\n   " + "When I make an ability check or saving throw, I can add 1d10 after rolling the d20",
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature10" : {
			name : "Fiendish Resilience",
			source : [["SRD", 51], ["P", 109]],
			minlevel : 10,
			description : "\n   " + "After a short or long rest, I can choose one damage type to become resistance to" + "\n   " + "This lasts until I choose another type; Magical and silver weapons ignore this resistance"
		},
		"subclassfeature14" : {
			name : "Hurl Through Hell",
			source : [["SRD", 51], ["P", 109]],
			minlevel : 14,
			description : "\n   " + "When I hit a creature with an attack, I can instantly transport it through lower planes" + "\n   " + "It returns at the end of my next turn and takes 10d10 psychic damage if not a fiend",
			recovery : "long rest",
			usages : 1
		}
	}
});
AddSubClass("intlock", "the archfey", {
	regExpSearch : /^(?=.*fey)(?=.*intlock).*$/i,
	subname : "the Archfey",
	source : ["P", 109],
	spellcastingExtra : ["faerie fire", "sleep", "calm emotions", "phantasmal force", "blink", "plant growth", "dominate beast", "greater invisibility", "dominate person", "seeming"],
	features : {
		"subclassfeature1" : {
			name : "Fey Presence",
			source : ["P", 109],
			minlevel : 1,
			description : "\n   " + "As an action, all creatures in a 10-ft cube around me must make a Wisdom save" + "\n   " + "If failed, they're all charmed or frightened (my choice) until the end of my next turn",
			recovery : "short rest",
			usages : 1,
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Misty Escape",
			source : ["P", 109],
			minlevel : 6,
			description : "\n   " + "As a reaction, when I take damage, I can turn invisible and teleport up to 60 ft" + "\n   " + "I stay invisible until the start of my next turn or until I attack or cast a spell",
			action : ["reaction", " (taking damage)"],
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature10" : {
			name : "Beguiling Defenses",
			source : ["P", 109],
			minlevel : 10,
			description : "\n   " + "As a reaction, when a creature tries to charm me, I can turn the charm back on it" + "\n   " + "It must make a Wis save or be charmed by me for 1 minute or until taking damage" + "\n   " + "I am immune to being charmed",
			action : ["reaction", " (when charmed)"],
			savetxt : { immune : ["charmed"] }
		},
		"subclassfeature14" : {
			name : "Dark Delirium",
			source : ["P", 109],
			minlevel : 14,
			description : "\n   " + "As an action, a creature within 60 ft must make a Wis save or be charmed/frightened" + "\n   " + "This lasts for 1 minute or until my concentration is broken or it takes damage" + "\n   " + "During this time, it can't see or hear anything but the illusion, me, and itself",
			recovery : "short rest",
			usages : 1,
			action : ["action", ""]
		}
	}
});
AddSubClass("intlock", "the great old one", {
	regExpSearch : /^(((?=.*(tharizdun|cthulhu))(?=.*intlock))|((?=.*(great|dread))(?=.*(ancient|old))(?=.*\b(one|entity)\b)(?=.*intlock))).*$/i,
	subname : "the Great Old One",
	source : ["P", 110],
	spellcastingExtra : ["dissonant whispers", "tasha's hideous laughter", "detect thoughts", "phantasmal force", "clairvoyance", "sending", "dominate beast", "evard's black tentacles", "dominate person", "telekinesis"],
	features : {
		"subclassfeature1" : {
			name : "Awakened Mind",
			source : ["P", 110],
			minlevel : 1,
			description : "\n   " + "I can telepathically speak to creatures I can see within 30 ft if they know a language" // 'to' not 'with', so one-way
		},
		"subclassfeature6" : {
			name : "Entropic Ward",
			source : ["P", 110],
			minlevel : 6,
			description : "\n   " + "As a reaction, when I'm attacked, I can impose disadvantage to that attack roll" + "\n   " + "If it misses me, I have adv. on my next attack vs. the attacker during my next turn",
			action : ["reaction", " (when attacked)"],
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature10" : {
			name : "Thought Shield",
			source : ["P", 110],
			minlevel : 10,
			description : "\n   " + "No one can read my mind unless I allow it; I have resistance to psychic damage" + "\n   " + "When I take psychic damage, the dealer of the psychic damage takes the same amount",
			dmgres : ["Psychic"]
		},
		"subclassfeature14" : {
			name : "Create Thrall",
			source : ["P", 110],
			minlevel : 14,
			description : "\n   " + "As an action, I can charm an incapacitated humanoid by touch" + "\n   " + "While it is charmed, I can communicate with it telepathically if it is on the same plane" + "\n   " + "This lasts until the charm is removed (can be by Remove Curse) or I use this again",
			action : ["action", ""]
		}
	}
});
AddSubClass("intlock", "the celestial-xgte", {
	regExpSearch : /^(?=.*intlock)(?=.*celestial).*$/i,
	subname : "the Celestial",
	source : ["X", 54],
	spellcastingExtra : ["cure wounds", "guiding bolt", "flaming sphere", "lesser restoration", "daylight", "revivify", "guardian of faith", "wall of fire", "flame strike", "greater restoration"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Cantrips",
			source : ["X", 54],
			minlevel : 1,
			description : "\n   " + "I learn the Light and Sacred Flame cantrips, not counting for the number I can know",
			spellcastingBonus : [{
				name : "Bonus Cantrips",
				spells : ["light"],
				selection : ["light"]
			}, {
				name : "Bonus Cantrips",
				spells : ["sacred flame"],
				selection : ["sacred flame"]
			}]
		},
		"subclassfeature1.1" : {
			name : "Healing Light",
			source : ["X", 54],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can heal a creature I can see within 60 ft by expending dice",
				"I can expend up to my Intelligence modifier (min 1) of dice from my pool at a time",
				"The target heals HP equal to the roll of the dice; I regain all expended dice on a long rest"
			]),
			usages : levels.map(function (n) { return (n + 1) + "d6 per "; }),
			usagescalc : "event.value = !classes.known.intlock ? '' : (1 + classes.known.intlock.level) + 'd6';",
			recovery : "long rest",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Radiant Soul",
			source : ["X", 55],
			minlevel : 6,
			description : desc([
				"I add my Int modifier once to the fire or radiant damage of cantrips and spells I cast",
				"This bonus only applies to one target; Also, I have resistance to radiant damage"
			]),
			dmgres : ["Radiant"],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isSpell && (/fire|radiant/i).test(fields.Damage_Type)) {
							output.extraDmg += What('Int Mod');
						};
					},
					"Cantrips and spells that fire or radiant damage get my Intelligence modifier added to their damage to one target."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "fire|radiant", "Int");
					},
					"Cantrips and spells that fire or radiant damage get my Intelligence modifier added to their damage to one target."
				]
			}
		},
		"subclassfeature10" : {
			name : "Celestial Resilience",
			source : ["X", 55],
			minlevel : 10,
			description : desc([
				"When I finish a short or long rest, I and up to five allies gain temporary hit points",
				"I get my intlock level + Int mod, while my allies get half my intlock level + Int mod"
			]),
			additional : levels.map(function (n) { return n < 10 ? "" : "Me: " + n + "+Int mod; Allies: " + Math.floor(n / 2) + "+Int mod"; })
		},
		"subclassfeature14" : {
			name : "Searing Vengeance",
			source : ["X", 55],
			minlevel : 14,
			description : desc([
				"At the start of my turn when I would make a death save, I can instead spring back up",
				"I recover HP equal to half my current HP maximum, and can then stand up if I choose",
				"When I do, creatures of my choice within 30 ft take 2d8 + Int mod in radiant damage",
				"Damaged creatures are blinded until the end of my current turn"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});
AddSubClass("intlock", "the hexblade-xgte", { // this code includes contributions by SoilentBrad
	regExpSearch : /^(?=.*hexblade)(?=.*intlock).*$/i,
	subname : "the Hexblade",
	source : ["X", 55],
	spellcastingExtra : ["shield", "wrathful smite", "blur", "branding smite", "blink", "elemental weapon", "phantasmal killer", "staggering smite", "banishing smite", "cone of cold"],
	features : {
		"subclassfeature1" : {
			name : "Hexblade's Curse",
			source : ["X", 55],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can curse a creature I can see within 30 ft of me for 1 minute",
				"\u2022 I add my proficiency bonus to damage rolls against the cursed target",
				"\u2022 My attack rolls against the curse target score a critical hit on a roll of 19 and 20",
				"\u2022 If the target dies while cursed, I regain HP equal to my intlock level + Int mod",
				"The curse ends after 1 minute, when the target dies, I die, or I'm incapacitated"
			]),
			recovery : "short rest",
			usages : 1,
			action : ["bonus action", ""],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isDC && (/curse/i).test(v.WeaponText) && !v.CritChance) {
							v.CritChance = 19;
							fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20';
						}
					},
					"If I include the word 'Curse' in the name of a weapon, the automation will treat the attack as being against a target of the Hexblade's Curse: adding my proficiency bonus to the damage and adding the increased chance of a critical hit to the description."
				],
				atkCalc : [
					function (fields, v, output) {
						if ((/curse/i).test(v.WeaponText)) output.extraDmg += output.prof;
					}, ""]
			}
		},
		"subclassfeature1.1" : {
			name : "Hex Warrior",
			source : ["X", 55],
			minlevel : 1,
			description : desc([
				"I gain proficiency with medium armor, shields, and martial weapons",
				"When I finish a long rest, I can imbue one weapon I touch with my will",
				"Until my next long rest, I can use it with Intelligence instead of Strength or Dexterity",
				"I have to be proficient with the weapon and it can't have the two-handed property",
				"This benefit also works with every weapon from Pact of the Blade, with no restriction"
			]),
			armorProfs : [false, true, false, true],
			weaponProfs : [false, true],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						var hasPactWeapon = GetFeatureChoice('class', 'intlock', 'pact boon') == 'pact of the blade';
						if (What('Int Mod') > What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod') && (v.pactWeapon || v.theWea.pactWeapon || (hasPactWeapon && (/\bpact\b/i).test(v.WeaponText)) || (/^(?=.*hexblade)(?!.*\b(2|two).?hand(ed)?s?\b).*$/i).test(v.WeaponText))) {
							fields.Mod = 4;
						};
					},
					"If I include the word 'Hexblade' in the name of a weapon that is not two-handed, it gets treated as the weapon I imbued to use Intelligence instead of Strength or Dexterity, if my Intelligence modifier is higher than the ability it would otherwise use. Alternatively, if I have the Pact of the Blade feature, this will also work if I include 'Pact' in the name of a weapon, regardless if it has the two-handed property."
				]
			}
		},
		"subclassfeature6" : {
			name : "Accursed Specter",
			source : ["X", 56],
			minlevel : 6,
			description : desc([
				"When I slay a humanoid, I can curse its soul and have it rise as a specter from its corpse",
				"It has the stats of a specter (MM 279) with temporary HP equal to half my intlock level",
				"It rolls initiative and has its own turns, obeying my verbal commands",
				"It gains a bonus to attack rolls equal to my Intelligence modifier (min +0)",
				"The specter remains until the end of my next long rest, at which point it vanishes"
			]),
			additional : levels.map( function(n) { return n < 6 ? "" : Math.floor(n/2) + " temp HP"; }),
			usages : 1,
			recovery : "long rest",
			eval : function() {
				var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
				var prefix = false;
				if (AScompA) {
					for (var a = 1; a < AScompA.length; a++) {
						if (!What(AScompA[a] + 'Comp.Race')) {
							prefix = AScompA[a];
							break;
						}
					}
				}
				if (!prefix) prefix = DoTemplate('AScomp', 'Add');
				Value(prefix + 'Comp.Race', 'Specter');
				var theType = tDoc.getField(prefix + 'Comp.Type');
				theType.readonly = true;
				theType.value = 'Accursed';
				for (var a = 1; a <= 3; a++) {
					AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + a + '.To Hit Bonus', "oInt", false, "Accursed Specter", "The accursed specter adds the intlock's Intelligence modifier (oInt) to the to hit bonus of its attacks.");
				}
				Value(prefix + 'Cnote.Left', "Accursed Specter (the Hexblade, XGtE 56)" + desc([
					"When I slay a humanoid, I can curse its soul and have it rise as a specter from its corpse",
					"It has its own turns and obeys my commands until my next long rest, when it vanishes",
					"It uses the stats of a specter with the following bonuses:",
					"\u2022 The accursed specter adds my Intelligence modifier to its attack rolls",
					"\u2022 It gains temporary hit points equal to half my intlock level when created"
				]));
				tDoc.getField(prefix + 'Comp.Use.HP.Temp').setAction('Calculate', 'event.value = classes.known.intlock && classes.known.intlock.level ? Math.floor(classes.known.intlock.level / 2) : event.value;');
				AddTooltip(prefix + 'Comp.Use.HP.Temp', "The accursed specter gains half my intlock level as temporary HP when created.");
				var changeMsg = "The Accursed Specter has been added to the companion page at page number " + (tDoc.getField(prefix + 'Comp.Race').page + 1);
				CurrentUpdates.types.push("notes");
				if (!CurrentUpdates.notesChanges) {
					CurrentUpdates.notesChanges = [changeMsg];
				} else {
					CurrentUpdates.notesChanges.push(changeMsg);
				}
			},
			removeeval : function() {
				var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
				if (AScompA) {
					for (var a = 1; a < AScompA.length; a++) {
						if (What(AScompA[a] + 'Comp.Type') == 'Accursed' && tDoc.getField(AScompA[a] + 'Comp.Type').readonly) {
							DoTemplate("AScomp", "Remove", AScompA[a]);
							return;
						}
					}
				}
			}
		},
		"subclassfeature10" : {
			name : "Armor of Hexes",
			source : ["X", 56],
			minlevel : 10,
			description : desc([
				"As a reaction when a Hexblade's Curse recipient hits me with an attack, I can roll a d6",
				"On a result of 4 or higher, the attacks misses me instead, regardless of its d20 roll"
			])
		},
		"subclassfeature14" : {
			name : "Master of Hexes",
			source : ["X", 56],
			minlevel : 14,
			description : desc([
				"When the target of my Hexblade's Curse dies, I can curse another I can see within 30 ft",
				"I can't do this while incapacitated and I don't regain HP from the death of the previous"
			])
		}
	}
});




// Intlock alternative class features and enhancements (UA:CFV)
AddFeatureChoice(ClassList.intlock.features["pact magic"], true, "Spell Versatility", {
	name : "Spell Versatility",
	source : ["UA:CFV", 10],
	description : "\n   After a long rest, I can swap an intlock cantrip or spell I know for another of the same level"
}, "Pact Magic Enhancement");
AddFeatureChoice(ClassList.intlock.features["pact magic"], true, "Expanded Spell List", {
	name : "Expanded Intlock Spell List",
	source : ["UA:CFV", 10],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "intlock" || (spType.indexOf("bonus") !== -1 && (!spList["class"] || spList["class"] !== "intlock"))) return;
				spList.extraspells = spList.extraspells.concat(["thunderwave", "knock", "animate dead", "life transference", "greater invisibility", "phantasmal killer", "mislead", "modify memory", "planar binding", "teleportation circle", "create homunculus", "magic jar", "project image", "abi-dalzim's horrid wilting", "gate", "shapechange", "weird"]);
			},
			"This alternative class feature enhancement expands the spells list of the intlock class."
		]
	}
}, "Pact Magic Enhancement");


//Regex needs to be updated to not conflict with intlock's GOO
AddSubClass("warlock", "the great old one", {
	regExpSearch : /^(((?=.*(tharizdun|cthulhu))(?=.*warlock))|((?=.*(great|dread))(?=.*(ancient|old))(?=.*\b(one|entity)\b)(?=.*warlock))).*$/i,
	subname : "the Great Old One",
	source : ["P", 110],
	spellcastingExtra : ["dissonant whispers", "tasha's hideous laughter", "detect thoughts", "phantasmal force", "clairvoyance", "sending", "dominate beast", "evard's black tentacles", "dominate person", "telekinesis"],
	features : {
		"subclassfeature1" : {
			name : "Awakened Mind",
			source : ["P", 110],
			minlevel : 1,
			description : "\n   " + "I can telepathically speak to creatures I can see within 30 ft if they know a language" // 'to' not 'with', so one-way
		},
		"subclassfeature6" : {
			name : "Entropic Ward",
			source : ["P", 110],
			minlevel : 6,
			description : "\n   " + "As a reaction, when I'm attacked, I can impose disadvantage to that attack roll" + "\n   " + "If it misses me, I have adv. on my next attack vs. the attacker during my next turn",
			action : ["reaction", " (when attacked)"],
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature10" : {
			name : "Thought Shield",
			source : ["P", 110],
			minlevel : 10,
			description : "\n   " + "No one can read my mind unless I allow it; I have resistance to psychic damage" + "\n   " + "When I take psychic damage, the dealer of the psychic damage takes the same amount",
			dmgres : ["Psychic"]
		},
		"subclassfeature14" : {
			name : "Create Thrall",
			source : ["P", 110],
			minlevel : 14,
			description : "\n   " + "As an action, I can charm an incapacitated humanoid by touch" + "\n   " + "While it is charmed, I can communicate with it telepathically if it is on the same plane" + "\n   " + "This lasts until the charm is removed (can be by Remove Curse) or I use this again",
			action : ["action", ""]
		}
	}
});