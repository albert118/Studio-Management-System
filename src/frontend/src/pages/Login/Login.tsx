import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from 'main';

function Login() {
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      
      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return <div className='loginClass'><Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}></Auth></div>;
    }
    else {
      return (<div>Logged in!</div>)
    }
  }
}

export default Login;

