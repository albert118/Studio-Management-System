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
            FirstName: groupApplication.Contact.FirstName,
            LastName: groupApplication.Contact.LastName,
            Email: groupApplication.Contact.Email,
            Message: groupApplication.Messages
        );
    }
}