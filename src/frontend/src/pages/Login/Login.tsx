import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from 'main';

function Login() {
    return <div className='loginClass'><Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}></Auth></div>;
}

export default Login;
