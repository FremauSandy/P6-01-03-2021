/*IMPORT PACKAGES*/
const multer = require("multer"); //package gestion de fichiers entrants

/*CONFIGURATION MULTER*/
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png"
};

const storage = multer.diskStorage({
	//enregistrement
	destination: (req, file, callback) => {
		//localistaion de l'enregistrement
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_"); //remplacer espace par underscore
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + "." + extension); //ajout d'une extension au fichier
	}
});

const fileFilter = (req, file, callback) => {
	//ajout d'un filtre sur l'image
	const extension = MIME_TYPES[file.mimetype];
	if (extension === "jpg" || extension === "png") {
		callback(null, true);
	} else {
		callback("Erreur : Mauvais type de fichier", false); // erreur si le fichier envoyé est différent de celui demandé
	}
};

module.exports = multer({ storage: storage }).single("image");
