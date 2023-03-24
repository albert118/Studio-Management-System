import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from 'navigation/RouterConfig';

import 'styles/index.scss';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
