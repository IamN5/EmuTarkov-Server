"use strict";

const utility = require('./utility.js');
const profile = require('./profile.js');

var items = JSON.parse(utility.readJson('data/configs/items.json'));
//var backpackItems = JSON.parse(utility.readJson('data/configs/bots/items.json'));
var presets = JSON.parse(utility.readJson("data/configs/bots/botPresets.json"));
var weaponPresets = JSON.parse(utility.readJson("data/configs/bots/botWeapons.json"));
var names = JSON.parse(utility.readJson("data/configs/bots/botNames.json"));
var settings = JSON.parse(utility.readJson("data/server.config.json"));
var handbook = JSON.parse(utility.readJson('data/configs/templates.json'));

function getRandomFloat(min = 0, max = 100) {
	return Math.random() * (max - min + 1) + min;
}
function calculateItemChance(preset){
	let chance = 100;
	let chanceTable = [];
	for(let i = 0; i < Object.keys(preset).length; i++)
	{
		chance /= 2
		let lastChance = ( (i != 0) ? chanceTable[i-1] : 0 );
		chanceTable[i] = lastChance + chance;
	}
		var rng = getRandomFloat();
		for (let j = 0; j < chanceTable.length; j++){
			if(j == 0)
			{
				if(rng < chanceTable[j])
				{
					return j;
				}
			}
			else 
			{
				if(rng < chanceTable[j] && rng > chanceTable[j-1])
				{
					return j;
				}
			}
		}
	return 0;
}

// GENERATE BASE BODY
function generateBotBossKilla(params) {
	let boss = JSON.parse(utility.readJson("data/configs/bots/botBossKilla.json"));

	boss.Info.Settings.Role = params.Role;
	boss.Info.Settings.BotDifficulty = params.Difficulty;
	
	return boss;
}
function generateBotBossBully(params) {
	let boss = JSON.parse(utility.readJson("data/configs/bots/botBossBully.json"));

	boss.Info.Settings.Role = params.Role;
	boss.Info.Settings.BotDifficulty = params.Difficulty;

	return boss;
}
function generateUsecAppearance(bot, internalId) {
	bot._id = "Usec" + internalId;
	bot.Info.LowerNickname = "usec" + internalId;
	bot.Info.Voice = "Usec_" + utility.getRandomInt(1, 3);
	bot.Customization.Head.path = "assets/content/characters/character/prefabs/usec_head_1.bundle";
	bot.Customization.Body.path = "assets/content/characters/character/prefabs/usec_body.bundle";
	bot.Customization.Feet.path = "assets/content/characters/character/prefabs/usec_feet.bundle";

	return bot;
}
function generateBearAppearance(bot, internalId) {
	bot._id = "Bear" + internalId;
	bot.Info.LowerNickname = "Bear" + internalId;
	bot.Info.Voice = "Bear_" + utility.getRandomInt(1, 2);
	bot.Customization.Head.path = "assets/content/characters/character/prefabs/bear_head.bundle";
	bot.Customization.Body.path = "assets/content/characters/character/prefabs/bear_body.bundle";
	bot.Customization.Feet.path = "assets/content/characters/character/prefabs/bear_feet.bundle";

	return bot;
}
function generateScavAppearance(bot, internalId, presets) {
	bot._id = "scav_" + internalId;
	bot.Info.LowerNickname = "scav" + internalId;
	bot.Info.Voice = "Scav_" + utility.getRandomInt(1, 6);
	bot.Customization.Head.path = "assets/content/characters/character/prefabs/" + presets.Head.savage[utility.getRandomIntEx(presets.Head.savage.length)] + ".bundle";
	bot.Customization.Body.path = "assets/content/characters/character/prefabs/" + presets.Body.savage[utility.getRandomIntEx(presets.Body.savage.length)] + ".bundle";
	bot.Customization.Feet.path = "assets/content/characters/character/prefabs/" + presets.Feet.savage[utility.getRandomIntEx(presets.Feet.savage.length)] + ".bundle";

	return bot;
}
function generateBullyFollowerAppearance(bot, internalId) {
	bot._id = "guard_" + internalId;
	bot.Info.Nickname = "Guard " + internalId;
	bot.Info.LowerNickname = "guard" + internalId;
	bot.Info.Voice = "Scav_" + utility.getRandomInt(1, 6);
	bot.Customization.Head.path = "assets/content/characters/character/prefabs/wild_head_1.bundle";
	bot.Customization.Body.path = "assets/content/characters/character/prefabs/wild_security_body_1.bundle";
	bot.Customization.Feet.path = "assets/content/characters/character/prefabs/wild_security_feet_1.bundle";

	return bot;
}
function generateScavSniperAppearance(bot, internalId) {
	bot._id = "sniper_" + internalId;
	bot.Info.Nickname = "Sniper " + internalId;
	bot.Info.LowerNickname = "sniper" + internalId;
	bot.Info.Voice = "Scav_" + utility.getRandomInt(1, 6);
	bot.Customization.Head.path = "assets/content/characters/character/prefabs/" + presets.Head[utility.getRandomIntEx(presets.Head.length)] + ".bundle";
	bot.Customization.Body.path = "assets/content/characters/character/prefabs/" + presets.Body[utility.getRandomIntEx(presets.Body.length)] + ".bundle";
	bot.Customization.Feet.path = "assets/content/characters/character/prefabs/" + presets.Feet[utility.getRandomIntEx(presets.Feet.length)] + ".bundle";

	return bot;
}
function generateRaiderAppearance(bot, internalId) {
	bot._id = "raider_" + internalId;
	bot.Info.Nickname = "Raider " + internalId;
	bot.Info.LowerNickname = "raider" + internalId;
	bot.Info.Voice = presets.pmcBotVoices[utility.getRandomIntEx(presets.pmcBotVoices.length)];
	bot.Customization.Head.path = "assets/content/characters/character/prefabs/" + presets.Head[utility.getRandomIntEx(presets.Head.length)] + ".bundle";
	bot.Customization.Body.path = "assets/content/characters/character/prefabs/" + presets.Body[utility.getRandomIntEx(presets.Body.length)] + ".bundle";
	bot.Customization.Feet.path = "assets/content/characters/character/prefabs/" + presets.Feet[utility.getRandomIntEx(presets.Feet.length)] + ".bundle";

	return bot;
}

