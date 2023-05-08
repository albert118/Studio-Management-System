import { Stack } from 'components';
import { ContainedList, ContainedListItem, Tag } from '@carbon/react';

export function MyGroupMembers({ memberInfo }) {
    return (
        <Stack>
            <ContainedList
                label={
                    <label className='mygroup--members-group-count'>
                        <span>Group Members</span>
                        <Tag size='sm'>{memberInfo.count}</Tag>
                    </label>
                }
            >
                {memberInfo.members.map((member, idx) => (
                    <ContainedListItem key={idx}>{member.name}</ContainedListItem>
                ))}
            </ContainedList>
        </Stack>
    );
}
