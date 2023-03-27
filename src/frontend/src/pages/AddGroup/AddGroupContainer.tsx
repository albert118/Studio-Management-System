import AddGroupView from './AddGroupView';
import { IViewProps } from './types';

export default function AddGroupContainer() {
    const demoViewProps: IViewProps = {
        availableProjects: [
            {
                id: '1',
                description: 'Apple Inc.'
            },
            {
                id: '2',
                description: 'Microsft Corp.'
            },
            {
                id: '3',
                description: 'IBM'
            }
        ]
    };

    return <AddGroupView {...demoViewProps} />;
}