// Generating skills (i dont know if its needed ...)
function generateBotSkill(bot, params) {
	// ai settings
	bot.Info.Settings.Role = params.Role;
	bot.Info.Settings.BotDifficulty = params.Difficulty;

	// randomize skills
	for (let skill of bot.Skills.Common) {
		skill.Progress = utility.getRandomIntEx(5000);
		skill.MaxAchieved = skill.Progress;
	}

	// randomize experience
	bot.Info.Experience = utility.getRandomIntEx(100000); //level 54 max

	return bot;
}
function generateBotWeapon(item, params) {
	item = weaponPresets.data[utility.getRandomIntEx(weaponPresets.data.length)];
	// get marksman weapon
	if (params.Role == "marksman") {
		let found = false;
		
		while (found == false) {
			item = weaponPresets.data[utility.getRandomIntEx(weaponPresets.data.length)];
			
			for (let filter of presets.filter_marksman) {
				if (item._items[0]._tpl == filter) {
					found = true;
				}
			}
		}
	}

	// check if its a pistol or primary weapon
	item.isPistol = false;
	//const tier = calculateItemChance(presets.pistols);
	for(let i = 0; i < Object.keys(presets.Pistol).length; i++){
		for (let pistoltpl of presets.Pistol[i]) {
			if (pistoltpl == item._items[0]._tpl) {
				item.isPistol = true;
			}
		}
	}
	return item;
}
// tier dependent loots
function generateItemByPattern(itemType, Inventory){
	let item = {};
	const tier = calculateItemChance(presets[itemType]);
	const len = presets[itemType][tier].length;
	const randomize = utility.getRandomIntEx(len);
	item._id = itemType + utility.getRandomIntEx(1000000);
	item._tpl = presets[itemType][tier][randomize];
	item.parentId = "5c6687d65e9d882c8841f0fd";
	item.slotId = itemType;
	
	if(itemType == "ArmorVest")
	{
		item.upd = {
			"Repairable": {
				"MaxDurability": items.data[item._tpl]._props.MaxDurability,
				"Durability": items.data[item._tpl]._props.MaxDurability
			}
		};
	}
	Inventory.push(item);
	if(itemType == "Backpack")
	{
		// generate inventory items randomly
		Inventory = generateBotBackpackItem(Inventory,item);
	}
	if(itemType == "Headwear")
	{
		const headwearItem = items.data[item._tpl]._props;
		if (headwearItem.Slots.length > 0 && utility.getRandomIntEx(100) <= 100) {
			for (let itemSlot of headwearItem.Slots) {
				if (itemSlot._name == "mod_equipment" || itemSlot._name == "mod_equipment_000" ) {
					let itemslotname = itemSlot._name;
					if (itemSlot._props.filters[0].Filter.length > 0) {
						let compat = itemSlot._props.filters[0].Filter;
						let faceShield = {};
						faceShield._id = itemType + "_cover_" + utility.getRandomIntEx(10000);
						faceShield._tpl = compat[utility.getRandomIntEx(compat.length)];
						faceShield.parentId = item._id;
						faceShield.slotId = itemslotname;
						faceShield.upd = {
							"Togglable": {
								"On": true
							}
						};
						
						Inventory.push(faceShield);
					}
				}
			}		
		}
	}	
	return Inventory;
}
function getItem(template) {
}
function getItemSize(itemID) {
	let toDo = [itemID];
	let tmpItem = items.data[itemID];

	let outX = 0, outY = 0, outL = 0, outR = 0, outU = 0, outD = 0, tmpL = 0, tmpR = 0, tmpU = 0, tmpD = 0;
	outX = tmpItem._props.Width;
	outY = tmpItem._props.Height;
		
	return [outX, outY, outL, outR, outU, outD];
}
function generateBotBackpackItem(botInventory,backpack) {
	const backpackData = items.data[backpack._tpl]._props.Grids[0]
	const backpack2D = Array(backpackData.cellsH).fill(0).map(x => Array(backpackData.cellsV).fill(0));
	//let backpackSize = backpackData.cellsH * backpackData.cellsV; // how much slots we have 
	for(let i = 0; i < 20; i++){
		const item = handbook.data.Items[utility.getRandomIntEx(handbook.data.Items.length)];
		let found = true;
		for (let expt of presets.item_backpack_exceptions) {	
			if (expt == item.ParentId) {
				found = false;
			}
		}
		if(found){
			const tmpSize = getItemSize(items.data[item.Id]._id);
				let tmpSizeX = tmpSize[0] + tmpSize[2] + tmpSize[3];
				let tmpSizeY = tmpSize[1] + tmpSize[4] + tmpSize[5];
			for (let y = 0; y <= backpackData.cellsH - tmpSizeY; y++) {
				for (let x = 0; x <= backpackData.cellsV - tmpSizeX; x++) {
					badSlot = "no";

					leaveThat:
					for (let itemY = 0; itemY < tmpSizeY; itemY++) {
						for (let itemX = 0; itemX < tmpSizeX; itemX++) {
							if (backpack2D[y + itemY][x + itemX] != 0) {
								badSlot = "yes";
								break leaveThat;
							}
						}
					}
					if (badSlot == "yes") {
						continue;
					}
					
					const ItemTemplate = items.data[item.Id];
					backpack2D[tmpSizeY + y].fill(1, x, x + tmpSizeX);
					botInventory.push({
						_id: "BP_" + backpack._id + "_" + utility.getRandomInt(100000, 999999),
						_tpl:	ItemTemplate._id,
						parentId: backpack._id,
						location: {
							x: x, 
							y: y, 
							r: "Horizontal"
						}
					});
				}
			}
		}
	}
return botInventory;
}
function generatePocketItem(pocketNum = 1, spawnChances, botType)
{
	let item = {};
	// determine which item will be added medicament or granade
	if(utility.getRandomIntEx(100) < 50){ 
		if(utility.getRandomIntEx(100) <= spawnChances.medPocket || botType == "followerBully")
		{
			const tier = calculateItemChance(presets.Medicaments);
			const len = presets.Medicaments[tier].length;
			const randomize = utility.getRandomIntEx(len);
			const itemTpl = presets.Medicaments[tier][randomize];
			item._id = "Pocket_" + utility.getRandomIntEx(10000);
			item._tpl = itemTpl;
			item.parentId = "5c6687d65e9d882c8841f121";
			item.slotId = "pocket" + pocketNum;
			item.location = {x: 0,y: 0,r: "Horizontal"};
		}
	} else {
		if(utility.getRandomIntEx(100) <= spawnChances.itemPocket || botType == "followerBully")
		{
			const len = presets.Grenades.length;
			const randomize = utility.getRandomIntEx(len);
			const itemTpl = presets.Grenades[randomize];
			item._id = "Pocket_" + utility.getRandomIntEx(10000);
			item._tpl = itemTpl;
			item.parentId = "5c6687d65e9d882c8841f121";
			item.slotId = "pocket" + pocketNum;
			item.location = {x: 0,y: 0,r: "Horizontal"};
		}
	}
	return item;
}
function assignWeaponToPrimary(weapon) {
	let item = {};
				
	item._id = weapon._id;
	item._tpl = weapon._tpl;
	item.parentId = "5c6687d65e9d882c8841f0fd";
	item.slotId = "FirstPrimaryWeapon";

	return item;
}
function assignWeaponToHolster(weapon) {
	let item = {};
	
	item._id = weapon._id;
	item._tpl = weapon._tpl;
	item.parentId = "5c6687d65e9d882c8841f0fd";
	item.slotId = "Holster";

	return item;
}
function getCompatibleMagazines(weapon) {
	let compatiblesmagazines = {};

	for (let slot of items.data[weapon._items[0]._tpl]._props.Slots) {
		if (slot._name == "mod_magazine") {
			compatiblesmagazines = slot._props.filters[0].Filter;
			break;
		}
	}

	return compatiblesmagazines;
}
function getCompatibleAmmo(weapon) {
	return items.data[weapon._items[0]._tpl]._props.Chambers[0]._props.filters[0].Filter;
}
function getWeaponMagazine(weapon, internalId, compatiblesmags) {
	let item = {};

	item._id = "MagazineWeaponScav" + internalId;
	item._tpl = compatiblesmags[utility.getRandomIntEx(compatiblesmags.length)];
	item.parentId = weapon._items[0]._id;
	item.slotId = "mod_magazine";

	return item;
}
function getWeaponMagazineAmmo(selectedmag, internalId, ammoFilter) {
	let item = {};
	
	item._id = "AmmoMagazine1Scav" + internalId;
	item._tpl = ammoFilter[utility.getRandomIntEx(ammoFilter.length)];
	item.parentId = "MagazineWeaponScav" + internalId;
	item.slotId = "cartridges";
	item.upd = {"StackObjectsCount": items.data[selectedmag]._props.Cartridges[0]._max_count};

	return item;
}
function getMosimAmmo(selectedmag, selectedmagid, internalId, ammoFilter) {
	let item = {};

	item._id = "AmmoMagazine1Scav"+ internalId;
	item._tpl = ammoFilter[utility.getRandomIntEx(ammoFilter.length)];
	item.parentId = selectedmagid;
	item.slotId = "cartridges";
	item.upd = {"StackObjectsCount": items.data[selectedmag]._props.Cartridges[0]._max_count};

	return item;
}
function getVestMagazine(id, itemslot, internalId, compatiblesmags) {
	let item = {};

	item._id = id + internalId;
	item._tpl = compatiblesmags[utility.getRandomIntEx(compatiblesmags.length)];
	item.parentId = "TacticalVestScav" + internalId;
	item.slotId = itemslot.toString();
	item.location = {"x": 0,"y": 0,"r": 0};

	return item;
}
function getVestMagazineAmmo(id, magazineid, selectedmag, internalId, ammoFilter) {
	let item = {};
				
	item._id = id + internalId;
	item._tpl = ammoFilter[utility.getRandomIntEx(ammoFilter.length)];
	item.parentId = magazineid + internalId;
	item.slotId = "cartridges";
	item.upd = {"StackObjectsCount": items.data[selectedmag]._props.Cartridges[0]._max_count};

	return item;
}
function getVestStackAmmo(id, itemslot, internalId, ammoFilter) {
	let item = {};
				
	item._id = id + internalId;
	item._tpl = ammoFilter[utility.getRandomIntEx(ammoFilter.length)];
	item.parentId = "TacticalVestScav" + internalId;
	item.slotId = itemslot.toString();
	item.upd = {"StackObjectsCount": utility.getRandomInt(10, 30)};

	return item;
}
//
function getRandomName(nationality, nameType = '', gender = '') { 
	let name = "UNKNOWN"; 
	let tmpNames = []; 
	 
	switch (nationality) { 
		case "russian": 
			if (nameType == "firstName") { 
				if (gender == "male") { 
					tmpNames = names.russian.first.male; 
				} 
			} 
 
			if (nameType == "lastName") { 
				tmpNames = names.russian.last; 
			} 
			break; 
		case "pmc":
			tmpNames = names.pmc;
			break;
		case "follower":
			tmpNames = names.follower
			break;
		default: 
			break; 
	} 
 
	if (tmpNames.length > 0) { 
		name = tmpNames[utility.getRandomInt(0, tmpNames.length)]; 
	}  
 
	return name; 
} 
function getRandomFullName() { 
	return getRandomName("russian", "firstName", "male") + " " + getRandomName("russian", "lastName", "male"); 
} 
function generateBaseBot(params) {
	let bot = JSON.parse(utility.readJson("data/configs/bots/botBase.json"));
	let internalId = utility.getRandomIntEx(10000);
	// set nickname
	// generate bot appearance
	switch (params.Role) {
		case "followerBully":
			bot.Info.Nickname = getRandomName("follower");
			bot = generateBullyFollowerAppearance(bot, internalId);
			break;

		case "marksman":
			bot.Info.Nickname = getRandomFullName() + "(M)";
			bot = generateScavSniperAppearance(bot, internalId, presets);
			break;

		case "pmcBot":
			bot.Info.Nickname = getRandomName("pmc");
			bot = generateRaiderAppearance(bot, internalId, presets);
			break;
		
		default:
			bot.Info.Nickname = getRandomFullName();
			bot = generateScavAppearance(bot, internalId, presets);
			break;
	}

	// generate PMC bot instead
	if (params.Role != "followerBully" && settings.bots.pmcWar.enabled == true) {
		if (utility.getRandomIntEx(100) <= settings.bots.pmcWar.sideUsec) { 
			bot = generateUsecAppearance(bot, internalId);
			bot.Info.Side = "Usec";
		} else {
			bot = generateBearAppearance(bot, internalId);
			bot.Info.Side = "Bear";
		}
	}

	// generate bot skill
	bot = generateBotSkill(bot, params);

	// choose randomly a weapon from preset.json before filling items
	var weapon = generateBotWeapon(weapon, params);

	// 
	bot.Inventory.items = generateItemByPattern("TacticalVest", bot.Inventory.items);

	// fill your dummy bot with the random selected preset weapon and its mods
	for (let item of weapon._items) {
		if (item._id == weapon._parent) {
			// add weapon to weapon slot
			if (weapon.isPistol == false) {
				bot.Inventory.items.push(assignWeaponToPrimary(item));
			} else {
				bot.Inventory.items.push(assignWeaponToHolster(item));
			}
		} else {
			if (item.slotId == "mod_magazine" ) {
				// randomize magazine
				let compatiblesmagazines = getCompatibleMagazines(weapon);
				let ammoFilter = getCompatibleAmmo(weapon);
				let isMosin = false;

				// check if the weapon is a mosin
				for (let mosinId of presets.filter_mosin) {
					if (weapon._items[0]._tpl == mosinId) {
						isMosin = true;
					}
				}

				// get the magazine
				let mag1 = {};
				let mag2 = getVestMagazine("magazine2VestScav", 2, internalId, compatiblesmagazines);
				let mag3 = getVestMagazine("magazine3VestScav", 3, internalId, compatiblesmagazines);

				// give the weapon ammo
				if (isMosin == false) {
					mag1 = getWeaponMagazine(weapon, internalId, compatiblesmagazines);
					bot.Inventory.items.push(mag1);
					bot.Inventory.items.push(getWeaponMagazineAmmo(mag1._tpl, internalId, ammoFilter));
				} else {
					mag1 = item;
					bot.Inventory.items.push(mag1);
					bot.Inventory.items.push(getMosimAmmo(mag1._tpl, mag1._id, internalId, ammoFilter));
				}

				// add magazines in the vest
				bot.Inventory.items.push(mag2);
				bot.Inventory.items.push(mag3);

				// add ammo to the magazines in the vest				
				bot.Inventory.items.push(getVestMagazineAmmo("AmmoMagazine2Scav", "magazine2VestScav", mag2._tpl, internalId, ammoFilter));
				bot.Inventory.items.push(getVestMagazineAmmo("AmmoMagazine3Scav", "magazine3VestScav", mag3._tpl, internalId, ammoFilter));

				// add a stack of ammo (for moslings and sks)
				bot.Inventory.items.push(getVestStackAmmo("AmmoFree2Scav", 1, internalId, ammoFilter));
			} else {
				// add mods and vital parts
				bot.Inventory.items.push(item);
			}
		}
	}

	// randomize bot health
	for (let bodyPart in bot.Health.BodyParts) {
		bot.Health.BodyParts[bodyPart].Health.Current += utility.getRandomInt(-10, 0);
		bot.Health.BodyParts[bodyPart].Health.Maximum = bot.Health.BodyParts[bodyPart].Health.Current;
	}

	// add a knife
	bot.Inventory.items = generateItemByPattern("Scabbard", bot.Inventory.items);

	// chance to add glasses
	if (utility.getRandomIntEx(100) <= settings.bots.spawn.glasses) {
		bot.Inventory.items = generateItemByPattern("Eyewear", bot.Inventory.items);
	}

	// chance to add face cover
	if (utility.getRandomIntEx(100) <= settings.bots.spawn.faceCover) {
		bot.Inventory.items = generateItemByPattern("FaceCover", bot.Inventory.items);
	}

	// chance to add headwear
	if (utility.getRandomIntEx(100) <= 100) {
		bot.Inventory.items = generateItemByPattern("Headwear", bot.Inventory.items);
	}

	// chance to add a backpack
	if (utility.getRandomIntEx(100) <= settings.bots.spawn.backpack) {
		bot.Inventory.items = generateItemByPattern("Backpack", bot.Inventory.items);
	}

	// chance to add an armor vest
	if (utility.getRandomIntEx(100) <= settings.bots.spawn.armorVest) {
		bot.Inventory.items = generateItemByPattern("ArmorVest", bot.Inventory.items);
	}
	// pockets fill up section
	// chance to add a med pocket, bully followers have 100% chance
	for(let i = 1; i <= 4; i++){
		bot.Inventory.items.push(generatePocketItem(i,settings.bots.spawn,params.Role))
	}
	

	return bot;
}

