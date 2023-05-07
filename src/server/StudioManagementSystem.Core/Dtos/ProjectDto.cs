namespace StudioManagementSystem.Core.Dtos;

public record ProjectDto(
    Guid Id,
    string Title,
    string Description,
    List<OwnerDto> Owners,
    OwnerDto? PrincipalOwner,
    List<AssignedGroupDto> AssignedGroups,
    ProjectMetaDto Meta
);
