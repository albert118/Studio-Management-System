import AddProjectView from './AddProjectView';
import { ProjectOwner } from 'types/types';
import { Guid } from 'guid-typescript';

const dummyOwners: ProjectOwner[] = [
    { id: Guid.create(), name: 'Jeremy Clarkson', email: 'jeremyclarkson@topgear.bbc' },
    { id: Guid.create(), name: 'Richard Hammond', email: 'richardhammon@topgear.bbc' },
    { id: Guid.create(), name: 'James May', email: 'jamesmay@topgear.bbc' }
];

export default function AddProjectContainer() {
    return <AddProjectView availableOwners={dummyOwners} />;
}
