import { ProjectOwner } from 'types/types';
import { Guid } from 'guid-typescript';

export type DropdownItem = {
    id: Guid;
    label: string;
};

export const mapToDropdownItems = (items: ProjectOwner[]): DropdownItem[] => {
    let hyrdatedItems = items.map(item => {
        return {
            id: item.id,
            label: item.name
        };
    });

    return hyrdatedItems;
};
