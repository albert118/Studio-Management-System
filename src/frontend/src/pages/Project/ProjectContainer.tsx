import { useState } from 'react';
import ProjectView from './ProjectView';

const dummyProject = {
    name: 'Special Project',
    description: 'lorem ipsum',
    owners: ['Smith', 'John', 'Alex'],
    meta: {
        createdYear: 2023,
        domain: 'Software'
    },
    assignedGroups: [
        { id: 123, name: 'Group #1' },
        { id: 123, name: 'Group #2' },
        { id: 123, name: 'Group #3' }
    ]
};

export default function ProjectContainer() {
    const [project, _] = useState(dummyProject);

    return <ProjectView project={project} />;
}
