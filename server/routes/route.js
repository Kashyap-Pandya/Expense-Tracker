const {
	createCategories,
	getCategories,
	createTransaction,
	getTransaction,
	deleteTransaction,
	getLabels,
} = require("../controllers/controller");

const routes = require("express").Router();

routes.route("/api/v1/categories").get(getCategories).post(createCategories);
routes
	.route("/api/v1/transaction")
	.post(createTransaction)
	.get(getTransaction)
	.delete(deleteTransaction);

routes.route("/api/v1/labels").get(getLabels);
module.exports = routes;
