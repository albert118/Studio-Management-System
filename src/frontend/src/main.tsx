import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from 'navigation/RouterConfig';

import 'styles/index.scss';
import { createClient } from '@supabase/supabase-js';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

export const supabase = createClient(
    'https://qhflbfdceoyhnplcpgnh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZmxiZmRjZW95aG5wbGNwZ25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1NjcxNTQsImV4cCI6MTk5NTE0MzE1NH0.iT9kGHuVplawyzZVPbOYvLcX7yWvdDYRT2dmHJIRkEY'
);
