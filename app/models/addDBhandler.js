'use strict';

module.exports = function (db, querystr) {
    var num = db.collection("num");    
    num.find({_id: 1}, {termNum: 1}).toArray(function (err, docs) {
        if (err) throw err;
        
        if (docs.length === 0) {
            console.log("first time");
            num.insert({_id: 1, termNum: 1});
            var terms = db.collection("terms");
            terms.insert({_id: 1, term: querystr});
        }
        else {
            console.log(docs);
            num.update({_id: 1}, {$inc: {termNum: 1}});
            var terms = db.collection("terms");
            terms.insert({_id: docs[0]["termNum"]+1, term: querystr});
        }   
    });
};