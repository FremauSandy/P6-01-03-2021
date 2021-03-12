const Sauce = require("../models/Sauce");
const fs = require("fs"); //imprt manip image

/*CREATION PRODUIT*/
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce); //extraction d'un objet JSON du req.body.sauce en transformant la chaîne de caractère en objet
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	});
	sauce.likes = 0;
	sauce.dislikes = 0;
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce enregistré !" }))
		.catch(error => res.status(400).json({ error }));
};

/*LIKE ET DISLIKE*/
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then(sauce => {
			if (req.body.like == 1) {
				//si premier like
				if (sauce.usersLiked.indexOf(req.body.userId) < 0) {
					sauce.likes = sauce.likes + 1;
					sauce.usersLiked.push(req.body.userId); //ajout au tableau
					sauce
						.save()
						.then(() => res.status(201).json({ message: "Like enregistré !" }))
						.catch(error => res.status(400).json({ error }));
				}
			} else if (req.body.like == -1) {
				// premier dislike
				if (sauce.usersDisliked.indexOf(req.body.userId) < 0) {
					sauce.dislikes = sauce.dislikes + 1;
					sauce.usersDisliked.push(req.body.userId);
					sauce
						.save()
						.then(() => res.status(201).json({ message: "Dislike enregistré !" }))
						.catch(error => res.status(400).json({ error }));
				}
			} else {
				// si nouveau like ou dislike = id user supprimé et décrément des likes
				if (sauce.usersLiked.indexOf(req.body.userId) >= 0) {
					sauce.likes = sauce.likes - 1;
					sauce.usersLiked.splice(req.body.userId);
					sauce
						.save()
						.then(() => res.status(201).json({ message: "Like supprimé !" }))
						.catch(error => res.status(400).json({ error }));
				} else if (sauce.usersDisliked.indexOf(req.body.userId) >= 0) {
					sauce.dislikes = sauce.dislikes - 1;
					sauce.usersDisliked.splice(req.body.userId);
					sauce
						.save()
						.then(() => res.status(201).json({ message: "Dislike supprimé !" }))
						.catch(error => res.status(400).json({ error }));
				}
			}
		})
		.catch(error => res.status(404).json({ error }));
};

/*MODIFIER UN PRODUIT*/
exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file /*si nouvelle image*/
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` //modifier l'image url
		  } //si il existe on récupère la chaine de caractère puis on la parse en object
		: { ...req.body };
	// vérifier que l'utilisateur qui initie la requête est bien le créateur de la sauce et donc dispose des droits pour la supprimer
	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //mise a jour dans la base de données
		.then(() => res.status(200).json({ message: "Sauce modifié !" }))
		.catch(error => res.status(400).json({ error }));
};

/*SUPPRESSION PRODUIT*/
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }) //trouver l'objet dans la base de données
		.then(sauce => {
			const filename = sauce.imageUrl.split("/images/")[1]; //récuperer le nom du fichier à supprimer
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id }) // action suppression l'objet dans la base de données*/
					.then(() => res.status(200).json({ message: "Sauce supprimé !" }))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.status(500).json({ error }));
};

/*TROUVER UN PRODUIT*/
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }) // récupération d'une sauce unique
		.then(sauce => res.status(200).json(sauce))
		.catch(error => res.status(404).json({ error }));
};

/*TROUVER DES PRODUITS*/
exports.getAllSauces = (req, res, next) => {
	Sauce.find() // tab contenant toutes les sauces de la base de données
		.then(sauces => res.status(200).json(sauces))
		.catch(error => res.status(400).json({ error }));
};
