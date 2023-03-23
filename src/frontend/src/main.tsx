import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { routeConfig } from './config/RouteConfig';
import { routeConfig } from 'config';

const router = createBrowserRouter(routeConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
