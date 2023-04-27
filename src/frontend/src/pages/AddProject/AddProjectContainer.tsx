import AddProjectView from './AddProjectView';
import { useOwnerContacts } from 'hooks';

export default function AddProjectContainer() {
    const { ownerContacts } = useOwnerContacts();

    return <AddProjectView availableOwners={ownerContacts} />;
}
