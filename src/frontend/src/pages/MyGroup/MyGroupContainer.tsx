import { useState } from 'react';
import { IGroup } from 'types/types';
import MyGroupView from './MyGroupView';

const dummyData: IGroup = {
    id: 1,
    name: 'Group 01',
    description:
        "this is your group's homepage. You can add a description for potential members to read when exploring all groups",
    MemberInfo: {
        max: 6,
        count: 3,
        members: ['John', 'Agatha', 'Jenny']
    },
    members: '3/6',
    project: 'Apple Computers'
};

export default function MyGroupContainer() {
    const [myGroup, setMyGroup] = useState(dummyData);

    return <MyGroupView myGroup={myGroup} />;
}
