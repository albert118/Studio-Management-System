namespace StudioManagementSystem.Core.Dtos;

public record ProjectDto(string Title, string Description, List<OwnerDto> Owners);
