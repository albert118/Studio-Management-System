namespace StudioManagementSystem.Core.Dtos;

public record CreateGroupDto(string Name, string? Description, Dictionary<string, int?> Preferences);
