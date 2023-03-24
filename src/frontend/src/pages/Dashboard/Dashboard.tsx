import { BrandConfig } from 'config';

function Dashboard() {
	return (
		<div>
			<h1>{BrandConfig.BrandName}</h1>
		</div>
	);
}

export default Dashboard;
