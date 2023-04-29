import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from 'main';

export default function Login() {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}></Auth>;
}
