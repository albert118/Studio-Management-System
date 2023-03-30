﻿using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class GroupMapper
{
    public static GroupDto MapToGroupDto(this Group group)
    {
        return new(
            Name: group.Name,
            Description: string.Empty, // TODO
            Members: new()             // TODO
        );
    }
}
