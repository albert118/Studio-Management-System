/**
 * Avoid hardcoding router-paths all over the app! use this file
 * as the source of truth
 */

const AppRoutes = Object.freeze({
    root: '/',
    groups: '/groups',
    group: '/group',
    projects: '/projects',
    project: '/project',
    login: '/login',
    about: '/about',
    admin: '/admin',
    userProfile: '/user',
    notifications: '/notifications',
    error: '*'
});

export default AppRoutes;
