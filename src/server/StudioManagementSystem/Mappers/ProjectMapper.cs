using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Mappers;

public static class ProjectMapper
{
    public static ProjectDto MapToProjectDto(this Project project)
    {
        return new(
            Id: project.Id,
            Title: project.Title,
            Description: project.Description,
            Owners: project.ProductOwners?.Select(o => o.MapToOwnerDto()).ToList() ?? new(),
            AssignedGroups: project.AssignedGroups?.Select(g => g.MapToAssignedGroupDto()).ToList() ?? new(),
            Meta: project.MapToProjectMetaDto()
        );
    }

    public static ProjectMetaDto MapToProjectMetaDto(this Project project)
    {
        return new(
            CreatedYear: project.CreatedOn.Year.ToString(),
            Domain: project.Domain
        );
    }
}
