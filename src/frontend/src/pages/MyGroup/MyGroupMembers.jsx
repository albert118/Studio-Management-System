import { Stack } from 'components/Forms';

export function MyGroupMembers({ members }) {
    return (
        <Stack>
            {members.map((member, idx) => (
                <span key={idx}>{member}</span>
            ))}
        </Stack>
    );
}
