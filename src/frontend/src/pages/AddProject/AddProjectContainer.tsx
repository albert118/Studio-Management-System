import AddProjectView from './AddProjectView';
import { PrincipalOwner } from 'types/types';
import { Guid } from 'guid-typescript';
import useOwnerContacts from 'hooks/ContactHooks';

const dummyid = '18674a20-e0ef-40a2-aae6-559f01ef3138'

export default function AddProjectContainer() {
    const { ownerContacts } = useOwnerContacts([Guid.parse(dummyid)]);

    return <AddProjectView availableOwners={ownerContacts} />;
}
