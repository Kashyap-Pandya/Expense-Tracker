import Form from "./components/Form";
import Graph from "./components/Graph";
import "boxicons";

const App = () => {
	return (
		<div className='App px-10 sm:p-4'>
			<div className='background-image'>
				<img
					src='./bg2.png'
					alt=''
					// className='z-10 absolute w-[50rem] h-full object-cover sm:w-[72rem]'
					className='absolute inset-0 w-full h-full object-cover z-0 opacity-50'
				/>
			</div>
			<div className='container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800 '>
				<h1 className='text-4xl py-8 mb-10 bg-indigo-500 text-white rounded text-center flex items-center justify-center'>
					<box-icon
						name='rupee'
						color='white'
						size='2.5rem'
					></box-icon>
					<span className='ml-2'>Expense Tracker</span>
				</h1>

				<div className='grid md:grid-cols-2 gap-4'>
					{/* Chart */}
					<Graph />

					<Form />
				</div>
			</div>
		</div>
	);
};
export default App;
