const { Sequelize } = require("sequelize");
const modelProduct = require("./models/product");
const modelCategory = require("./models/category");

const db =
	process.env.NODE_ENV === "production"
		? new Sequelize(
				//DB_Name
				process.env.DB_Name,
				//Username
				process.env.DB_User,
				//password
				process.env.DB_Password,
				{
					//host
					host: process.env.DB_Host,
					dialect: "mysql",
					port: 5432,
					pool: {
						max: 3,
						min: 1,
						idle: 10000,
					},
					dialectOptions: {
						ssl: {
							require: true,
							// Ref.: https://github.com/brianc/node-postgres/issues/2009
							rejectUnauthorized: false,
						},
						keepAlive: true,
					},
					ssl: true,
				}
		  )
		: new Sequelize(
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
					pool: {
						max: 3,
						min: 1,
						idle: 10000,
					},
					dialectOptions: {
						ssl: {
							require: true,
							// Ref.: https://github.com/brianc/node-postgres/issues/2009
							rejectUnauthorized: false,
						},
					},
					ssl: true,
				}
		  );

modelProduct(db);
modelCategory(db);

const { product, category } = db.models;
product.belongsTo(category, { foreignKey: "category", as: "categoryId" });
category.hasMany(product, { foreignKey: "category", as: "categoryId" });

module.exports = {
	...db.models,
	db,
};
