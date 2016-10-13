module.exports = function(sequelize, DataTypes){
	var Burger = sequelize.define('Burger', {
		// we save a primary id as an auto-incrementing int.
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		burger_name: {
			type: DataTypes.STRING
		},
		devoured: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {
			
			// The foreign key will be placed on the lovers table

      associate: function(models) {
      	Burger.hasMany(models.Lover);
      }
    }
  })

	// Finally, we return the Manager model to the Module
	return Burger;
}