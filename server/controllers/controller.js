const model = require("../models/model");

// const createCategories = async (req, res) => {
// 	try {
// 		const { type, color } = req.body;
// 		console.log(type, color, "type", "color");
// 		const Create = new model.Categories({
// 			type,
// 			color,
// 		});
// 		const create = await Create.save();
// 		res.status(200).json({ create });
// 	} catch (error) {
// 		res.status(400).json({ msg: error });
// 		console.log(error);
// 	}
// };

const createCategories = async (req, res) => {
	try {
		const { type } = req.body;
		console.log(type, "recevied type");
		let color;

		if (type === "Expense") {
			color = "#fd5959";
		} else if (type === "Investment") {
			color = "#a393eb";
		} else if (type === "Savings") {
			color = "#ffe79a";
		} else {
			color = "#CCCCCC";
		}
		// Check if the category already exists in the database
		let existingCategory = await model.Categories.findOne({ type });
		console.log(existingCategory, "category exist");

		// If the category doesn't exist, create a new one
		if (!existingCategory) {
			const Create = new model.Categories({
				type,
				color,
			});
			await Create.save();
			existingCategory = Create; // Assign the created category to the existingCategory variable
		}

		res.status(200).json({
			category: existingCategory,
			msg: "Category created",
		});
	} catch (error) {
		res.status(400).json({ msg: error });
		console.log(error);
	}
};

const getCategories = async (req, res) => {
	try {
		//get all the data
		const data = await model.Categories.find({});
		// filter color and type
		// const filter = data.map((value) =>
		// 	Object.assign({}, { type: value.type, color: value.color })
		// );
		let filter = await data.map((v) =>
			Object.assign({}, { type: v.type, color: v.color })
		);
		res.status(200).json({ filter });
	} catch (error) {
		res.status(400).json({ msg: error });
		console.log(error);
	}
};

const createTransaction = async (req, res) => {
	try {
		if (!req.body) return res.status(400).json("data not provided");
		let { name, type, amount } = req.body;
		const Create = new model.Transaction({
			name,
			type,
			amount,
			date: new Date(),
		});
		const create = await Create.save();
		res.status(200).json({ create });
	} catch (error) {
		res.status(400).json({
			msg: `error while creating a transaction ${error}`,
		});
		console.log(error);
	}
};

const getTransaction = async (req, res) => {
	try {
		const data = await model.Transaction.find({});
		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ msg: error });
		console.log(error);
	}
};

const deleteTransaction = async (req, res) => {
	try {
		if (!req.body)
			res.status(400).json({ message: "Request body not found" });

		const deleteOneTransaction = await model.Transaction.deleteOne(
			req.body
		).clone();
		res.status(200).json({ deleteOneTransaction, msg: "deleted" });
	} catch (error) {
		res.status(400).json({ msg: error });
		console.log(error);
	}
};

// const getLabels = async (req, res) => {
// 	try {
// 		const result = await model.Transaction.aggregate([
// 			{
// 				$lookup: {
// 					from: "categories", //collection we want to join with
// 					localField: "type", // we want to join by local collection
// 					foreignField: "type", // foreign collection
// 					as: "categories_info", // output array
// 				},
// 			},
// 			{
// 				$unwind: "$categories_info",
// 			},
// 		]);

// 		const filter = result.map((value) =>
// 			Object.assign(
// 				{},
// 				{
// 					_id: value._id,
// 					name: value.name,
// 					type: value.type,
// 					amount: value.amount,
// 					color: value.categories_info["color"],
// 				}
// 			)
// 		);
// 		await res.json(filter);
// 	} catch (error) {
// 		res.status(400).json({ msg: error });
// 		console.log(error);
// 	}
// };
async function getLabels(req, res) {
	model.Transaction.aggregate([
		{
			$lookup: {
				from: "categories",
				localField: "type",
				foreignField: "type",
				as: "categories_info",
			},
		},
		{
			$unwind: "$categories_info",
		},
	])
		.then((result) => {
			let data = result.map((v) =>
				Object.assign(
					{},
					{
						_id: v._id,
						name: v.name,
						type: v.type,
						amount: v.amount,
						color: v.categories_info["color"],
					}
				)
			);
			res.json(data);
		})
		.catch((error) => {
			res.status(400).json("Looup Collection Error");
		});
}

module.exports = {
	createCategories,
	getCategories,
	createTransaction,
	getTransaction,
	deleteTransaction,
	getLabels,
};
