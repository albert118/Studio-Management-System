import { useState } from 'react';
import { IGroup } from './types';

import GroupsView from './GroupsView';

const dummyData: Array<IGroup> = [
    {
        id: 1,
        name: 'Group 01',
        description: 'A test group',
        MemberInfo: {
            max: 6,
            count: 3,
            members: ['John', 'Agatha', 'Jenny']
        },
        members: '3/6',
        project: 'Apple Computers'
    },
    {
        id: 2,
        name: 'Group 02',
        description: 'A test group',
        MemberInfo: {
            max: 6,
            count: 3,
            members: ['John', 'Agatha', 'Jenny']
        },
        members: '3/6',
        project: 'Applebees'
    },
    {
        id: 3,
        name: 'Group 03',
        description: 'A test group',
        MemberInfo: {
            max: 6,
            count: 2,
            members: ['Agatha', 'Jenny']
        },
        members: '2/6',
        project: 'Apple a day...'
    },
    {
        id: 4,
        name: 'Group 04',
        description: 'A test group',
        MemberInfo: {
            max: 6,
            count: 3,
            members: ['John', 'Agatha', 'Jenny']
        },
        members: '3/6',
        project: 'Apple "Think Different"'
    },
    {
        id: 5,
        name: 'Group 05',
        description: 'A test group',
        MemberInfo: {
            max: 6,
            count: 3,
            members: ['John', 'Agatha', 'Jenny']
        },
        members: '3/6',
        project: 'Apple iPhone'
    },
    {
        id: 6,
        name: 'Group 06',
        description: 'A test group',
        MemberInfo: {
            max: 6,
            count: 3,
            members: ['John', 'Agatha', 'Jenny']
        },
        members: '3/6',
        project: 'Apple Genius Bar'
    },
    {
        id: 7,
        name: 'Group 07',
        description: 'A test group',
        MemberInfo: {
            max: 8,
            count: 1,
            members: ['Agatha']
        },
        members: '1/8',
        project: 'Apple Lift'
    }
];

export default function GroupsContainer() {
    const [data, useData] = useState<Array<IGroup>>(dummyData);

    return <GroupsView groups={data} />;
}
