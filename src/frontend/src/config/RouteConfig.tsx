import Dashboard from '../pages/Dashboard/Dashboard';
import Project from '../pages/Project/Project';
import Group from '../pages/Group/Group';
import Layout from '../pages/Layout';

type Route = {
	path: string;
	element: JSX.Element;
};

export type RouteConfig = Route[];

export const routeConfig: RouteConfig = [
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
