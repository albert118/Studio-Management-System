import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '~/main';

function Login() {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}></Auth>;
}

export default Login;
