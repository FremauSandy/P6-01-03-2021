const express = require("express");
const router = express.Router(); // création d'un routeur
const verifyPass = require("../middleware/passwordVerify"); //import securité
const userCtrl = require("../controllers/user");
//const bouncer = require("express-bouncer")(60000, 300000, 5); // securité contre le forçing

// bouncer.blocked = function (req, res, next, remaining) {
// 	res.send(
// 		429,
// 		"Too many requests have been made, " + "please wait " + remaining / 1000 + " seconds"
// 	);
// };

/*LOGIQUE DE ROUTE*/
router.post("/signup", userCtrl.signup);
// router.post("/login", bouncer.block, userCtrl.login);
router.post("/login", userCtrl.login);
module.exports = router;
