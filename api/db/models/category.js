const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"category",
		{
			name: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);
};
