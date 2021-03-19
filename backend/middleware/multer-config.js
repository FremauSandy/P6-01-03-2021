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
		//dossier images
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_"); //remplacer espace par underscore
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + "." + extension); //ajout d'une extension au fichier
	}
});

module.exports = multer({ storage: storage }).single("image");
