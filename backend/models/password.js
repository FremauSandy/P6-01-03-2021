/*IMPORT PACKAGES*/
const passwordValidator = require("password-validator");
const passwordSchema = new passwordValidator();

/*SCHEMA*/
passwordSchema
	.is()
	.min(8) // limite 8 caractères min
	.is()
	.max(20) // Limite 20 caractères max
	.has()
	.uppercase(1) // Obligation 1 maj minimum
	.has()
	.lowercase(1) // 1 min minimum
	.has()
	.digits(1) //1 chiffre min
	.is()
	.not()
	.oneOf(["Passw0rd", "Password123"]); //BlackList

module.exports = passwordSchema;
