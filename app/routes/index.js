'use strict';


module.exports = function (app, db) {
	var request = require("request");
	var addToDB = require("../models/addDBhandler.js");
	var pullFromDB = require("../models/pullDBhandler.js");
	
	app.route("/")
		.get(function (req, res) {
			res.sendFile(process.cwd() + "/public/index.html");	
		});


	app.route("/api/imagesearch/:QUERY")
		.get(function (req,res) {
			var offset = 1;
			if (req.query["offset"]) {
				offset = +req.query["offset"];
			}
			var urls = [];
			var end = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAZz38HvWaNZ5N3HwkzdqtBvNWf_onrdhs&cx=001144473970011108897:sc0uuj_4bns&q=";
			end += req.params.QUERY + "&start=" + ((offset-1)*10+1);
			request(end, 
				function(err, response, body) {
				if (err) throw err;
				var data = JSON.parse(body);
				for (var i = 0; i < 10; i++) {
					urls.push([data.items[i].pagemap.imageobject[0].url, data.items[i].title]);
				}
				res.send(JSON.stringify(urls));
				addToDB(db, req.params.QUERY);
			});
		});
	
	
	app.route("/api/latest/imagesearch")
		.get(function (req,res) {
			pullFromDB(db, function (err, data) {
				if (err) throw err;
				console.log(data);
				res.send(JSON.stringify(data));
			});	
		});
};