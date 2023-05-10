namespace StudioManagementSystem.Core.Dtos;

public record GroupDto(
    Guid Id,
    string Name,
    string Description,
    MemberInfoDto MemberInfo,
    List<PreferenceDto> Preferences,
    ProjectDto? Project,
    string MemberCount,
    MetaDto Meta
);
