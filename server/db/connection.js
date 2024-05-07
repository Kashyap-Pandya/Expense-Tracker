const mongoose = require("mongoose");

const connectDB = (url) => {
	return mongoose
		.connect(url)
		.then(() => console.log("connected to the database"))
		.catch((error) => `failed to connect with the server ${error}`);
};

module.exports = connectDB;
