/*IMPORT PACKAGES*/
const jwt = require("jsonwebtoken"); // import package verification de token

/*CONFIGURATION TOKEN*/
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; // retour tab, pioche le second element du tab
		const decodedToken = jwt.verify(token, process.env.token); // autre chaine + dotenv
		const userId = decodedToken.userId; // extraction du decodage du token
		if (req.body.userId && req.body.userId !== userId) {
			// pas de correspondance
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
