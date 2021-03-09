const Sauce = require("../models/Sauce");

/*CREATION PRODUIT*/
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(
		//transformation de la chaîne de caractère en objet
		req.body.sauce
	);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject //spread ... = copie des tous les elements de req.body
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
				...JSON.parse(
					req.body.sauce
				) /*si il existe on récupère la chaine de caractère puis on la parse en object*/
		  }
		: { ...req.body };
	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //mise a jour dans la base de données
		.then(() => res.status(200).json({ message: "Sauce modifié !" }))
		.catch(error => res.status(400).json({ error }));
};

/*SUPPRESSION PRODUIT*/
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }) //trouver l'objet grâce a son id
		.then(sauce => {})
		.catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }) // récupération d'une sauce unique
		.then(sauce => res.status(200).json(sauce))
		.catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then(sauces => res.status(200).json(sauces))
		.catch(error => res.status(400).json({ error }));
};
