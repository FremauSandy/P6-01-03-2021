/*IMPORT PACKAGES*/
const express = require("express");
const router = express.Router(); // routeur
const verifyPass = require("../middleware/passwordVerify"); //import securité
const userCtrl = require("../controllers/user");
const bouncer = require("express-bouncer")(60000, 300000, 5); // securité contre le forçing, impose un délai d'attente

/*LIMITE CONNECTIONS*/
bouncer.blocked = function (req, res, next, remaining) {
	res.send(
		429,
		"Too many requests have been made, " + "please wait " + remaining / 1000 + " seconds"
	);
};

/*LOGIQUE DE ROUTE*/
router.post("/signup", verifyPass, userCtrl.signup);
router.post("/login", bouncer.block, userCtrl.login);

module.exports = router;
