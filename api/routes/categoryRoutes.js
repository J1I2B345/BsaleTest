const { Router } = require("express");
const router = Router();

router.get("/get", (req, res) => {
	res.send("hola!");
});

module.exports = router;
