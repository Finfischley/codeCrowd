module.exports = function(sequelize, DataTypes){
	return sequelize.define("Study_Guide_Post", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validation: {
				len: [1, 150]
			}
		}, 
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		}, 
		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		flags: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		tag: {
			type: DataTypes.STRING,
			allowNull: false
		}	
	});
};