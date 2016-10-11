/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();// I control the routes.
var Burger = require('../models')['Burger'];//access to the database. Pulls out the Burger Model

//the first time the server recieves a request if is '/'. It redirects to '/index'.
router.get('/', function (req, res) {
	res.redirect('/index');
});


router.get('/index', function(req, res){
	Burger.findAll({})
		.then(function(result){
			var hbsObject = { burger: result };
			// console.log(hbsObject);
			res.render('index', hbsObject);
			// return res.json(result);
		});
});




//READ
//when the client requets '/index' it calls the burger.selectAll method and passes an anonymous function. This function has a parameter data. The argument given to data is the result 'stored' as a response from the orm.all method. Once the data is obtained the function gives an object to handlebars which will be render in index.handlebars
// router.get('/index', function (req, res) {
// 	burger.selectAll(function (data) {
// 		var hbsObject = { burger: data };
// 		console.log(hbsObject);
// 		res.render('index', hbsObject);
// 	});
// });

// //CREATE
// router.post('/create', function (req, res) {
// 	burger.insertOne(['burger_name'], [req.body.burger_name], function () {
// 		res.redirect('/index');
// 	});
// });

// //UPDATE
// router.put('/update/:id', function (req, res) {
// 	var condition = 'id = ' + req.params.id;

// 	// console.log('condition', condition);
// 	// console.log(req.body.burger_name);
// 	burger.updateOne({ burger_name: req.body.burger_name }, condition, function () {
// 		res.redirect('/index');
// 	});
// });




module.exports = router;