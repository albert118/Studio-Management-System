import { useLocation, useNavigate } from 'react-router-dom';

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
import { useSession } from 'hooks';
// import { useEffect, useState } from 'react';
// import { supabase } from 'main';

export default function AppHeader() {
    const { user, setRole } = useSession();
    const navigate = useNavigate();

    // const [login, setLogin] = useState('Log In');
    // useEffect(() => {
    //     async function getUserEmail() {
    //         const supaUser = await supabase.auth.getUser();
    //         setLogin(supaUser.data.user?.email ?? '');
    //     }
    //     getUserEmail();
    // });

    return (
        <HeaderContainer
            render={() => (
                <Header aria-label='UTS Software Mangement System'>
                    <SkipToContent />
                    <HeaderName href={AppRoutes.root} prefix='UTS'>
                        Studio Mangement System
                    </HeaderName>
                    <Menu role={user.role} setRole={setRole} />
                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label='Notifications'
                            onClick={() => navigate(AppRoutes.notifications)}
                        >
                            <Notification />
                        </HeaderGlobalAction>

                        <HeaderGlobalAction
                            aria-label={`Hey ${user.name}!`}
                            tooltipAlignment='end'
                            onClick={() => navigate(AppRoutes.userProfile)}
                        >
                            <UserAvatar />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    );
}

function Menu({ role, setRole }) {
    const location = useLocation();

    return (
        <HeaderNavigation aria-label='UTS Software Mangement System'>
            <HeaderMenuItem
                isActive={location.pathname == AppRoutes.projects}
                href={AppRoutes.projects}
            >
                Projects
            </HeaderMenuItem>
            <HeaderMenuItem
                isActive={location.pathname == AppRoutes.groups}
                href={AppRoutes.groups}
            >
                Groups
            </HeaderMenuItem>
            {role === 'admin' && (
                <HeaderMenuItem
                    isActive={location.pathname == AppRoutes.admin}
                    href={AppRoutes.admin}
                >
                    Admin dashboard
                </HeaderMenuItem>
            )}

            {role === 'student' && (
                <HeaderMenuItem
                    isActive={location.pathname == AppRoutes.myGroup}
                    href={AppRoutes.myGroup}
                >
                    My group
                </HeaderMenuItem>
            )}
            {/* neat way to demo the admin/student roles without fleshing out the whole feature */}
            {role === 'admin' ? (
                <HeaderMenuItem
                    onClick={() => {
                        setRole('student');
                    }}
                >
                    Swap to student role
                </HeaderMenuItem>
            ) : (
                <HeaderMenuItem
                    onClick={() => {
                        setRole('admin');
                    }}
                >
                    Swap to admin role
                </HeaderMenuItem>
            )}
        </HeaderNavigation>
    );
}
