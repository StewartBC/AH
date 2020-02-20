const express = require("express");
const app = express();
const request = require('request');
var http = require('http').Server(app);
const PORT = process.env.PORT || 3000;
var token = "";
const blizzard = require('blizzard.js').initialize({
    key: 'a2408d93601d4ad0b84b16b8f6ee6057',
    secret: 'uWpBJjw12LPk7Oh784Ze8X2aWm2J6CDH',
    origin: 'us',
    locale: 'en_US'
});
var realms = [
    {
        names: ["Kilrogg"],
        id: 4
    }, {
        names: ["Proudmoore"],
        id: 5
    }, {
        names: ["Frostwolf"],
        id: 7
    }, {
        names: ["Kil'jaeden"],
        id: 9
    }, {
        names: ["Blackrock"],
        id: 10
    }, {
        names: ["Tichondrius"],
        id: 11
    }, {
        names: ["Silver Hand"],
        id: 12
    }, {
        names: ["Eitrigg"],
        id: 47
    }, {
        names: ["Garona"],
        id: 51
    }, {
        names: ["Alleria"],
        id: 52
    }, {
        names: ["Hellscream"],
        id: 53
    }, {
        names: ["Blackhand"],
        id: 54
    }, {
        names: ["Whisperwind"],
        id: 55
    }, {
        names: ["Illidan"],
        id: 57
    }, {
        names: ["Stormreaver"],
        id: 58
    }, {
        names: ["Stormrage"],
        id: 60
    }, {
        names: ["Zul'jin"],
        id: 61
    }, {
        names: ["Medivh"],
        id: 62
    }, {
        names: ["Durotan"],
        id: 63
    }, {
        names: ["Bloodhoof"],
        id: 64
    }, {
        names: ["Elune"],
        id: 67
    }, {
        names: ["Lothar"],
        id: 68
    }, {
        names: ["Arthas"],
        id: 69
    }, {
        names: ["Mannoroth"],
        id: 70
    }, {
        names: ["Warsong"],
        id: 71
    }, {
        names: ["Bleeding Hollow"],
        id: 73
    }, {
        names: ["Skullcrusher"],
        id: 74
    }, {
        names: ["Argent Dawn"],
        id: 75
    }, {
        names: ["Sargeras"],
        id: 76
    }, {
        names: ["Azgalor"],
        id: 77
    }, {
        names: ["Magtheridon"],
        id: 78
    }, {
        names: ["Dragonmaw"],
        id: 84
    }, {
        names: ["Shadowsong"],
        id: 85
    }, {
        names: ["Silvermoon"],
        id: 86
    }, {
        names: ["Windrunner"],
        id: 87
    }, {
        names: ["Terenas"],
        id: 90
    }, {
        names: ["Burning Blade"],
        id: 91
    }, {
        names: ["Eonar"],
        id: 96
    }, {
        names: ["Kargath"],
        id: 98
    }, {
        names: ["Llane"],
        id: 99
    }, {
        names: ["Earthen Ring"],
        id: 100
    }, {
        names: ["Laughing Skull"],
        id: 101
    }, {
        names: ["Malygos"],
        id: 104
    }, {
        names: ["Thunderhorn"],
        id: 105
    }, {
        names: ["Fizzcrank"],
        id: 106
    }, {
        names: ["Draka"],
        id: 113
    }, {
        names: ["Dragonblight"],
        id: 114
    }, {
        names: ["Draenor"],
        id: 115
    }, {
        names: ["Uldum"],
        id: 116
    }, {
        names: ["Bronzebeard"],
        id: 117
    }, {
        names: ["Feathermoon"],
        id: 118
    }, {
        names: ["Bloodscalp"],
        id: 119
    }, {
        names: ["Darkspear"],
        id: 120
    }, {
        names: ["Azjol-Nerub"],
        id: 121
    }, {
        names: ["Perenolde"],
        id: 122
    }, {
        names: ["Eldre'Thalas"],
        id: 123
    }, {
        names: ["Shadow Council"],
        id: 125
    }, {
        names: ["Firetree"],
        id: 127
    }, {
        names: ["Frostmane"],
        id: 128
    }, {
        names: ["Skywall"],
        id: 131
    }, {
        names: ["Runetotem"],
        id: 151
    }, {
        names: ["Moonrunner"],
        id: 153
    }, {
        names: ["Detheroc"],
        id: 154
    }, {
        names: ["Kalecgos"],
        id: 155
    }, {
        names: ["Ursin"],
        id: 156
    }, {
        names: ["Dark Iron"],
        id: 157
    }, {
        names: ["Greymane"],
        id: 158
    }, {
        names: ["Wildhammer"],
        id: 159
    }, {
        names: ["Staghelm"],
        id: 160
    }, {
        names: ["Emerald Dream"],
        id: 162
    }, {
        names: ["Maelstrom"],
        id: 163
    }, {
        names: ["Twisting Nether"],
        id: 164
    }, {
        names: ["Kael'thas"],
        id: 1069
    }, {
        names: ["Alexstrasza"],
        id: 1070
    }, {
        names: ["Kirin Tor"],
        id: 1071
    }, {
        names: ["Ravencrest"],
        id: 1072
    }, {
        names: ["Agamaggan"],
        id: 1129
    }, {
        names: ["Aegwynn"],
        id: 1136
    }, {
        names: ["Chromaggus"],
        id: 1138
    }, {
        names: ["Korgath"],
        id: 1146
    }, {
        names: ["Kul Tiras"],
        id: 1147
    }, {
        names: ["Rexxar"],
        id: 1151
    }, {
        names: ["Arathor"],
        id: 1165
    }, {
        names: ["Cenarius"],
        id: 1168
    }, {
        names: ["Cenarion Circle"],
        id: 1169
    }, {
        names: ["Wyrmrest Accord"],
        id: 1171
    }, {
        names: ["Madoran"],
        id: 1173
    }, {
        names: ["Anvilmar"],
        id: 1174
    }, {
        names: ["Trollbane"],
        id: 1175
    }, {
        names: ["Muradin"],
        id: 1182
    }, {
        names: ["Vek'nilash"],
        id: 1184
    }, {
        names: ["Sen'jin"],
        id: 1185
    }, {
        names: ["Baelgun"],
        id: 1190
    }, {
        names: ["Drakkari"],
        id: 1425
    }, {
        names: ["Aerie Peak"],
        id: 1426
    }, {
        names: ["Ragnaros"],
        id: 1427
    }, {
        names: ["Quel'Thalas"],
        id: 1428
    }, {
        names: ["Goldrinn"],
        id: 3207
    }, {
        names: ["Nemesis"],
        id: 3208
    }, {
        names: ["Azralon"],
        id: 3209
    }, {
        names: ["Gallywix"],
        id: 3234
    }, {
        names: ["Hyjal"],
        id: 3661
    }, {
        names: ["Moon Guard"],
        id: 3675
    }, {
        names: ["Area 52"],
        id: 3676
    }, {
        names: ["Garrosh"],
        id: 3677
    }, {
        names: ["Thrall"],
        id: 3678
    }, {
        names: ["Dalaran"],
        id: 3683
    }, {
        names: ["Mal'Ganis"],
        id: 3684
    }, {
        names: ["Turalyon"],
        id: 3685
    }, {
        names: ["Kel'Thuzad"],
        id: 3693
    }, {
        names: ["Lightbringer"],
        id: 3694
    }, {
        names: ["Caelestrasz"],
        id: 3721
    }, {
        names: ["Aman'Thul"],
        id: 3722
    }, {
        names: ["Barthilas"],
        id: 3723
    }, {
        names: ["Thaurissan"],
        id: 3724
    }, {
        names: ["Frostmourne"],
        id: 3725
    }, {
        names: ["Khaz'goroth"],
        id: 3726
    }, {
        names: ["Jubei'Thos"],
        id: 3728
    }, {
        names: ["Saurfang"],
        id: 3729
    }
];
var itemReference = [
    {
        description: "plate gloves",
        id: 175006
    },
    {
        description: "mail belt",
        id: 175005
    },
    {
        description: "leather boots",
        id: 175007
    },
    {
        description: "cloth pants",
        id: 175004
    },
    {
        description: "ring",
        id: 175008
    },
    {
        description: "shield",
        id: 175010
    },
    {
        description: "off-hand",
        id: 175009
    }
];
var corruptionReference = [
    {
        name: "Expedient I",
        id: 6474
    },
    {
        name: "Expedient II",
        id: 6475
    },
    {
        name: "Expedient III",
        id: 6476
    },
    {
        name: "Masterful I",
        id: 6471
    },
    {
        name: "Masterful II",
        id: 6472
    },
    {
        name: "Masterful III",
        id: 6473
    },
    {
        name: "Severe I",
        id: 6480
    },
    {
        name: "Severe II",
        id: 6481
    },
    {
        name: "Severe III",
        id: 6482
    },
    {
        name: "Versatile I",
        id: 6477
    },
    {
        name: "Versatile II",
        id: 6478
    },
    {
        name: "Versatile III",
        id: 6479
    },
    {
        name: "Strikethrough I",
        id: 6437
    },
    {
        name: "Strikethrough II",
        id: 6438
    },
    {
        name: "Strikethrough III",
        id: 6439
    },
    {
        name: "Racing Pulse I",
        id: 6555
    },
    {
        name: "Racing Pulse II",
        id: 6559
    },
    {
        name: "Racing Pulse III",
        id: 6560
    },
    {
        name: "Deadly Momentum I",
        id: 6556
    },
    {
        name: "Deadly Momentum II",
        id: 6561
    },
    {
        name: "Deadly Momentum III",
        id: 6562
    },
    {
        name: "Surging Vitality I",
        id: 6558
    },
    {
        name: "Surging Vitality II",
        id: 6565
    },
    {
        name: "Surging Vitality III",
        id: 6566
    },
    {
        name: "Honed Mind I",
        id: 6557
    },
    {
        name: "Honed Mind II",
        id: 6563
    },
    {
        name: "Honed Mind III",
        id: 6564
    },
    {
        name: "Echoing Void I",
        id: 6549
    },
    {
        name: "Echoing Void II",
        id: 6550
    },
    {
        name: "Echoing Void III",
        id: 6551
    },
    {
        name: "Infinite Stars I",
        id: 6552
    },
    {
        name: "Infinite Stars II",
        id: 6553
    },
    {
        name: "Infinite Stars III",
        id: 6554
    },
    {
        name: "Ineffable Truth I",
        id: 6547
    },
    {
        name: "Ineffable Truth II",
        id: 6548
    },
    {
        name: "Twilight Devastation I",
        id: 6537
    },
    {
        name: "Twilight Devastation II",
        id: 6538
    },
    {
        name: "Twilight Devastation III",
        id: 6539
    },
    {
        name: "Twisted Appendage I",
        id: 6543
    },
    {
        name: "Twisted Appendage II",
        id: 6544
    },
    {
        name: "Twisted Appendage III",
        id: 6545
    },
    {
        name: "Void Ritual I",
        id: 6540
    },
    {
        name: "Void Ritual II",
        id: 6541
    },
    {
        name: "Void Ritual III",
        id: 6542
    },
    {
        name: "Gushing Wound",
        id: 6573
    }
];
var items = [];
var realmsChecked = 0;
function getNewAuctions() {
    realmsChecked = 0;
    console.log(token + "new auction check")
    var itemList = [];
    realms.forEach(realm => {
        request(`https://us.api.blizzard.com/data/wow/connected-realm/${realm.id}/auctions?namespace=dynamic-us&locale=en_US&access_token=${token}`, { json: true }, function (error, response, html) {
            realmsChecked++;
            if (error) {
                console.log(error)
                blizzard.getApplicationToken().then(response => {
                    console.log(response.data.access_token);
                    token = response.data.access_token;
                    blizzard.defaults.token = response.data.access_token
                });
            } else {
                if (response.body.auctions !== undefined) {
                    response.body.auctions.forEach(auction => {
                        itemReference.forEach(reference => {
                            if (auction.item.id === reference.id) {
                                var item = {
                                    description: reference.description,
                                    price: Math.round(auction.buyout / 10000),
                                    priceString: "",
                                    realm: realm.names[0],
                                    corruption: "",
                                    ilvl: 0,
                                    socket: false
                                }
                                corruptionReference.forEach(corruption => {
                                    auction.item.bonus_lists.forEach(bonus => {
                                        if (bonus === 4822) {
                                            item.ilvl = 445;
                                        } else if (bonus === 4823) {
                                            item.ilvl = 460;
                                        } else if (bonus === 4824) {
                                            item.ilvl = 475;
                                        } else if(bonus === 4825) {
                                            item.ilvl = 430;
                                        }
                                        if (corruption.id === bonus) {
                                            item.corruption = corruption.name;
                                        }
                                        if (bonus === 1808) {
                                            item.socket = true;
                                        }
                                    });
                                });
                                item.priceString = item.price.toLocaleString();
                                itemList.push(item);
                            }
                        });
                    });
                } else {
                    console.log(`${realm.id} not defined`);
                }
            }
        });
    });
    items = itemList;
    return itemList;
}
function getAuctions() {
    realmsChecked = 0;
    console.log(token)
    var itemList = [];
    realms.forEach(realm => {
        request(`https://us.api.blizzard.com/data/wow/connected-realm/${realm.id}/auctions?namespace=dynamic-us&locale=en_US&access_token=${token}`, { json: true }, function (error, response, html) {
            if (error) {
                console.log(error)
                blizzard.getApplicationToken().then(response => {
                    console.log(response.data.access_token);
                    token = response.data.access_token;
                    blizzard.defaults.token = response.data.access_token
                });
            } else {
                realmsChecked++;
                response.body.auctions.forEach(auction => {
                    itemReference.forEach(reference => {
                        if (auction.item.id === reference.id) {
                            var item = {
                                description: reference.description,
                                price: Math.round(auction.buyout / 10000),
                                priceString: "",
                                realm: realm.names[0],
                                corruption: "",
                                ilvl: 0,
                                socket: false
                            }
                            corruptionReference.forEach(corruption => {
                                auction.item.bonus_lists.forEach(bonus => {
                                    if (bonus === 4822) {
                                        item.ilvl = 445;
                                    } else if (bonus === 4823) {
                                        item.ilvl = 460;
                                    } else if (bonus === 4824) {
                                        item.ilvl = 475;
                                    } else if(bonus === 4825) {
                                        item.ilvl = 430;
                                    }
                                    if (corruption.id === bonus) {
                                        item.corruption = corruption.name;
                                    }
                                    if (bonus === 1808) {
                                        item.socket = true;
                                    }
                                });
                            });
                            item.priceString = item.price.toLocaleString();
                            itemList.push(item);
                        }
                    });
                });
            }
        });
    });
    items = itemList;
    return itemList;
}

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

blizzard.getApplicationToken().then(response => {
    console.log(response.data.access_token);
    token = response.data.access_token;
    blizzard.defaults.token = response.data.access_token
});



app.get("/auctions", function (req, res) {
    console.log("incoming request");
    console.log(items.length)
    res.send({
        items: items,
        realmsChecked: realmsChecked
    });
});

setTimeout(function(){ getAuctions(); }, 3000);
// setTimeout(function(){ setInterval(function() { getNewAuctions(); }, 108000); }, 3000);


app.get("/auctions/:realmID", function (req, res) {
    const realmID = req.params.realmID;
    request(`https://us.api.blizzard.com/data/wow/connected-realm/${realmID}/auctions?namespace=dynamic-us&locale=en_US&access_token=${token}`, { json: true }, function (error, response, html) {
        if (error) {
            blizzard.getApplicationToken().then(response => {
                console.log(response.data.access_token);
                token = response.data.access_token;
                blizzard.defaults.token = response.data.access_token
            });
        }
        res.json(response);
        // res.json(response.body.auctions);
    });
});

http.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});