import _ from "lodash";

export const getTotal = (transaction, type) => {
	let total = _(transaction)
		.groupBy("type")
		.map((objs, key) => {
			if (!type) return _.sumBy(objs, "amount");
			return {
				type: key,
				color: objs[0].color,
				total: _.sumBy(objs, "amount"),
			};
		})
		.value();
	// console.log(total);
	return total;
};

export const getLabels = (transaction) => {
	let amountTotal = getTotal(transaction, "type");
	let Total = _.sum(getTotal(transaction));
	let percentage = _(amountTotal)
		.map((objs) =>
			_.assign(objs, { percentage: (100 * objs.total) / Total })
		)
		.value();
	return percentage;
};

export const chartData = (transaction, custom) => {
	let dataValue = getTotal(transaction);
	// console.log(dataValue, "total datavalue");
	let colors = _.map(transaction, (bg) => bg.color);
	colors = _.uniq(colors);
	// console.log(colors, "colors");
	const config = {
		data: {
			datasets: [
				{
					data: dataValue,
					backgroundColor: colors,
					hoverOffset: 4,
					borderRadius: 30,
					spacing: 10,
				},
			],
		},
		options: {
			cutout: 115,
		},
	};
	return custom ?? config;
};

export const getTotalAmount = (transaction) => {
	return _.sum(getTotal(transaction));
};
