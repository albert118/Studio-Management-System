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
    const testingUserId = 'f8b20b08-7a50-4afa-994b-1bd34a7c114c';
    const { studentContacts, isLoading } = useStudentContacts();

    const [user, setUser] = useState<IUser>({
        id: Guid.parse(testingUserId),
        name: 'Lucy Hawking',
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
                // @ts-ignore
                groupId: Guid.parse(testContact.assignedGroupId)
            });

            // debug helper, remove after this hook is replaced with the real thing
            console.log(user);
        };

        setUpFakeUser();
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
