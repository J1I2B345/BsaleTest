require("dotenv").config();
const app = require("./server");
const { db } = require("./db/db");
PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	db.sync({ force: false });
});
