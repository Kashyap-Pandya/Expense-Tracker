const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

//mongo db connection
const connectDB = require("./db/connection");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use(require("./routes/route"));

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`server is listening on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
