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
		}
	)
})
.then(function(){
	return models.Burger.create(
		{
			burger_name: "Quadruple Cheese Burger", 
		}
	)
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
