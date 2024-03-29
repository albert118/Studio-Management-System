import { IStudentContact } from 'types/types';
import { Guid } from 'guid-typescript';

export type DropdownItem = {
    id: Guid;
    label: string;
};

export const mapToDropdownItems = (items: IStudentContact[]): DropdownItem[] => {
    return items.map(item => {
        return {
            id: item.id,
            label: item.name
        };
    });
};
