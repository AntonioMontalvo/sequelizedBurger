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

//READ
router.get('/index', function(req, res){
	Burger.findAll({})
		.then(function(result){
			var hbsObject = { burger: result };
			// console.log(hbsObject);
			res.render('index', hbsObject);
			// return res.json(result);
		});
});
//CREATE

router.post('/create', function (req, res){
	// Take the request...
		var userMunchies = req.body.burger_name;
		Burger.create({
			burger_name: userMunchies
		});
		res.redirect('/index');	
});

//UPDATE


router.put('/update/:id', function(req, res){
	var condition = req.params.id;
	var userMunchies = req.body.burger_name;

	Burger.findOne({where: {burger_name: userMunchies} })
		.then(
			Burger.update(
				{
					devoured: true
				},
				{
					where: {id: condition}
				}
				)
			);

	res.redirect('/index');	

});



module.exports = router;