import type { RouteObject } from 'react-router';

import {
    Dashboard,
    Projects,
    Groups,
    Error,
    Layout,
    Login,
    MyGroup,
    AddGroup,
    Project,
    AddProject,
    AdminDashboard,
    Notifications
} from 'pages';
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
        path: AppRoutes.projects,
        element: (
            <Layout>
                <Projects />
            </Layout>
        )
    },
    {
        path: `${AppRoutes.projects}/add`,
        element: (
            <Layout>
                <AddProject />
            </Layout>
        )
    },
    {
        path: `${AppRoutes.project}/:projectId`,
        element: (
            <Layout>
                <Project />
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
                <AddGroup />
            </Layout>
        )
    },
    {
        path: `${AppRoutes.group}/:groupId`,
        element: (
            <Layout>
                <MyGroup />
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
        path: AppRoutes.admin,
        element: (
            <Layout>
                <AdminDashboard />
            </Layout>
        )
    },
    {
        path: AppRoutes.notifications,
        element: (
            <Layout>
                <Notifications />
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
