import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuth from 'hooks/AuthHooks';
import { supabase } from 'main';
import AppRoutes from 'navigation/AppRoutes';
import { Navigate } from 'react-router-dom';

function Login() {
    const { session, isLoading } = useAuth();
    // I want auto redirect but it's not working
    if (!session) {
        return (
            <div className='loginClass'>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                    redirectTo={`${AppRoutes.root}`}
                ></Auth>
            </div>
        );
    } else {
        return <Navigate replace to='/' />;
    }
}

export default Login;
