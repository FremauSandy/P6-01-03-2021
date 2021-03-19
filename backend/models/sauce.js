/*IMPORT PACKAGES*/
const mongoose = require("mongoose");

/*SCHEMA*/
const sauceSchema = mongoose.Schema({
	userId: { type: String, required: true }, //id pour utilisateur
	name: { type: String, required: true },
	manufacturer: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	mainPepper: { type: String, required: true },
	heat: { type: Number, required: true }, //particularité de la sauce
	likes: { type: Number, default: 0, required: false },
	dislikes: { type: Number, default: 0, required: false },
	usersLiked: { type: [String], required: false }, //tab users like
	usersDisliked: { type: [String], required: false } //tab users dislike
});

module.exports = mongoose.model("Sauce", sauceSchema);
