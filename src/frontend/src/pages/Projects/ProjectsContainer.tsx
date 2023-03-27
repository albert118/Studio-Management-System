import { useState } from 'react';
import { IProject } from './types';

import ProjectsView from './ProjectsView';

const dummyData: Array<IProject> = [
    {
        id: 1,
        description: 'A test group'
    },
    {
        id: 2,
        description: 'A test group'
    },
    {
        id: 3,
        description: 'A test group'
    },
    {
        id: 4,
        description: 'A test group'
    },
    {
        id: 5,
        description: 'A test group'
    },
    {
        id: 6,
        description: 'A test group'
    },
    {
        id: 7,
        description: 'A test group'
    }
];

export default function ProjectsContainer() {
    const [data, useData] = useState<Array<IProject>>(dummyData);

    return <ProjectsView projects={data} />;
}
