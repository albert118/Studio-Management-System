import { useState } from 'react';
import { IGroup } from './types';

import GroupsView from './GroupsView';

const testGroupDto: IGroup = {
    id: 'abc1234',
    name: 'Group 03',
    description: 'A test group',
    MemberInfo: {
        max: 6,
        count: 3,
        members: ['John', 'Agatha', 'Jenny']
    },
    members: '3/6',
    project: 'Apple Workshop'
};

const createData = (id: string) => {
    const _d = testGroupDto;
    _d.id = id;
    return _d;
};

const dummyData = [createData('123'), createData('456'), createData('789')];

export default function GroupsContainer() {
    const [data, useData] = useState<Array<IGroup>>(dummyData);

    return <GroupsView groups={data} />;
}
