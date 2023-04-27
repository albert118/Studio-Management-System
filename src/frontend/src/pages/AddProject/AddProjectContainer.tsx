import AddProjectView from './AddProjectView';
import useOwnerContacts from 'hooks/ContactHooks';

export default function AddProjectContainer() {
    const { ownerContacts } = useOwnerContacts();

    return <AddProjectView availableOwners={ownerContacts} />;
}
