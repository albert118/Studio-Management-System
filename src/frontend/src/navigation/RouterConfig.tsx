import { Dashboard, Project, Group, Login, Error, Layout } from 'pages';
import type { RouteObject } from 'react-router';
import AppRoutes from 'navigation/AppRoutes';

const routes: RouteObject[] = [
    {
        path: AppRoutes.root,
        element: (
            <Layout>
                <Dashboard />
            </Layout>
        )
    },
    {
        path: AppRoutes.project,
        element: (
            <Layout>
                <Project />
            </Layout>
        )
    },
    {
        path: AppRoutes.group,
        element: (
            <Layout>
                <Group />
            </Layout>
        )
    },
    {
        path: AppRoutes.error,
        element: (
            <Layout>
                <Error />
            </Layout>
        )
    },
    {
        path: AppRoutes.login,
        element: (
            <Layout>
                <Login />
            </Layout>
        )
    }
];

export default routes;
