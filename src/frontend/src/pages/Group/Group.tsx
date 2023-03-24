import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import AppRoutes from 'navigation/AppRoutes';

function Group() {
	return (
		<div>
			<div className='bx--row landing-page__banner'>
				<div className='bx--col-lg-16'>
					<Breadcrumb noTrailingSlash>
						<BreadcrumbItem>
							<a href={AppRoutes.root}>Project</a>
						</BreadcrumbItem>
					</Breadcrumb>
					<h1 className='landing-page__heading'>Groups</h1>
				</div>
			</div>
		</div>
	);
}

export default Group;
