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

export default function AppHeader() {
    const [login, setLogin] = useState('Log In');
    const location = useLocation();

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
                    </HeaderNavigation>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label='Notifications'>
                            <Notification />
                        </HeaderGlobalAction>
                        <HeaderGlobalAction aria-label={login}>
                            <UserAvatar />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    );
}
