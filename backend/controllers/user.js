/*IMPORT PACKAGES*/
const bcrypt = require("bcrypt"); //import cryptage pour les mots de passe
const jwt = require("jsonwebtoken"); //package pour créer et verifier les tokens
const User = require("../models/user");
const bouncer = require("express-bouncer")(120000, 1.8e6, 5);
const cryptoJS = require("crypto-js"); //securité cryptage mail

/*ENREGISTRER*/
exports.signup = (req, res, next) => {
	console.log(req.body.password);
	bcrypt //appel du cryptage
		.hash(req.body.password, 10) //hash le mdp et on execute 10 fois l'algorithme
		.then(hash => {
			// methode asyncrone
			let emailCrypt = cryptoJS.HmacSHA512(req.body.email, "secret_key").toString();
			const user = new User({
				email: emailCrypt,
				password: hash //mot de passe crypté
			});
			user.save() //sauvegarde dans la base de donnée
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

/*SE CONNECTER*/
exports.login = (req, res, next) => {
	let emailCrypt = cryptoJS.HmacSHA512(req.body.email, "secret_key").toString();
	User.findOne({
		email: emailCrypt
	}) // cherche un utilisateur deja existant
		.then(user => {
			if (!user) {
				//si aucun utilisateur n'existe deja dans la base de donnée
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt // hash mdp
				.compare(req.body.password, user.password) //compare le mdp utilisé et le hash enregistré dans la base de données
				.then(valid => {
					// methode async
					if (!valid) {
						return res.status(401).json({
							error: "Mot de passe incorrect !"
						});
					}
					res.status(200).json({
						// renvoi objet json
						userId: user._id,
						token: jwt.sign(
							//token d'authentification
							{ userId: user._id },
							process.env.TOKEN,
							{ expiresIn: "2h" }
						)
					});
					bouncer.reset(req);
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};
