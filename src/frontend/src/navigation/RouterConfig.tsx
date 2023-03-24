import { Dashboard, Project, Group, Error, Layout } from 'pages';
import type { RouteObject } from 'react-router';
import AppRoutes from 'navigation/AppRoutes';

const routes: RouteObject[] = [
	{
		path: AppRoutes.root,
		element: (
			<Layout>
				<Dashboard />
			</Layout>
		),
	},
	{
		path: AppRoutes.project,
		element: (
			<Layout>
				<Project />
			</Layout>
		),
	},
	{
		path: AppRoutes.group,
		element: (
			<Layout>
				<Group />
			</Layout>
		),
	},
	{
		path: AppRoutes.error,
		element: (
			<Layout>
				<Error />
			</Layout>
		),
	},
];

export default routes;
