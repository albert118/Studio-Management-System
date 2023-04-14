namespace StudioManagementSystem.Core.Dtos;

public record UpdateGroupDto(string Name, string Description, int MaxMembers, List<PreferenceDto> Preferences);
