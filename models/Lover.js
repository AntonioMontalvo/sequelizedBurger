// Lover Model

module.exports = function(sequelize, DataTypes){
	var Lover = sequelize.define('Lover', {
		// our primary id
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
	
		fullName: {
			type: DataTypes.STRING,
		}
	})

	// return Lover, effectively exporting it
	return Lover;
}