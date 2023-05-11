import { Guid } from 'guid-typescript';
import { IUser } from 'types/types';
import { useEffect, useState } from 'react';
import useStudentContacts from './StudentContactHooks';

// this is a placeholder for a 'real hook' providing the current user data (ID, name, role, etc.)
// ideally we would actually implement this and back it with a fully fledged auth + session system
// for now, I've mocked it with an ID and name from a real StudentContact I manually added on my machine
// this lets me fake myself as the below user for demo purposes
export default function useSession() {
    // allows us to grab a real contact, which includes the current group ID (if assigned to a group)
    const testingUserId = '4e9cb689-267d-44a5-92d0-332968dbacf2';
    const { studentContacts, isLoading } = useStudentContacts();

    const [user, setUser] = useState<IUser>({
        id: Guid.parse(testingUserId),
        name: 'Ryan Cleminson',
        role: 'admin',
        groupId: undefined
    });

    useEffect(() => {
        const setUpFakeUser = async () => {
            // incoming is a GUID string (not mapped to GUID npm type, so a default comparison won't work)
            //@ts-ignore
            const testContact = studentContacts.find(s => s.id === testingUserId);

            if (!testContact) {
                return;
            }

            setUser({
                ...user,
                groupId: testContact.assignedGroupId
                    ? // @ts-ignore
                      Guid.parse(testContact.assignedGroupId)
                    : undefined
            });
        };

        setUpFakeUser();
        // debug helper, remove after this hook is replaced with the real thing
        console.log(user);
    }, [isLoading]);

    const updateGroup = (groupId: Guid) => {
        setUser({
            ...user,
            groupId: groupId
        });
    };

    const setRole = (role: string) => {
        setUser({
            ...user,
            role: role
        });
    };

    return { user, updateGroup, setRole };
}
