/* eslint-disable react/prop-types */

import { useGetLabelsQuery } from "../services/expenseAPI";
import { getLabels } from "../utils/helper";
const Labels = () => {
	const { data, isError, isFetching } = useGetLabelsQuery();

	// console.log(getLabels(data), "Get total");
	getLabels(data, "type");
	return (
		<>
			{isFetching && <div>Fetching...</div>}
			{isError && (
				<div>There was an error fetching your transaction...</div>
			)}

			{getLabels(data, "type")?.map((value, index) => (
				<LabelComponent key={index} data={value} />
			))}
		</>
	);
};

const LabelComponent = ({ data }) => {
	if (!data) return <></>;
	return (
		<div className='labels flex justify-between'>
			<div className='flex gap-2'>
				<div
					className='w-2 h-2 rounded py-3'
					style={{ background: data.color ?? "#f9c74f" }}
				></div>
				<h3 className='text-md'>{data.type ?? ""}</h3>
			</div>
			<h3 className='font-bold'>{Math.round(data.percentage) ?? 0}%</h3>
		</div>
	);
};

export default Labels;
