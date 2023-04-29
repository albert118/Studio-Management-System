import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuth from 'hooks/AuthHooks';
import { supabase } from 'main';
import { Navigate } from 'react-router-dom';

function Login() {
    const { session, isLoading, errors } = useAuth();

    if (!session || isLoading) {
        return (
            <div className='loginClass'>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                ></Auth>
            </div>
        );
    } else {
        return <Navigate replace to='/' />;
    }
}

export default Login;
