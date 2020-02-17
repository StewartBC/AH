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

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

blizzard.getApplicationToken().then(response => {
        console.log(response.data.access_token);
        token = response.data.access_token;
        blizzard.defaults.token = response.data.access_token
    });

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
        res.json(response.body.auctions);
    });
});

http.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});