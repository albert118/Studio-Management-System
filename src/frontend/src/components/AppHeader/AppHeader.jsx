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
    HeaderGlobalBar,
    HeaderPanel,
    Switcher,
    SwitcherItem,
    SwitcherDivider
} from '@carbon/react';

import { Notification, UserAvatar } from '@carbon/icons-react';
import AppRoutes from 'navigation/AppRoutes';
import { useEffect, useState } from 'react';
import { supabase } from 'main';

function AppHeader() {
    const [login, setLogin] = useState('Log In');
    const [isUserPanel, setUserPanel] = useState(false);
    const location = useLocation();
    useEffect(() => {
        async function getUserEmail() {
            const supaUser = await supabase.auth.getUser();
            setLogin(supaUser.data.user?.email ?? '');
        }
        getUserEmail();
    });

    const togglePanel = flag => () => {
        if (isUserPanel == true) setUserPanel(false);
        else setUserPanel(true);
    };

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
                        <HeaderGlobalAction aria-label={login} onClick={togglePanel()}>
                            <UserAvatar />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                    <HeaderPanel aria-label='Header Panel' expanded={isUserPanel}>
                        <Switcher aria-label='Switcher Container'>
                            <SwitcherItem isSelected aria-label='Profile' href='#'>
                                Profile
                            </SwitcherItem>
                            <SwitcherDivider />
                            <SwitcherItem href='#' aria-label='Link 2'>
                                Manage Group Application
                            </SwitcherItem>
                            <SwitcherItem href='#' aria-label='Link 3'>
                                Link 3
                            </SwitcherItem>
                            <SwitcherItem href='#' aria-label='Link 4'>
                                Link 4
                            </SwitcherItem>
                            <SwitcherItem href='#' aria-label='Link 5'>
                                Link 5
                            </SwitcherItem>
                            <SwitcherDivider />
                            <SwitcherItem href='#' aria-label='Leave Group'>
                                Leave Group
                            </SwitcherItem>
                        </Switcher>
                    </HeaderPanel>
                </Header>
            )}
        />
    );
}

export default AppHeader;
