import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";
import { chartData, getTotalAmount } from "../utils/helper";
import { useGetLabelsQuery } from "../services/expenseAPI";
Chart.register(ArcElement, Tooltip, Legend);
const Graph = () => {
	const { data, isFetching, isError, isSuccess } = useGetLabelsQuery();
	// console.log(data, "getlablesqyery");
	chartData(data);
	// console.log(chartData(data), "chartdatadata");
	return (
		<>
			{isFetching && <div>Fetching...</div>}
			{isError && (
				<div>There was an error fetching your transaction...</div>
			)}
			<div className='flex flex-col justify-content max-w-xs mx-auto'>
				<div className='item'>
					<div className='chart relative'>
						{isSuccess && (
							<Doughnut {...chartData(data)}></Doughnut>
						)}
						<h3 className='mb-4 font-bold title'>
							Total
							<span className='block text-3xl text-emerald-400'>
								₹{getTotalAmount(data) ?? 0}
							</span>
						</h3>
					</div>
				</div>
				<div className='flex flex-col py-10 gap-4'>
					<Labels />
				</div>
			</div>
		</>
	);
};
export default Graph;
