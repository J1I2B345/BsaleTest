const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"product",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url_image: {
				type: DataTypes.STRING,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			discount: {
				type: DataTypes.INTEGER,
			},
			// category: {
			// 	type: DataTypes.INTEGER,
			// 	references: {
			// 		model: "category",
			// 		key: "id",
			// 	},
			// },
		},
		{ timestamps: false, freezeTableName: true }
	);
};
