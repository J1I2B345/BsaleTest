require("dotenv").config();
const app = require("./server");
const { db } = require("./db/db");

PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	db.sync();
});

//keep alive configuration
server.keepAliveTimeout = 60 * 1000;
server.headersTimeout = 65 * 1000;
