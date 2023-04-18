import AddProjectView from './AddProjectView';
import { ProjectOwner } from 'types/types';
import { Guid } from 'guid-typescript';

const dummyOwners: ProjectOwner[] = [
    {
        id: Guid.parse('6476324e-0c56-45e4-bd28-5c10dd5fda1c'),
        name: 'Jeremy Clarkson',
        email: 'jeremyclarkson@topgear.bbc'
    },
    {
        id: Guid.parse('820cdb59-798a-43f1-9a48-d93de82e6985'),
        name: 'Richard Hammond',
        email: 'richardhammon@topgear.bbc'
    },
    {
        id: Guid.parse('c14abb6e-37c0-4383-a3c4-36d78ce8e320'),
        name: 'James May',
        email: 'jamesmay@topgear.bbc'
    }
];

export default function AddProjectContainer() {
    return <AddProjectView availableOwners={dummyOwners} />;
}