function generate(databots) {
	console.log(databots);
	let generatedBots = [];
	let botPossibilities = 0;

	// loop to generate all scavs
	for (let params of databots.conditions) {
		// limit spawns
		let limit = -1;

		switch (params.Role) {
			case "bossKilla":
				limit = settings.bots.limit.bossKilla;
				break;

			case "bossBully":
				limit = settings.bots.limit.bossBully;
				break;

			case "followerBully":
				limit = settings.bots.limit.bullyFollowers;
				break;

			case "marksman":
				limit = settings.bots.limit.marksman;
				break;

			case "pmcBot":
				limit = settings.bots.limit.pmcBot;
				break;

			default:
				limit = settings.bots.limit.scav;
				break;
		}

		if (limit > -1) {
			params.Limit = limit;
		}

		// generate as many as the game request
		for (let i = 0; i < params.Limit; i++) {
			switch (params.Role) {
				case "bossKilla":
					generatedBots.push(generateBotBossKilla(params));
					break;
			
				case "bossBully":
					generatedBots.push(generateBotBossBully(params));
					break;

				default:
					generatedBots.push(generateBaseBot(params));
					break;
			}
			
			botPossibilities++;
		}
	}

	console.log("generated " + botPossibilities + " scavs possibilities");
	return generatedBots;
}

function generatePlayerScav() {
	let character = profile.getCharacterData();
	let playerscav = generate({"conditions":[{"Role":"assault","Limit":1,"Difficulty":"normal"}]});
	
	playerscav[0].Info.Settings = {};
	playerscav[0]._id = "5c71b934354682353958e983";
	character.data[0] = playerscav[0];
	
	profile.setCharacterData(character);
}

//module.exports.calculateChance = calculateChance;
module.exports.generate = generate;
module.exports.generatePlayerScav = generatePlayerScav;