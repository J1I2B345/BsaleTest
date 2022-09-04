const { Sequelize } = require("sequelize");
const modelProduct = require("./models/product");
const modelCategory = require("./models/category");

const db = new Sequelize(
	//DB name
	process.env.DB_Name,
	//Username
	process.env.DB_User,
	//password
	process.env.DB_Password,
	{
		//host
		host: process.env.DB_Host,
		dialect: "mysql",
	}
);

modelProduct(db);
modelCategory(db);

const { product, category } = db.models;
product.belongsTo(category, { foreignKey: "category", as: "categoryId" });
category.hasMany(product, { foreignKey: "category", as: "categoryId" });

//keepAlive
// setInterval(function () {
// 	db.query("SELECT 1");
// }, 4800);

module.exports = {
	...db.models,
	db,
};
