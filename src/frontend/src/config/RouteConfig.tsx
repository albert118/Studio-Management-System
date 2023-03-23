import { Dashboard, Project, Group, Layout } from 'pages';
import type { RouteObject } from 'react-router';

const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<Layout>
				<Dashboard />
			</Layout>
		)
	},
	{
		path: '/project',
		element: (
			<Layout>
				<Project />
			</Layout>
		)
	},
	{
		path: '/group',
		element: (
			<Layout>
				<Group />
			</Layout>
		)
	}
];

export default routes;
