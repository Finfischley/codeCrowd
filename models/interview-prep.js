module.exports = function(sequelize, DataTypes){
	var Interview_Prep_Post = sequelize.define("Interview_Prep_Post", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 150]
			}
		}, 
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false
		},
		position: {
			type: DataTypes.STRING,
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
		company: {
			type: DataTypes.STRING
		}
	});

	Interview_Prep_Post.associate = function(models){
		Interview_Prep_Post.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Interview_Prep_Post;
};
