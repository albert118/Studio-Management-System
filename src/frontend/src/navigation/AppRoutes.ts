/**
 * Avoid hardcoding router-paths all over the app! use this file
 * as the source of truth
 */

const AppRoutes = Object.freeze({
    root: '/',
    groups: '/groups',
    group: '/group',
    myGroup: '/my-group',
    projects: '/projects',
    project: '/project',
    login: '/login',
    about: '/about',
    admin: '/admin',
    notifications: '/notifications',
    assignStudentsToGroup: '/assign-students-to-group',
    error: '*'
});

export default AppRoutes;
