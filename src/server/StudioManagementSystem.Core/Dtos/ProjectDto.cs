namespace StudioManagementSystem.Core.Dtos;

public record ProjectDto(Guid Id, string Title, string Description, List<OwnerDto> Owners);
