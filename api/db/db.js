const { Sequelize } = require("sequelize");
const modelProduct = require("./models/product");
const modelCategory = require("./models/category");

console.log(process.env.DBName, process.env.Username, process.env.Password);
const db = new Sequelize(
	//DB name
	process.env.DBName,
	//Username
	"bsale_test",
	//password
	process.env.Password,
	{
		//host
		host: process.env.Host,
		dialect: "mysql",
	}
);

modelProduct(db);
modelCategory(db);

const { product, category } = db.models;
product.belongsTo(category, { foreignKey: "category", as: "categoryId" });
category.hasMany(product, { foreignKey: "category", as: "categoryId" });

// db.query("SELECT * FROM product", {
// 	model: product, // pass true here if you have any mapped fields
// }).then((data) => console.log(data));

// db.getQueryInterface()
// 	.showAllSchemas()
// 	.then((tableObj) => {
// 		console.log("// Tables in database", "==========================");
// 		console.log(tableObj[0]);
// 	});

module.exports = {
	...db.models,
	db,
};
