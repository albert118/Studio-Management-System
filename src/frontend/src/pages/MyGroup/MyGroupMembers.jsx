import { Stack } from 'components';
import {
    ContainedList,
    ContainedListItem,
    Tag
} from '@carbon/react';

export function MyGroupMembers({memberInfo }) {
    var members = memberInfo.members;
    
    return (
        <Stack>
            <ContainedList
                label={<div style={
                    { 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                    }}> 
                    <span>Group Members</span>
                    <Tag size="sm">{memberInfo.count}</Tag>
                    </div>
                    }
            >
            {members.map((member, idx) => (
                <ContainedListItem key={idx}>{member.name}</ContainedListItem>
            ))}
            </ContainedList>
        </Stack>
    );
}
