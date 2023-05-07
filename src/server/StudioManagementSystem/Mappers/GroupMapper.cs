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
            Description: group.Description,
            MemberInfo: group.Members.ToMemberInfoDto(group),
            Preferences: group.GroupProjectPreferences.Select(GroupProjectPreferenceMapper.MapToPreferenceDto).ToList(),
            Project: group.AssignedProject?.MapToProjectDto(),
            MemberCount: $"{group.Members.Count}/{group.MaxMembers}"
        );
    }

    public static AssignedGroupDto MapToAssignedGroupDto(this Group group)
    {
        return new(
            GroupId: group.Id,
            Name: group.Name
        );
    }
}
