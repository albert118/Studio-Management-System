/**
 * Avoid hardcoding router-paths all over the app! use this file
 * as the source of truth
 */

const AppRoutes = Object.freeze({
    root: '/',
    project: '/project',
    group: '/group',
    about: '/about',
    error: '*'
});

export default AppRoutes;
