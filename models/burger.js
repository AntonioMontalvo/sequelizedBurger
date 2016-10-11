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
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {
			// OUR hasOne() RELATION
			// associate gets called within index.js,
			// and mergers this model with models.Store
			// The foreign key will be placed on the Store table

      associate: function(models) {
      	//
      }
    }
  })

	// Finally, we return the Manager model to the Module
	return Manager;
}