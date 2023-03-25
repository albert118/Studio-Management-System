import { useState } from 'react';
import { IGroup } from './types';

import GroupsView from './GroupsView';

const testGroupDto: IGroup = Object.freeze({
    id: 'abc1234',
    name: 'Group 03',
    description: 'A test group',
    MemberInfo: {
        max: 6,
        count: 3,
        members: ['John', 'Agatha', 'Jenny']
    }
});

const dummyData = [testGroupDto, testGroupDto, testGroupDto];

export default function GroupsContainer() {
    const [data, useData] = useState<Array<IGroup>>(dummyData);

    return <GroupsView groups={data} />;
}
