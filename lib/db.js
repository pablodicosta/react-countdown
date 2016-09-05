var Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server,
	config = require('../config.json');

var host = config.db.host,
	port = config.db.port,
	auth = config.db.authenticate;

var db = new Db('countdown',
	new Server(host, port, {}),
	{ native_parser : false, safe : true } );

module.exports = {
	find : function(name, query, limit, callback) {
		db.collection(name).find(query)
		  .sort({ _id : -1 })
		  .limit(limit)
		  .toArray(callback);
	},
	open : function(callback) {
		db.open(function(err, data) {
			if(!err) {
				if(auth) {
					data.authenticate(config.db.user, config.db.password, function(err2, authData) {
						if(authData) {
							callback();
						} else {
							callback(err2);
						}
					});
				} else {
					callback();
				}
			} else {
				callback(err);
			}
		});
	},
	update : function(name, updateQuery, callback) {
		db.collection(name).updateMany({ }, { $set : updateQuery }, { upsert : true }, callback);
	}
}
