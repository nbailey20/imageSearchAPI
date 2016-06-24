'use strict';

module.exports = function (db, callback) {
    var terms = db.collection("terms");
    terms.find().sort({_id: -1}).limit(10).toArray(function (err, docs) {
        if (err) throw err;
        var data = [];
        docs.forEach(function (element) {
            data.push(element["term"]);
        });
        callback(null, data);
    });
};