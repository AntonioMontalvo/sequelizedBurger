/*
Here is where you set up your server file.
express middleware.
*/

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//SET UP EXPRESS AND CONFIGURE
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: true
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


//SEQUELIZE
// and we bring in our models folder. This brings in the model's object, as defined in index.js
var models  = require('./models');
var lovedBurger;
var anotherLovedBurger;

console.log(models.Burger.Instance.prototype)

// extract our sequelize connection from the models object, to avoid confusion
var sequelizeConnection = models.sequelize

// PREPARE OUR TABLES 
// We run this query so that we can drop our tables even though they have foreign keys
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

//sync the table
.then(function(){
	return sequelizeConnection.sync({force:true}); //{force:true} is for development only
})

.then(function(){
	return models.Burger.create(
		{
			burger_name: "Triple Cheese Burger", 
			Lover: {
				fullName: "Mr Yemerson"
			}
		},
		{
			include: [models.Lover]
		}
	)
	.then(function(TripleCheeseBurger){
		return lovedBurger = TripleCheeseBurger;
	});
})
.then(function(){
	return models.Burger.create(
		{
			burger_name: "Quadruple Cheese Burger", 
			Lover: {
				fullName: "Jonnie Pesao"
			}
		},
		{
			include: [models.Lover]
		}
	)
	.then(function(QuadrupleCheeseBurger){
		return anotherLovedBurger = QuadrupleCheeseBurger;
	});
})

.then(function(){
	return models.Lover.create(
		{
			fullName: "Johnnie Pesao", 
		}
	)
	.then(function(Pesao){
		return lovedBurger.addLover(Pesao);
	})
})
.then(function(){
	return models.Lover.create(
		{
			fullName: "Mr. Yemerson", 
		}
	)
	.then(function(Yemerson){
		return anotherLovedBurger.addLover(Yemerson);
	})
})




//SET UP HANDLEBARS AND CONFIGURE
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//ACCESS TO  THE ROUTES 
var routes = require('./controllers/burgers_controllers.js'); 
app.use('/', routes);//EXPRESS USE THIS


var port = 3000 || process.env.PORT;
app.listen(port);
