import { Dashboard, Projects, Groups, Error, Layout, Login } from 'pages';
import type { RouteObject } from 'react-router';
import AppRoutes from 'navigation/AppRoutes';
import AddGroupContainer from 'pages/AddGroup';

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
        path: AppRoutes.projects,
        element: (
            <Layout>
                <Projects />
            </Layout>
        )
    },
    {
        path: AppRoutes.groups,
        element: (
            <Layout>
                <Groups />
            </Layout>
        )
    },
    {
        path: `${AppRoutes.groups}/add`,
        element: (
            <Layout>
                <AddGroupContainer />
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
