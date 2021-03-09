const jwt = require("jsonwebtoken"); // import package verification de token

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; // retour tab, pioche le second element du tab
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // decoder le token
		const userId = decodedToken.userId; // extraction du decodage du token
		if (req.body.userId && req.body.userId !== userId) {
			// pas correspondance
			throw "Invalid user ID";
		} else {
			// si correspondance
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!")
		});
	}
};
