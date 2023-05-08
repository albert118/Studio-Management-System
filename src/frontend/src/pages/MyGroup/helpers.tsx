import { NewGroupApplicationDto } from 'types/types';
import { Guid } from 'guid-typescript';

export const getDefaultInviteData = (groupId: Guid): NewGroupApplicationDto => {
    return {
        studentIds: [],
        groupId: groupId,
        message: ''
    };
};
