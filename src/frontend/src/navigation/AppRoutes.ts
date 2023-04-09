/**
 * Avoid hardcoding router-paths all over the app! use this file
 * as the source of truth
 */

const AppRoutes = Object.freeze({
    root: '/',
    groups: '/groups',
    group: '/group',
    projects: '/projects',
    login: '/login',
    about: '/about',
    error: '*'
});

export default AppRoutes;
