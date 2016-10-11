/*
Here is where you setup a model for how to interface with the database.
*/
//
var orm = require('../config/orm.js');

//this object contains methods to call the methods on orm and to handle the response for each callback to the methods on orm.
var burger = {
	selectAll: function (cb) {
		orm.selectAll('burgers', function(res){
			cb(res);
		});
	},
	insertOne: function (cols, vals, cb) {
		//the burger.insertOne method passes 2 arguments to orm.insertOne. The 'burgers' argument refers to the burgers table. cols refers to the burger_name column in the burgers table. The actual value comes from the request body name [req.body.burger_name] given through router.post. index.handlebars gives this information to router.post when the user clicks on the Devour it! button in the  form. The form has the action='index/create' and method 'POST' for this. And the callback function.
		orm.insertOne('burgers', cols, vals, function(res){
			cb(res);
		});
	},
	updateOne: function (objColVals, condition, cb) {
		orm.updateOne('burgers', objColVals, condition, function(res){
			cb(res);
		});
	}
};

module.exports = burger;