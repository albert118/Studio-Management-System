using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class GroupMapper
{
    public static GroupDto MapToGroupDto(this Group group)
    {
        return new(
            Id: group.Id,
            Name: group.Name,
            Description: string.Empty, // TODO
            Members: new(),
            Preferences: new(), // TODO
            Project: group.AssignedProject?.MapToProjectDto()
        );
    }
}
