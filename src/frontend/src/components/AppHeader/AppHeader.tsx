import { useLocation } from 'react-router-dom';
import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    SkipToContent,
    HeaderMenu,
    HeaderGlobalAction,
    HeaderGlobalBar
} from 'carbon-components-react';
import { Notification, UserAvatar } from '@carbon/icons-react';
import AppRoutes from 'navigation/AppRoutes';
import { useEffect, useState } from 'react';
import { supabase } from '~/main';

function AppHeader() {
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
                            isCurrentPage={location.pathname == AppRoutes.root}
                            href={AppRoutes.root}
                        >
                            Home
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            isCurrentPage={location.pathname == AppRoutes.project}
                            href={AppRoutes.project}
                        >
                            Projects
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            isCurrentPage={location.pathname == AppRoutes.group}
                            href={AppRoutes.group}
                        >
                            Groups
                        </HeaderMenuItem>
                        <HeaderMenu aria-label='Link 4' menuLinkName='Link 4'>
                            <HeaderMenuItem href={AppRoutes.root}>Sub-link 1</HeaderMenuItem>
                            <HeaderMenuItem href={AppRoutes.root}>Sub-link 2</HeaderMenuItem>
                            <HeaderMenuItem href={AppRoutes.root}>Sub-link 3</HeaderMenuItem>
                        </HeaderMenu>
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

export default AppHeader;
