/*IMPORT PACKAGES*/
const dotenv = require("dotenv").config(); // sera definit pour depot github
const expressSession = require("express-session"); //stockage de session côté serveur par défaut

/*CONFIGURATION GESTION*/
const session = {
	// gestion des cookies
	secret: "openclassroom",
	resave: false, //évite l'enregistrement inutile
	saveUninitialized: false,
	cookie: {
		path: "/",
		httpOnly: true, //interdit l'utilisation du cookie côté client
		secure: true,
		maxAge: 86400000, // expiration au bout de 24h
		sameSite: "strict" //application sur le site strictement
	}
};

module.exports = expressSession(session);
