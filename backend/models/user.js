const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //validation email pour un unique utilisateur

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //sécurité qu'un user utilise une seule adress mail

module.exports = mongoose.model("User", userSchema);
