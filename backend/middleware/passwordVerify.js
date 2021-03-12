const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
	if (!passwordSchema.validate(req.body.password)) {
		return res.status(400).json({
			error:
				"Le mot de passe n'est pas assez fort, il faut une longueur de min 8 caractères, longueur max 20 caractères, 1 lettre majuscule minimum, 1 lettre minuscule minimum, 1 chiffres minimum et pas d'espace"
		});
	} else {
		next();
	}
};
