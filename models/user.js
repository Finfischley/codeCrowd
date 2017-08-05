module.exports = function(sequelize, DataTypes){
	return sequelize.define("User", {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validation: {
				len: [5,25]
			}
		}, 
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validation: {
				len: [8,12]
			}
		}
	});
};