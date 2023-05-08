using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class GroupApplicationMapper
{
    public static GroupApplicationDto MapToGroupApplicationDtoDto(this GroupApplication groupApplication)
    {
        return new(
            Id: groupApplication.Id,
            GroupId: groupApplication.GroupId,
            ContactId: groupApplication.StudentContactId,
            Name: groupApplication.StudentContact.GetFullName(),
            Message: groupApplication.Message
        );
    }

    public static PotentialInvite MapToPotentialInvite(this GroupApplication groupApplication)
    {
        return new(
            InviteId: groupApplication.Id,
            GroupName: groupApplication.Group.Name,
            Message: groupApplication.Message
        );
    }
}
