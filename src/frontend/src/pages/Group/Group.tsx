import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';

function Group() {
	return (
		<>
			<div className='bx--row landing-page__banner'>
				<div className='bx--col-lg-16'>
					<Breadcrumb noTrailingSlash>
						<BreadcrumbItem>
							<a href='/'>Project</a>
						</BreadcrumbItem>
					</Breadcrumb>
					<h1 className='landing-page__heading'>Groups</h1>
				</div>
			</div>
		</>
	);
}

export default Group;
