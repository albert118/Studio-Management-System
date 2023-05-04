import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuth from 'hooks/AuthHooks';
import { supabase } from 'main';
import AppRoutes from 'navigation/AppRoutes';
import { redirect } from "react-router-dom";


export function Login() {
    const { session } = useAuth();
    // I want auto redirect but it's not working
    if (!session) {
        return (
            <div className='login-form'>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                    redirectTo={AppRoutes.root}
                ></Auth>
            </div>
        );
    } else {
        return redirect(`${AppRoutes.root}`)
    }
}
