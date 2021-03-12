/*IMPORT PACKAGES*/
const express = require("express");
const router = express.Router(); //méthode routeur express
const controlSauce = require("../controllers/sauce"); //controllers d'authentification
const auth = require("../middleware/auth"); //middleware pour la gestion de fichiers
const multer = require("../middleware/multer-config"); //multer > images

/*LOGIQUE DE ROUTE*/
router.post("/", auth, multer, controlSauce.createSauce); //createThing du controleur à la route POST
router.post("/:id/like", auth, controlSauce.likeSauce);
router.put("/:id", auth, multer, controlSauce.modifySauce);
router.delete("/:id", auth, controlSauce.deleteSauce);
router.get("/:id", auth, controlSauce.getOneSauce);
router.get("/", auth, controlSauce.getAllSauces);

module.exports = router;
