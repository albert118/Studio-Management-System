import { useLocation } from 'react-router-dom';

import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    SkipToContent,
    HeaderGlobalAction,
    HeaderGlobalBar
} from '@carbon/react';

import { Notification, UserAvatar } from '@carbon/icons-react';
import AppRoutes from 'navigation/AppRoutes';
import { useEffect, useState } from 'react';
import { supabase } from 'main';

// this is a placeholder for a 'real hook' providing the current user data (ID, name, role, etc.)
// ideally we would actually implement this and back it with a fully fledged auth + session system
// for now, I've mocked it with an ID and name from a real StudentContact I manually added on my machine
// this lets me fake myself as the below user for demo purposes
const useSession = () => {
    return {
        user: {
            id: 'f8b20b08-7a50-4afa-994b-1bd34a7c114c',
            name: 'Lucy Hawking',
            role: 'admin'
        }
    };
};

export default function AppHeader() {
    const [login, setLogin] = useState('Log In');
    const { user } = useSession();

    useEffect(() => {
        async function getUserEmail() {
            const supaUser = await supabase.auth.getUser();
            setLogin(supaUser.data.user?.email ?? '');
        }
        getUserEmail();
    });

    return (
        <HeaderContainer
            render={() => (
                <Header aria-label='UTS Software Mangement System'>
                    <SkipToContent />
                    <HeaderName href={AppRoutes.root} prefix='UTS'>
                        Studio Mangement System
                    </HeaderName>
                    <Menu role={user.role} />
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label='Notifications'>
                            <Notification />
                        </HeaderGlobalAction>

                        <HeaderGlobalAction aria-label='Login'>
                            <UserAvatar />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    );
}

function Menu({ role }) {
    const location = useLocation();

    return (
        <HeaderNavigation aria-label='UTS Software Mangement System'>
            <HeaderMenuItem
                isCurrentPage={location.pathname == AppRoutes.projects}
                href={AppRoutes.projects}
            >
                Projects
            </HeaderMenuItem>
            <HeaderMenuItem
                isCurrentPage={location.pathname == AppRoutes.groups}
                href={AppRoutes.groups}
            >
                Groups
            </HeaderMenuItem>
            {role === 'admin' && (
                <HeaderMenuItem
                    isCurrentPage={location.pathname == AppRoutes.admin}
                    href={AppRoutes.admin}
                >
                    Admin dashboard
                </HeaderMenuItem>
            )}
        </HeaderNavigation>
    );
}
