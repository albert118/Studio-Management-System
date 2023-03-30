namespace StudioManagementSystem.Core.Dtos;

public record CreateGroupDto(string Name, string? Description, List<PreferenceOptionsDto> PreferenceOptions);
