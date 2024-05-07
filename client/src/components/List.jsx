import "boxicons";
import {
	useDeleteTransactionMutation,
	useGetLabelsQuery,
} from "../services/expenseAPI";

const List = () => {
	const { data, isFetching, isError } = useGetLabelsQuery();
	// console.log(data, "list");
	const [deleteTransaction] = useDeleteTransactionMutation();
	const handleDelete = (e) => {
		if (!e.target.dataset.id) return 0;
		deleteTransaction({ _id: e.target.dataset.id });
		// console.log(e.target.dataset.id);
	};
	return (
		<>
			{isFetching && <div>Fetching...</div>}
			{isError && (
				<div>There was an error fetching your transaction...</div>
			)}
			<div className='flex flex-col py-6 gap-3'>
				<h1 className='py-4 font-bold text-xl'>History</h1>
				{data?.map((value, index) => (
					<Transaction
						key={index}
						category={value}
						handler={handleDelete}
					></Transaction>
				))}
			</div>
		</>
	);
};
export default List;

const Transaction = ({ category, handler }) => {
	if (!category) return null;
	return (
		<div
			className='item flex justify- bg-gray-50 py-2 rounded'
			style={{ borderLeft: `8px solid ${category.color}` ?? "#e5e5e5" }}
		>
			<span className='block w-full'> {category.name ?? ""}</span>
			<button className='flex justify-end w-full mr-4' onClick={handler}>
				<box-icon
					data-id={category._id ?? ""}
					name='trash'
					size='18px'
					color={category.color ?? "#e5e5e5"}
				/>
			</button>
		</div>
	);
};
