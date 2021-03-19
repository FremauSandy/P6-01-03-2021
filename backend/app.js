/*IMPORT PACKAGES*/
const express = require("express"); //import framework express
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // import package mongoose
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet"); // import securité pour app
const path = require("path");
const controlCookie = require("./middleware/controlCookies"); // import midelware express session
const xss = require("xss-clean");

require("dotenv").config(); // a definir lors depot git !

/*IMPORT ROUTES*/
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

/*CONNECTION MONGOOSE*/
mongoose
	.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); //appel méthode express

/*HEADERS*/
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //Accès à l'API pour toutes origines
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	); //requêtes envoyées vers l'API
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); //pass pour certaines fonctions
	next();
});

/*APPEL PACKAGES*/
app.use(
	// appel sanitize
	bodyParser.urlencoded({ extended: true })
);
app.use(bodyParser.json());
app.use(mongoSanitize()); // securité contre injection
app.use(helmet());
app.use(controlCookie); // gestion des cookies

/*APPEL ROUTES*/
app.use("/api/sauces", sauceRoutes); //appel de la logique de route
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images"))); // acces routes images
app.use(xss());

module.exports = app; // export de l'application pour les autres fichiers
