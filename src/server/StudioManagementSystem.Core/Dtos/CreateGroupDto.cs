namespace StudioManagementSystem.Core.Dtos;

public record CreateGroupDto(string Name, string? Description, int MaxMembers, GroupProjectPreferenceDto Preferences);
